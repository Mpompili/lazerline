const SCL = 5; 
const Player = require("./bikes.js"); 
const Grid = require("./grid.js"); 

class Lazerline {
    constructor() {
        this.grid = new Grid(); 
        this.players = [];
        this.allTrails = {};
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

    addPlayer(x, y, dx, dy, c, isComp, dir) {
        const player = new Player(x, y, dx, dy, c, isComp, dir);
        this.players.push(player); 
        return player; 
    }

    humanPlayer() {
         return this.addPlayer(50 / SCL, 500 / 2 / SCL, 1, 0, "#FF4500", false, ["right", [1, 0]]); 
    }

    computerPlayer() {
        switch(this.players.length){
            case 1:
                return this.addPlayer((500 - 50) / SCL, 500 / 2 / SCL, -1, 0, "#E7FFFF", true, ["left", [-1, 0]]);
            case 2: 
                return this.addPlayer(500 / 2 / SCL, (500 - 50) / SCL, 0, 1, "#FEE55B", true, ["down", [0, 1]]);
            case 3:
                return this.addPlayer(500 / 2 / SCL, 50 / SCL, 0, -1, "#72C3DE", true, ["up", [0, -1]]);
            default: 
                return; 
            }
        //  this.addPlayer(500 / 2 / SCL, 50 / SCL, 0, -1, "#0000FF");
    }

    moveObjects(delta) {
        this.players.forEach((object) => {
            // 
            if (object.isComp) object.compMove(this.allTrails); 
            //
            object.update(); 
        });
    }

    step() {
        this.moveObjects();
    }


}

Lazerline.DIM_X = 500; 
Lazerline.DIM_Y = 500; 
Lazerline.FPS = 10; 



module.exports = Lazerline; 