function Point(x, y) {
	this.x = x;
	this.y = y;
}

function Size(w, h) {
	this.w = w;
	this.h = h;
}


function Sprite(coord, size, theta, url) {
	this.size  = size  || new Size(50, 50);
	this.coord = coord || new Point(0, 0);
	this.theta = theta || 0;
	
	
	this.vel   = {vx: 0, vy: 0}; 
	this.acel  = {ax: 0, ay: 0}; 
	this.omega = 0;	


	this.image = new Image();
	this.image.src = url;
	
	this.draw = function(ctx) {
		ctx.save();
            // ctx.translate(this.coord.x, this.coord.y);
            ctx.fillStyle = "blue";
            ctx.fillRect(this.coord.x, this.coord.y,  this.size.h, this.size.w );    
            ctx.strokeStyle = "white";
            ctx.strokeRect(this.coord.x, this.coord.y, this.size.h, this.size.w);
		ctx.restore();
	}
	
	
	this.move = function(dt, g) {	
		this.coord.y += (this.vel.vy * dt) - g/2 * (dt*dt);
		this.vel.vy -= g * dt;
	}

	
	this.collision = function(pilastraCima , pilastraBaixo)
	{
		if (  ((this.coord.y - (this.size.h/2) + 4 ) < ( (pilastraCima.coord.y) + pilastraCima.size.w)) &&  (this.coord.x + this.size.w/2 - 4) > (pilastraCima.coord.x)) {return true;}
        
		if (  ((this.coord.y - this.size.h/2 + 4) < ( (pilastraCima.coord.y) + pilastraCima.size.w)) &&  ((this.coord.x - this.size.w/2 + 4 < pilastraCima.coord.x + pilastraCima.size.h) && ( (this.coord.x - this.size.w/2 > pilastraCima.coord.x)) ) ) {return true;}
        
		if ( (this.coord.y + this.size.h/2 - 4) > (pilastraBaixo.coord.y) &&  (this.coord.x + this.size.w/2 - 4) > (pilastraCima.coord.x)){return true;}

		return false;
	}
    
}

function Obstaculo(coord, size, theta, url) {
	this.size  = size  || new Size(50, 50);
	this.coord = coord || new Point(0, 0);
	this.theta = theta || 0;
	
	
	this.vel   = -100;	
	this.omega = 0;	
	this.acel  = 0;	
	

	this.image = new Image();
	this.image.src = url;
	
	this.draw = function(ctx) {
		ctx.save();		
            ctx.fillStyle = "greem";
            ctx.fillRect(this.coord.x, this.coord.y, this.size.h, this.size.w);
            ctx.strokeStyle = "white";
            ctx.strokeRect(this.coord.x, this.coord.y, this.size.h, this.size.w);
		ctx.restore();
	}
	
	
	this.move = function(dt, g) {	
		this.theta = this.theta + this.omega * dt;
		var vx = Math.cos(this.theta) * (this.vel);
		this.coord.x += vx * dt;
	}


	this.colidiuCom = function(alvo){
        if(this.coord.x > alvo.coord.x+alvo.size.w) return false;
        if(this.coord.x+this.size.w < alvo.coord.x) return false;
        if(this.coord.y > alvo.coord.y+alvo.size.h) return false;
        if(this.coord.y+this.size.h < alvo.coord.y) return false;
        return true;
    };

}
