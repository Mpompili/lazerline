const SCL = 5; 

class Player {
    constructor(x, y, dx, dy, c) {
        this.trail = [];
        this.strail = {}; 
        this.location = [x, y];
        this.velocity = [dx, dy]; 
        this.dir;
        this.color = c; 
    }

    draw(ctx) {
 
        ctx.beginPath(); 
        ctx.fillStyle = this.color; 
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 11;
        ctx.fillRect(this.trail[this.trail.length - 1][0] * SCL, this.trail[this.trail.length - 1][1] * SCL, SCL, SCL);
    }

    update() {
        this.location = [this.location[0] + this.velocity[0], this.location[1] + this.velocity[1]]; 
        this.trail.push([this.location[0], this.location[1]]);
        this.strail[this.location[0] + ',' + this.location[1]] = true; 
        switch(this.velocity[0]){
            case 1:
                this.dir = ["right", [1, 0]];
                return;
            case -1:
                this.dir = ["left", [-1, 0]]; 
                return;
        }
        switch(this.velocity[1]){
            case 1:
                this.dir = ["down", [0, 1]];
                return;
            case -1:
                this.dir = ["up", [0, -1]];  
                return;
        }
    }

    changeVel(change) {
        this.velocity = [change[0], change[1]]; 
    }

    collidesWith(trail) {
       for (let i = 0; i < trail.length; i ++) {
            if (trail[i][0] === this.location[0] && trail[i][1] === this.location[1]) return true; 
       }
       return false; 
    }

    checkBounds() {
        if (this.location[0] <= 0 || this.location[0] >= 100 || 
            this.location[1] <= 0 || this.location[1] >= 100 ) 
            {
            return true; 
        }
    }


}

module.exports = Player; 