const SCL = 5; 

class Grid {
    constructor() {
     
    }

    draw(ctx) {
        ctx.beginPath(); 
        let bw = 500;
        let bh = 500;
        let p = 0;
        let cw = bw + (p*2) + 1;
        let ch = bh + (p*2) + 1; 

        for (let x = 0; x <= bw; x += 25) {
            ctx.moveTo(0.5 + x + p, p);
            ctx.lineTo(0.5 + x + p, bh + p); 
        }

        for (let x = 0; x <= bh; x += 25) {
            ctx.moveTo(p, 0.5 + x + p); 
            ctx.lineTo(bw + p, 0.5 + x + p); 
        }
        // ctx.globalAlpha = 1; 
        
        // let grd = ctx.createLinearGradient(0,0, 500, 500); 
        // grd.addColorStop("0", "#FF5500");
        // grd.addColorStop("1", "#FFF"); 
        ctx.shadowColor = "rgb(255,255,255)"; 
        ctx.shadowBlur = 5;
        ctx.strokeStyle = "rgba(0, 240, 255, 0.6)"; 
        ctx.stroke(); 
    }

}

module.exports = Grid; 