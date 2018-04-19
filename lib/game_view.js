class GameView {
    constructor(game, ctx) {
        this.ctx = ctx; 
        this.game = game; 
        this.player = this.game.humanPlayer();
        this.comp = this.game.computerPlayer(); 
    }

    bindKeyHandlers() {
        const player = this.player;
        const comp = this.comp;
        document.onkeydown = function(e) {
            e = e || window.event; 
            switch(e.which || e.keyCode) {
                case 37:
                    if (comp.velocity[0] !== 1) comp.changeVel([-1, 0]);
                    break; 
                case 38: 
                    if (comp.velocity[1] !== 1) comp.changeVel([0, -1]); 
                    break;
                case 39:
                    if (comp.velocity[0] !== -1) comp.changeVel([1, 0]); 
                    break;
                case 40: 
                    if (comp.velocity[1] !== -1) comp.changeVel([0, 1]); 
                    break; 
                case 65:
                    if (player.velocity[0] !== 1) player.changeVel([-1, 0]);
                    break; 
                case 83: 
                    if (player.velocity[1] !== -1) player.changeVel([0, 1]); 
                    break;
                case 68:
                    if (player.velocity[0] !== -1) player.changeVel([1, 0]); 
                    break;
                case 87: 
                    if (player.velocity[1] !== 1) player.changeVel([0, -1]); 
                    break; 
                default:
                    return; 
            }
        };

    }

    compMove() {
        let advisor = this.compPingDirections();
            // console.log(advisor); 
            // console.log(this.comp.location[0]);
            // console.log(this.comp.location[1]); 

        let dir = this.comp.dir[0]; 
        let velX = this.comp.velocity[0];
        let velY = this.comp.velocity[1]; 
        // || Math.ceil(Math.random() * 50) == 5
        if (advisor[dir] < 5 || Math.ceil(Math.random() * 25) == 5) {
            
            if (Math.ceil(Math.random() * 100) < 97) {

            } else {

                advisor.best = advisor.secondBest;

                // console.log('new advisor.best: ' + advisor.best); 
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
            // this.comp.dir = [advisor.best, move]; 
            // console.log("after change in dir: " + this.comp.dir);
            if (advisor.best === "right" && dir === "left" ||
                advisor.best === "left" && dir === "right" ||
                advisor.best === "up" && dir === "down" ||
                advisor.best === "down" && dir === "up"
                )


            // if ((move[0] == 1) && (this.comp.velocity[0] == -1) ||
            //     (move[0] == -1) && (this.comp.velocity[0] == 1) ||
            //     (move[1] == 1) && (this.comp.velocity[1] == -1) ||
            //     (move[1] == -1) && (this.comp.velocity[1] == 1))
                 {
                console.log('suicide move'); 
                } else {

                 this.comp.changeVel(move); 
                }
       
        }
    }

    compPingDirections() {
        let pong = {
            up: 0,
            down: 0, 
            left: 0, 
            right: 0
        };
        let x = this.comp.location[0]; // x location
        let y = this.comp.location[1]; // y location

        //up 
        for (let i = y - 1; i >= 0; i -= 1){
            pong.up = y - i;
            if (this.compIsCollision(x, i, 'up')) {
                // console.log('up: ' + pong.up); 
                break;
            }
        }

         //down
         for (let i = y + 1; i <= 100; i += 1){
             pong.down = i - y;
             if (this.compIsCollision(x, i, 'down')) {
                // console.log('down: ' + pong.down); 
                break;
            } 
        }

        //left
        for (let i = x - 1; i >= 0; i -= 1){
            pong.left = x - i; 
            if (this.compIsCollision(i, y, 'left')) {
            // console.log("left: " + pong.left); 
                break; 
            }
        }

        //right
        for (let i = x + 1; i <= 100; i += 1){
            pong.right = i - x; 
            if (this.compIsCollision(i, y, 'right')) {
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
                // others.push(dir); 
            }
        }
        pong.best = largest.key;
        // pong.else = others; 
        pong.secondBest = second.key; 
        return pong;
    }

    convToHash(arr) {
        let result = {};
        for (let i = 0; i < arr.length; i++){
            result[`${arr[i]}`] = i; 
            // result[arr[i].toString()]
        }
        return result; 
    } 

    compIsCollision(x, y, dir) {
        let coords = x + ',' + y; 
        // let compTrail = this.convToHash(this.comp.trail);
        // let playerTrail = this.convToHash(this.player.trail); 

        let compTrail = this.comp.strail;
        let playerTrail = this.player.strail; 

        // if (compTrail[coords]) { debugger; } 
        if (
            compTrail[coords] ||
            playerTrail[coords]|| 
            x < 3 ||
            x > 100 - 3 ||
            y < 3 || 
            y > 100 - 3 ) {
            return true; 
        }
        return false;
    }
  

    start() {
        this.bindKeyHandlers();
        this.lastTime = 0; 
        this.game.draw(this.ctx); 
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
       
        const timeDelta = time - this.lastTime; 
        this.game.step();
        this.compMove();  
        this.game.drawPlayers(this.ctx);

        this.lastTime = time; 

        if (this.endGame()) {
            return;
        } else {
        requestAnimationFrame(this.animate.bind(this)); 
        }
    }

    sample(array) {
        return array[Math.floor ( Math.random() * array.length )];
    }

    endGame(){
        let player = this.player;
        let comp = this.comp; 

        if ((player.collidesWith(comp.trail) && comp.collidesWith(player.trail)) || (player.collidesWith(comp.location) && comp.collidesWith(player.location)) || ((player.checkBounds() && comp.checkBounds())) ){
            this.gameOver("Draw!"); 
            return true; 
        } else if (player.collidesWith(comp.trail) || comp.collidesWith(comp.trail.slice(0,-1)) || player.checkBounds()) {
            this.gameOver(' Computer Wins');
            return true; 
        } else if (comp.collidesWith(player.trail) || player.collidesWith(player.trail.slice(0,-1)) || comp.checkBounds()) {
            this.gameOver(' Player Wins');
            return true;
        }
        return false; 
    }

    gameOver(win) {
    //   window.location.reload(); 
        // window.location.reload(); 
    }

}


module.exports = GameView; 