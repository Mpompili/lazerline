const Lazerline = require("./lazerline.js"); 
const GameView = require("./game_view.js"); 

document.addEventListener("DOMContentLoaded", () => {
    let settings = {
        numOfBots: 3,
        difficulty: 1
    }; 

    // let others = []; 
    // this.players.map(z => {
    //     if (z.color !== object.color){
    //         others.push(z); 
    //     }
    // });

    let botButtons = document.getElementsByClassName("botbutton");
    let difButtons = document.getElementsByClassName("difbutton");
    //array 

    let toggleButton = function(buttons, setting) {
        for (let i = 0; i < buttons.length; i++){
            let button = buttons[i];
            let others = []; 
            [0,1,2].forEach(num => {
                if (num != i) others.push(num); 
            });
    
            button.addEventListener("click", ()=> {
                settings[setting] = button.innerHTML; 
                // debugger; 
                button.classList.add("active"); 
                others.forEach((btnNum) => {
                buttons[btnNum].classList.remove("active"); 
                });
            });
        }
    };

    toggleButton(botButtons, "numOfBots"); 
    toggleButton(difButtons, "difficulty"); 
    
    window.settings = settings; 
  
    // botButtons.forEach((button) => {
    //     let others = []; 

    //     //defines other buttons
    //     botButtons.map(btn => {
    //         if (btn.innerHTML != button.innerHTML){
    //             others.push(btn); 
    //         }
    //     });

    //     button.addEventListener("click", ()=> {
    //         settings["numOfBots"] = button.innerHTML; 
    //         debugger; 
    //         button.classList.add("active"); 
    //         others.forEach((bttn) => {
    //             bttn.classList.remove("active"); 
    //         });
    //     });
    // });
    let fadeIntro = function(setForm, open, startBtn, setting) {
        setForm.classList.add('close'); 
        open.classList.add('open');
        startBtn.classList.add('close');
        setTimeout(function(){ 
            open.parentNode.removeChild(open);
            setForm.parentNode.removeChild(setForm); 
            startBtn.parentNode.removeChild(startBtn);
            // blNum.parentNode.removeChild(blNum); 
            // blDif.parentNode.removeChild(blDif); 
            settings["numOfBots"] = parseInt(settings["numOfBots"]);
            settings["difficulty"] = parseInt(settings["difficulty"]);
            getStarted(setting); 
        }, 1300); 
    };

    let opening = document.getElementById("pract");
    // transitionEvent = whichTransitionEvent();
    // let blDif = document.getElementById('bl-dif'); 
    // let blNum = document.getElementById("bl-num");
    let settingForm = document.getElementById("settings-form"); 
    let startButton = document.getElementById('start-button');

    opening.addEventListener("click", () => fadeIntro(settingForm, opening, startButton, settings));
    // startButton.addEventListener("click", () => fadeIntro(settingForm, opening, startButton, settings));    
    
    //     settingForm.classList.add('close'); 
    //     opening.classList.add('open');
    //     startButton.classList.add('close');
    //     setTimeout(function(){ 
    //         opening.parentNode.removeChild(opening);
    //         settingForm.parentNode.removeChild(settingForm); 
    //         startButton.parentNode.removeChild(startButton);

    //         settings["numOfBots"] = parseInt(settings["numOfBots"]);
    //         settings["difficulty"] = parseInt(settings["difficulty"]);
    //         getStarted(settings); 
    //     }, 1300); 
     
    
    // });

   
   
   let getStarted = function(setts) {

    const gameCanvas = document.getElementsByClassName("game-canvas"); 
    gameCanvas[0].classList.add('resize'); 
    gameCanvas[0].width = 500; 
    gameCanvas[0].height = 500; 

    let ctx = gameCanvas[0].getContext("2d"); 
    const game = new Lazerline(); 
    
    new GameView(game, ctx, setts).start(); 
   };
    

    // const gameCanvas = document.getElementById("game-canvas"); 
    // gameCanvas.width = 500; 
    // gameCanvas.height = 500; 

    // let ctx = gameCanvas.getContext("2d"); 
    // const game = new Lazerline(); 
    
    // new GameView(game, ctx).start(); 




    // function whichTransitionEvent(){
    //     var t;
    //     var el = document.createElement('fakeelement');
    //     var transitions = {
    //       'transition':'transitionend',
    //       'OTransition':'oTransitionEnd',
    //       'MozTransition':'transitionend',
    //       'WebkitTransition':'webkitTransitionEnd'
    //     };
    
    //     for(t in transitions){
    //         if( el.style[t] !== undefined ){
    //             return transitions[t];
    //         }
    //     }
    // }
});








// function testOpener() {

    // SetTimer(() => document.getElementById"start".classList.add('game-canvas'), 3000); 
// 



// function drawBoard() {
//     for (let x = 0; x <= gameCanvas.width; x += 20) {
//         ctx.moveTo(0.5 + x + p, p);
//         ctx.lineTo(0.5 + x + p, gameCanvas.height + p); 
//     }
//     for (let x = 0; x <= gameCanvas.height; x += 20) {
//         ctx.moveTo(p, 0.5 + x + p); 
//         ctx.lineTo(gameCanvas.width + p, 0.5 + x + p); 
//     }