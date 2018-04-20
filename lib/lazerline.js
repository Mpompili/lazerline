const SCL = 5; 
const Player = require("./bikes.js"); 
const Grid = require("./grid.js"); 

class Lazerline {
    constructor() {
        this.grid = new Grid(); 
        this.players = [];
        this.allTrails = {};
        this.playersLeft;
    }

    draw(ctx) {

        ctx.clearRect(0, 0, 500, 500);
        ctx.fillStyle = "#000C19"; 
        ctx.fillRect(0, 0, 500, 500); 

        this.grid.draw(ctx);
    }

    drawPlayers(ctx) {
        
        this.allObjects().forEach((object) => {
            this.allTrails[object.location[0] + ',' + object.location[1]] = true; 
            object.draw(ctx); 
        });
    }

    allObjects() {
        return [].concat(this.players); 
    }

    addPlayer(x, y, dx, dy, c, isComp, dir, name) {
        const player = new Player(x, y, dx, dy, c, isComp, dir, name);
        this.players.push(player); 
        return player; 
    }

    humanPlayer() {
        return this.addPlayer(500 / 2 / SCL, (500 - 50) / SCL, 0, -1, "#FFF", false, ["up", [0, -1]], 'You ;]');
    }

    computerPlayer() {
        switch(this.players.length){
            case 1:
                return this.addPlayer(500 / 2 / SCL, 50 / SCL, 0, 1, "#00FF7F", true, ["down", [0, 1]], "COMPUTER");
            case 2: 
                 return this.addPlayer(50 / SCL - 5, 500 / 2 / SCL, 1, 0, "#F50", true, ["right", [1, 0]], "COMPUTER"); 
            case 3:
                return this.addPlayer((500 - 50) / SCL + 5, 500 / 2 / SCL, -1, 0, "#00FFFF", true, ["left", [-1, 0]], "COMPUTER");    
            default: 
                return; 
            }
    }

    moveObjects(diff) {
        this.playersLeft = 0; 
        this.players.forEach((object) => {
            let others = []; 
            this.players.map(z => {
                if (z.color !== object.color){
                    others.push(z); 
                }
            });
            if (object.alive){
                this.playersLeft += 1; 
                if (object.isComp) object.compMove(this.allTrails, diff); 
                this.checkLife(object, others); 
                object.update(); 
            }
        });
    }

    checkLife(obj, others){
           if (obj.checkBounds() || obj.collidesWith(obj.trail) || obj.collidesWith2(obj.location[0], obj.location[1], others)){
               obj.velocity = [0, 0]; 
               obj.alive = false; 
           }
    }

    step(diff) {

        this.moveObjects(diff);
    }


}

Lazerline.DIM_X = 500; 
Lazerline.DIM_Y = 500; 
Lazerline.FPS = 10; 



module.exports = Lazerline; 