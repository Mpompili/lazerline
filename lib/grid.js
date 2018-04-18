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

        ctx.shadowColor = "rgb(200,200,200)"; 
        ctx.shadowBlur = 10;
        ctx.strokeStyle = "rgba(0, 240, 255, 0.65)"; 
        ctx.stroke(); 
    }

}

module.exports = Grid; 