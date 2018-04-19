class GameView {
    constructor(game, ctx, settings) {
        this.ctx = ctx; 
        this.game = game; 
        this.player = this.game.humanPlayer();
        this.difficulty = this.setDifficulty(settings.difficulty);
        // this.difficulty = settings.difficulty; 
        this.botGeneration(settings.numOfBots); 
        // this.comp = this.game.computerPlayer(); 
        // this.comp2 = this.game.computerPlayer();
        // this.comp3 = this.game.computerPlayer();
    }

    botGeneration(num) {
        for (let i = 0; i < num; i++) {
            this.game.computerPlayer(); 
        }
    }

    setDifficulty(dif) {
        let difsetting = {};
        switch(dif){
            case 1:
                difsetting["randomMove"] = 10; 
                difsetting["probOfBest"] = 80;
                return difsetting;  

            case 2: 
                difsetting["randomMove"] = 25;
                difsetting["probOfBest"] = 90; 
                return difsetting; 
            case 3: 
                difsetting["randomMove"] = 99;
                difsetting["probOfBest"] = 99; 
                return difsetting;  
            default: 
                return; 
        }
    }

    bindKeyHandlers() {
        const player = this.player;
        const comp = this.comp;
        document.onkeydown = function(e) {
            e = e || window.event; 
            switch(e.which || e.keyCode) {
                // case 37:
                //     if (comp.velocity[0] !== 1) player.changeVel([-1, 0]);
                //     break; 
                // case 38: 
                //     if (comp.velocity[1] !== 1) player.changeVel([0, -1]); 
                //     break;
                // case 39:
                //     if (comp.velocity[0] !== -1) player.changeVel([1, 0]); 
                //     break;
                // case 40: 
                //     if (comp.velocity[1] !== -1) player.changeVel([0, 1]); 
                //     break; 
                case 37:
                    if (player.velocity[0] !== 1) player.changeVel([-1, 0]);
                    break; 
                case 40: 
                    if (player.velocity[1] !== -1) player.changeVel([0, 1]); 
                    break;
                case 39:
                    if (player.velocity[0] !== -1) player.changeVel([1, 0]); 
                    break;
                case 38: 
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
        this.game.step(this.difficulty);
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
        // console.log(this.game.playersLeft);
        if (this.game.playersLeft <= 1) return true; 
        
        
        // {
        //     this.game.players.forEach((object) => {
        //         if (object.alive && !object.isComp) {
        //             this.gameOver('human player wins'); 
        //             return true; 
        //         } else if (object.alive && object.isComp){
        //             this.gameOver('computer player wins');
        //             return true; 
        //         }
        //     });
        // }


        // if ((player.collidesWith(comp.trail) && comp.collidesWith(player.trail)) || (player.collidesWith(comp.location) && comp.collidesWith(player.location)) || ((player.checkBounds() && comp.checkBounds())) ){
        //     this.gameOver("Draw!"); 
        //     return true; 
        // } else if (player.collidesWith(comp.trail) || comp.collidesWith(comp.trail.slice(0,-1)) || player.checkBounds()) {
        //     this.gameOver(' Computer Wins');
        //     return true; 
        // } else if (comp.collidesWith(player.trail) || player.collidesWith(player.trail.slice(0,-1)) || comp.checkBounds()) {
        //     this.gameOver(' Player Wins');
        //     return true;
        // }
        return false; 
    }

    gameOver(win) {
        this.game.players.forEach((object) => {
            if (object.alive && object.isComp) {
                console.log('computer wins'); 
            } else{
                console.log('player wins'); 
            }
        });
    //   window.location.reload(); 
        // window.location.reload(); 
    }

}


module.exports = GameView; 