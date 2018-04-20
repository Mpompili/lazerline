const SCL = 5; 

class Player {
    constructor(x, y, dx, dy, c, isComp, dir, name) {
        this.trail = [];
        this.strail = [];
        this.isComp = isComp; 
        this.location = [x, y];
        this.velocity = [dx, dy]; 
        this.dir = dir;
        this.color = c; 
        this.alive = true; 
        this.name = name; 
        // this.snd = new Audio("turn.wav"); 
    }

    draw(ctx) {
 
        ctx.beginPath(); 
        ctx.fillStyle = this.color; 
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 3;
        ctx.fillRect(this.trail[this.trail.length - 1][0] * SCL, this.trail[this.trail.length - 1][1] * SCL, SCL, SCL);
    }

    update() {
        this.location = [this.location[0] + this.velocity[0], this.location[1] + this.velocity[1]]; 
        this.trail.push([this.location[0], this.location[1]]);
        this.strail.push(this.location[0] + ',' + this.location[1]); 
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
        // console.log(this.snd); 
        // this.snd.play(); 
    }

    collidesWith(trail) {
       for (let i = 0; i < trail.length - 1; i ++) {
            if (trail[i][0] === this.location[0] && trail[i][1] === this.location[1]) {
                return true; 
            } 
       }
       return false; 
    }

    collidesWith2(x, y, others) {
        let coords = x + ',' + y; 
        let otherTrails = {};
        // this.strail.forEach(pos => {
        //     if (pos !== coords) {
        //         // console.log('this is pos: ' + pos); 
        //         otherTrails[pos] = false;
        //     }
        // });
        // this.strail.map(pos => {
        //     // debugger;
        //     if (pos !== coords) otherTrails[pos] = true; 
        // });
        // debugger;
        others.forEach((other) => {
            other.strail.map(pos => { otherTrails[pos] = true;});
        });

        // debugger;
        
        if (otherTrails[coords]) return true; 
        return false; 
    }


    // collided(x, y, allTrails){
    //     //x and y is current location
    //     let coords = x + ',' + y; 
    //     let arr = Object.entries(allTrails).slice(0,-1);
    //     let trails; 
    //     // let trails = allTrails;
    //     arr.map(z => {
    //         trails[z] = true;
    //     });
    //     // debugger;
    //     // let trails = allTrails.slice(0,-1); 
    //     // delete trails[coords]
    //     if (trails[coords]) return true; 
    //     return false;
    // }

    checkBounds() {
        if (this.location[0] <= 0 || this.location[0] >= 100 || 
            this.location[1] <= 0 || this.location[1] >= 100 ) 
            {
            return true; 
        }
    }

    compMove(allTrails, dif) {
        let randomMove = dif.randomMove; 
        let probOfBest = dif.probOfBest; 

        // console.log(dif);

        let advisor = this.compPingDirections(allTrails);

        let dir = this.dir[0]; 
        let velX = this.velocity[0];
        let velY = this.velocity[1]; 
        // console.log(randomMove); 
        if (advisor[dir] < 5 || Math.ceil(Math.random() * randomMove) == 5) {
            
            if (Math.ceil(Math.random() * 100) < probOfBest) {

            } else {

                advisor.best = advisor.secondBest;
            }


            let move; 
            switch(advisor.best){
                case "right":
                    move = [1, 0];  
                    break;
                case "left":
                    move = [-1, 0];  
                    break;
                case "down":
                    move = [0, 1];  
                    break;
                case "up":
                    move = [0, -1];  
                    break;
                default:   
                    move = [velX, velY];
                    break; 
            }
            // computer.dir = [advisor.best, move]; 
            // console.log("after change in dir: " + computer.dir);
            if (advisor.best === "right" && dir === "left" ||
                advisor.best === "left" && dir === "right" ||
                advisor.best === "up" && dir === "down" ||
                advisor.best === "down" && dir === "up"
                ) {
                console.log('suicide move'); 
                } else {

                 this.changeVel(move); 
                }
       
        }
    }

    compPingDirections(allTrails) {
        let pong = {
            up: 0,
            down: 0, 
            left: 0, 
            right: 0
        };
        let x = this.location[0]; // x location
        let y = this.location[1]; // y location

        //up 
        for (let i = y - 1; i >= 0; i -= 1){
            pong.up = y - i;
            if (this.compIsCollision(x, i, allTrails)) {
                // console.log('up: ' + pong.up); 
                break;
            }
        }

         //down
         for (let i = y + 1; i <= 100; i += 1){
             pong.down = i - y;
             if (this.compIsCollision(x, i, allTrails)) {
                // console.log('down: ' + pong.down); 
                break;
            } 
        }

        //left
        for (let i = x - 1; i >= 0; i -= 1){
            pong.left = x - i; 
            if (this.compIsCollision(i, y, allTrails)) {
            // console.log("left: " + pong.left); 
                break; 
            }
        }

        //right
        for (let i = x + 1; i <= 100; i += 1){
            pong.right = i - x; 
            if (this.compIsCollision(i, y, allTrails)) {
                // console.log("right: " + pong.right); 
                break; 
            }
        }

        let largest = { key: null, value: 0};
        let second = {key: null, value: 0}; 
        let others = []; 
        for(let dir in pong) {
            if (pong[dir] > largest.value){
                largest.key = dir; 
                largest.value = pong[dir]; 
            } else { 
                if (pong[dir] > second.value){
                    second.key = dir; 
                    second.value = pong[dir]; 
                } else if (pong[dir] == second.value){
                    second.key = null; 
                    second.value = 0; 
                }
             
            }
        }
        pong.best = largest.key;

        pong.secondBest = second.key; 
        return pong;
    }

    compIsCollision(x, y, allTrails) {
        let coords = x + ',' + y; 

        let trails = allTrails; 

        if (
            trails[coords]|| 
            x < 3 ||
            x > 100 - 3 ||
            y < 3 || 
            y > 100 - 3 ) {
            return true; 
        }
        return false;
    }
}

module.exports = Player; 