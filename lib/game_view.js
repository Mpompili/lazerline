class GameView {
    constructor(game, ctx) {
        console.log('created gameview');
        this.ctx = ctx; 
        this.game = game; 
        this.player = this.game.humanPlayer();
        this.comp = this.game.computerPlayer(); 
        console.log(this.ctx); 
        console.log(this.game); 
        console.log(this.player); 
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
        console.log('is this going?');
        
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        const timeDelta = time - this.lastTime; 
        this.game.step();
        this.game.draw(this.ctx); 
        this.endGame(); 
        this.lastTime = time; 

        requestAnimationFrame(this.animate.bind(this)); 
    }

    endGame(){
        let player = this.player;
        let comp = this.comp; 

        if ((player.collidesWith(comp.trail) && comp.collidesWith(player.trail)) || (player.collidesWith(comp.location) && comp.collidesWith(player.location)) || ((player.checkBounds() && comp.checkBounds())) ){
            this.gameOver("Draw!"); 
        } else if (player.collidesWith(comp.trail) || comp.collidesWith(comp.trail.slice(0,-1)) || player.checkBounds()) {
            this.gameOver(' Computer Wins');
        } else if (comp.collidesWith(player.trail) || player.collidesWith(player.trail.slice(0,-1)) || comp.checkBounds()) {
            this.gameOver(' Player Wins');
        }
    }

    gameOver(win) {
        // this.player.velocity = [0, 0]; 
        // this.comp.velocity = [0, 0]; 
  
        window.location.reload(); 
    }

}


module.exports = GameView; 