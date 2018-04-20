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
        let tut = document.getElementsByClassName('tutorial');
        tut = tut[0];
        tut.classList.add('show-tutorial'); 
        tut.classList.add('openTut'); 
        let tut2 = document.getElementsByClassName('tutorial-p2'); 
        tut2 = tut2[0]; 
        setTimeout(function(){
            let h1 = document.getElementById('t2h1');
            tut2.classList.add('appear'); 
            setTimeout(function(){
                h1.innerHTML = "GET READY";
                setTimeout(function(){
                    h1.innerHTML = "3";
                    setTimeout(function(){
                        h1.innerHTML = "2";
                        setTimeout(function(){
                            h1.innerHTML = "1";
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 5000);
            

            tut.classList.add('moveTut');
            let splayer = document.getElementsByClassName('start-player');
            splayer = splayer[0];
            // splayer.add('appear2');

            setTimeout(function(){
                splayer.classList.add('move-player');
            }, 2000);

            // setTimeout(function(){
            //     // splayer.classList.remove('appear');
            //     // tut2.classList.remove('appear');
            //     splayer.classList.add('disappear');
            //     tut2.classList.add('disappear');
            // }, 6000);
            
        }, 5000);
        setTimeout(function(){ 
            open.parentNode.removeChild(open);
            setForm.parentNode.removeChild(setForm); 
            startBtn.parentNode.removeChild(startBtn);
            tut2.parentNode.removeChild(tut2);
            // blNum.parentNode.removeChild(blNum); 
            // blDif.parentNode.removeChild(blDif); 
            settings["numOfBots"] = parseInt(settings["numOfBots"]);
            settings["difficulty"] = parseInt(settings["difficulty"]);

            // NEED TO BRING BACK BELOW vvvvv
            getStarted(setting); 
        }, 14000); 
    };

    let opening = document.getElementById("pract");
    // transitionEvent = whichTransitionEvent();
    // let blDif = document.getElementById('bl-dif'); 
    // let blNum = document.getElementById("bl-num");
    let settingForm = document.getElementById("settings-form"); 
    let startButton = document.getElementById('start-button');

    opening.addEventListener("click", () => fadeIntro(settingForm, opening, startButton, settings));
    startButton.addEventListener("click", () => fadeIntro(settingForm, opening, startButton, settings));    
    
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