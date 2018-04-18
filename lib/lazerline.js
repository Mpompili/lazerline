const SCL = 5; 
const Player = require("./bikes.js"); 
const Grid = require("./grid.js"); 

class Lazerline {
    constructor() {
        this.grid = new Grid(); 
        this.players = [];
    }

    draw(ctx) {

        ctx.clearRect(0, 0, 500, 500);
        ctx.fillStyle = "#000C19"; 
        ctx.fillRect(0, 0, 500, 500); 

        this.grid.draw(ctx);
    }

    drawPlayers(ctx) {
        
        this.allObjects().forEach((object) => {
            object.draw(ctx); 
        });
    }

    allObjects() {
        return [].concat(this.players); 
    }

    addPlayer(x, y, dx, dy, c) {
        const player = new Player(x, y, dx, dy, c);
        this.players.push(player); 
        return player; 
    }

    humanPlayer() {
        return this.addPlayer(50 / SCL, 500 / 2 / SCL, 1, 0, "#FF4500"); 
    }

    computerPlayer() {
        return this.addPlayer((500 - 50) / SCL, 500 / 2 / SCL, -1, 0, "#FFFFFF");
    }

    moveObjects(delta) {
        this.players.forEach((object) => {
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