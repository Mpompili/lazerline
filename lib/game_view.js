class GameView {
    constructor(game, ctx, settings, restart) {
        this.ctx = ctx; 
        this.game = game; 
        this.settings = settings; 
        
        // this.difficulty = settings.difficulty; 
      
        this.restart = restart; 
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
        let player = this.player;
        // const comp = this.comp;
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
                // case 65:
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
        cancelAnimationFrame(this.animation);
        this.player = this.game.humanPlayer();
        this.botGeneration(this.settings.numOfBots); 
        this.difficulty = this.setDifficulty(this.settings.difficulty);
        this.bindKeyHandlers();
        this.lastTime = 0; 
        this.game.draw(this.ctx); 
        this.animation = requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        const timeDelta = time - this.lastTime; 
        this.game.step(this.difficulty);
        // this.compMove();  
        this.game.drawPlayers(this.ctx);

        this.lastTime = time; 

        if (this.endGame()) {
            this.gameOver(); 
        } else {
        requestAnimationFrame(this.animate.bind(this)); 
        }
    }

    sample(array) {
        return array[Math.floor ( Math.random() * array.length )];
    }

    endGame(){
        if (this.game.playersLeft <= 1 || !this.player.alive) return true; 

        return false; 
    }

    toggleButton(buttons, setting) {
        for (let i = 0; i < buttons.length; i++){
            let button = buttons[i];
            let others = []; 
            [0,1,2].forEach(num => {
                if (num != i) others.push(num); 
            });
    
            button.addEventListener("click", ()=> {
                this.settings[setting] = button.innerHTML; 
                // debugger; 
                button.classList.add("active"); 
                others.forEach((btnNum) => {
                buttons[btnNum].classList.remove("active"); 
                });
            });
        }
    }

    gameOver() {
    let victor; 
        this.game.players.forEach((object) => {
            // debugger;
          if (object.alive) victor = object.name; 
        });
    // let settings = {
    //     numOfBots: 1,
    //     difficulty: 1
    // }; 


    let restartMenu = document.getElementsByClassName('settings-form2');
    let winner = document.getElementById('winner'); 
    let color = victor.color; 
    winner.innerHTML = victor; 
    // winner.style.color = color; 
    // winner.style.textShadow = `0 0 3px #fff, 0 0 8px #fff, 0 0 15px ${color}, 0 0 18px ${color}`; 
    
    let botButtons = document.getElementsByClassName("botbutton");
    let difButtons = document.getElementsByClassName("difbutton");
    this.toggleButton(botButtons, "numOfBots"); 
    this.toggleButton(difButtons, "difficulty"); 

    restartMenu = restartMenu[0]; 
    restartMenu.classList.add('sf2-appear');


    let restartButton = document.getElementById('restart-game'); 
    restartButton.addEventListener("click", () => {
        this.settings["numOfBots"] = parseInt(this.settings["numOfBots"]);
        this.settings["difficulty"] = parseInt(this.settings["difficulty"]);
        restartMenu.classList.remove('sf2-appear'); 
        this.game = this.restart(); 
        this.settings = this.settings; 
        this.start();   
    }); 


    }

}


module.exports = GameView; 