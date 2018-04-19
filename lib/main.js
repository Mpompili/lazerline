const Lazerline = require("./lazerline.js"); 
const GameView = require("./game_view.js"); 

document.addEventListener("DOMContentLoaded", () => {
    // let settings = {}; 
    let opening = document.getElementById("pract");
    // transitionEvent = whichTransitionEvent();

    opening.addEventListener("click", () => {
        opening.classList.add('open');
        setTimeout(function(){ 
            opening.parentNode.removeChild(opening);
            getStarted(); 
           


        }, 1300); 
        // opening.addEventListener(transitionEvent, () => customFunction(opening));

        // function customFunction(obj) {
        //     console.log('kill myself');
        //     obj.parentNode.removeChild(obj); 
        //   }
    
    });

   
   let getStarted = function() {
       console.log('getstarted triggered'); 
    const gameCanvas = document.getElementsByClassName("game-canvas"); 
    gameCanvas[0].classList.add('resize'); 
    gameCanvas[0].width = 500; 
    gameCanvas[0].height = 500; 

    let ctx = gameCanvas[0].getContext("2d"); 
    const game = new Lazerline(); 
    
    new GameView(game, ctx).start(); 
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