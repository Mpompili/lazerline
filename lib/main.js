const Lazerline = require("./lazerline.js"); 
const GameView = require("./game_view.js"); 

document.addEventListener("DOMContentLoaded", () => {
    const gameCanvas = document.getElementById("game-canvas"); 
    gameCanvas.width = 500; 
    gameCanvas.height = 500; 

    // let p = 10; 

    let ctx = gameCanvas.getContext("2d"); 
    const game = new Lazerline(); 
    
    new GameView(game, ctx).start(); 
    // const gv = new GameView(game, ctx); 
    // gv.start(); 

});




// function drawBoard() {
//     for (let x = 0; x <= gameCanvas.width; x += 20) {
//         ctx.moveTo(0.5 + x + p, p);
//         ctx.lineTo(0.5 + x + p, gameCanvas.height + p); 
//     }
//     for (let x = 0; x <= gameCanvas.height; x += 20) {
//         ctx.moveTo(p, 0.5 + x + p); 
//         ctx.lineTo(gameCanvas.width + p, 0.5 + x + p); 
//     }