const SCL = 5; 

class Player {
    constructor(x, y, dx, dy, c) {
        this.trail = [];
        this.strail = {};
 
        this.location = [x, y];
        this.velocity = [dx, dy]; 
        this.dir;
        this.color = c; 
    }

    draw(ctx) {
 
        ctx.beginPath(); 
        ctx.fillStyle = this.color; 
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;
        ctx.fillRect(this.trail[this.trail.length - 1][0] * SCL, this.trail[this.trail.length - 1][1] * SCL, SCL, SCL);
    }

    update() {
        this.location = [this.location[0] + this.velocity[0], this.location[1] + this.velocity[1]]; 
        this.trail.push([this.location[0], this.location[1]]);
        this.strail[this.location[0] + ',' + this.location[1]] = true; 
        switch(this.velocity[0]){
            case 1:
                this.dir = ["right", [1, 0]];
                return;
            case -1:
                this.dir = ["left", [-1, 0]]; 
                return;
        }
        switch(this.velocity[1]){
            case 1:
                this.dir = ["down", [0, 1]];
                return;
            case -1:
                this.dir = ["up", [0, -1]];  
                return;
        }
    }

    changeVel(change) {
        this.velocity = [change[0], change[1]]; 
    }

    collidesWith(trail) {
       for (let i = 0; i < trail.length; i ++) {
            if (trail[i][0] === this.location[0] && trail[i][1] === this.location[1]) return true; 
       }
       return false; 
    }

    checkBounds() {
        if (this.location[0] <= 0 || this.location[0] >= 100 || 
            this.location[1] <= 0 || this.location[1] >= 100 ) 
            {
            return true; 
        }
    }

    // compMove(computer) {
    //     let advisor = this.compPingDirections(computer);
    //     console.log(advisor); 
    //     console.log(computer.location[0]);
    //     console.log(computer.location[1]); 

    //     let dir = computer.dir[0]; 
    //     let velX = computer.velocity[0];
    //     let velY = computer.velocity[1]; 
    //     // || Math.ceil(Math.random() * 50) == 5
    //     if (advisor[dir] < 5 || Math.ceil(Math.random() * 10) == 5) {
  
    //         let move; 
    //         switch(advisor.best){
    //             case "right":
    //                 move = [1, 0];  
    //                 break;
    //             case "left":
    //                 move = [-1, 0];  
    //                 break;
    //             case "down":
    //                 move = [0, 1];  
    //                 break;
    //             case "up":
    //                 move = [0, -1];  
    //                 break;
    //             default:   
    //                 move = [velX, velY];
    //                 break; 
    //         }
    //         // computer.dir = [advisor.best, move]; 
    //         // console.log("after change in dir: " + computer.dir);
    //         if (advisor.best === "right" && dir === "left" ||
    //             advisor.best === "left" && dir === "right" ||
    //             advisor.best === "up" && dir === "down" ||
    //             advisor.best === "down" && dir === "up"
    //             )


    //         // if ((move[0] == 1) && (computer.velocity[0] == -1) ||
    //         //     (move[0] == -1) && (computer.velocity[0] == 1) ||
    //         //     (move[1] == 1) && (computer.velocity[1] == -1) ||
    //         //     (move[1] == -1) && (computer.velocity[1] == 1))
    //              {
    //             console.log('suicide move'); 
    //             } else {
    //             console.warn(advisor.best); 
    //              computer.changeVel(move); 
    //             }
       
    //     }
    // }

    // compPingDirections(computer) {
    //     let pong = {
    //         up: 0,
    //         down: 0, 
    //         left: 0, 
    //         right: 0
    //     };
    //     let x = computer.location[0]; // x location
    //     let y = computer.location[1]; // y location

    //     //up 
    //     for (let i = y - 1; i >= 0; i -= 1){
    //         pong.up = y - i;
    //         if (this.compIsCollision(x, i, 'up')) {
    //             // console.log('up: ' + pong.up); 
    //             break;
    //         }
    //     }

    //      //down
    //      for (let i = y + 1; i <= 100; i += 1){
    //          pong.down = i - y;
    //          if (this.compIsCollision(x, i, 'down')) {
    //             // console.log('down: ' + pong.down); 
    //             break;
    //         } 
    //     }

    //     //left
    //     for (let i = x - 1; i >= 0; i -= 1){
    //         pong.left = x - i; 
    //         if (this.compIsCollision(i, y, 'left')) {
    //         // console.log("left: " + pong.left); 
    //             break; 
    //         }
    //     }

    //     //right
    //     for (let i = x + 1; i <= 100; i += 1){
    //         pong.right = i - x; 
    //         if (this.compIsCollision(i, y, 'right')) {
    //             // console.log("right: " + pong.right); 
    //             break; 
    //         }
    //     }

    //     let largest = { key: null, value: 0 };

    //     for(let dir in pong) {
    //         if (pong[dir] > largest.value){
    //             largest.key = dir; 
    //             largest.value = pong[dir]; 
    //         }
    //     }
    //     pong.best = largest.key;
    //     return pong;
    // }

    // convToHash(arr) {
    //     let result = {};
    //     for (let i = 0; i < arr.length; i++){
    //         result[`${arr[i]}`] = i; 
    //         // result[arr[i].toString()]
    //     }
    //     return result; 
    // } 

    // compIsCollision(x, y, dir) {
    //     let coords = x + ',' + y; 
    //     // let compTrail = this.convToHash(computer.trail);
    //     // let playerTrail = this.convToHash(this.player.trail); 


    //     // ALL TRAILS concept 

    //     let compTrail = computer.strail;
    //     let playerTrail = this.player.strail; 

    //     // if (compTrail[coords]) { debugger; } 
    //     if (
    //         compTrail[coords] ||
    //         playerTrail[coords]|| 
    //         x < 3 ||
    //         x > 100 - 3 ||
    //         y < 3 || 
    //         y > 100 - 3 ) {
    //         // debugger;
    //         if (compTrail[coords]) { console.log('comptrailcords triggered: ' + coords + ' ' + dir );}
    //         if (playerTrail[coords]) { console.log('playertrailcords triggered: ' + coords + ' ' + dir );}
    //         return true; 
    //     }
    //     return false;
    // }

}

module.exports = Player; 