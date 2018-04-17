const SCL = 5; 

class Player {
    constructor(x, y, dx, dy, c) {
        this.trail = [];

        this.location = [x, y];
        this.velocity = [dx, dy]; 
        this.color = c; 
    }

    draw(ctx) {
        ctx.beginPath(); 
        ctx.fillStyle = this.color; 
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 7; 
        for (let i = 0; i < this.trail.length; i ++){
            ctx.fillRect(this.trail[i][0] * SCL, this.trail[i][1] * SCL, SCL, SCL); 
        }
    }

    update() {
        this.location = [this.location[0] + this.velocity[0], this.location[1] + this.velocity[1]]; 
        this.trail.push([this.location[0], this.location[1]]);
    }

    changeVel(change) {
        console.log('made change');
        
        this.velocity = [change[0], change[1]]; 
    }

    collidesWith(trail) {
       for (let i = 0; i < trail.length; i ++) {
            if (trail[i][0] === this.location[0] && trail[i][1] === this.location[1]) return true; 
       }
       return false; 
    }

    checkBounds() {
        if (this.location[0] < 0 || this.location[0] > 500 / SCL || 
            this.location[1] < 0 || this.location[1] > 500 / SCL ) 
            {
            return true; 
        }
    }
}

module.exports = Player; 