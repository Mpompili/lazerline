class GameView {
    constructor(game, ctx) {
        this.ctx = ctx; 
        this.game = game; 
        this.player = this.game.humanPlayer();
        this.comp = this.game.computerPlayer(); 
        this.comp2 = this.game.computerPlayer();
        this.comp3 = this.game.computerPlayer();
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

    start() {
        this.bindKeyHandlers();
        this.lastTime = 0; 
        this.game.draw(this.ctx); 
        // this.game.update();
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
       
        const timeDelta = time - this.lastTime; 
        this.game.step();
        // this.compMove();  
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

        // this.game.players.forEach((object) => {

        // }

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