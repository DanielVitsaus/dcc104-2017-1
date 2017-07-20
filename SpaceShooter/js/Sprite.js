"use strict";

function Sprite(img, coord, size, dime, imgTH = undefined){

    this.img = img;
    this.imgTH = imgTH;
    this.coord = coord  || new Point(64,64);
    this.size = size    || new Size(50,50);
    this.dime = dime    || new Size(50,50);
    this.g = 0;
    this.x = coord.x;
    this.y = coord.y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    
    this.angle = 0;
    this.vang = 0;
    this.cooldown = 0;
    this.th = 30;	
    
    this.fatx = 3.5;
	this.faty = 3.5; 
    
    this.shots = [];
    this.lShot = 0;

}

Sprite.prototype.desenhar = function (ctx) {    
    ctx.save();        
        ctx.translate(this.x, this.y);    
            if (this.imgTH != undefined){
                ctx.drawImage(this.imgTH, 0, 0, 64, 256, 35.5, 64, 10, Math.abs( ( Math.cos( 16 * time * Math.PI/1000) ) * this.th) );           
            }
            ctx.drawImage(this.img, 0, 0, this.dime.w, this.dime.h, 0, 0, this.size.w, this.size.h);  
    ctx.restore();    
    
};

Sprite.prototype.desenhaBackground = function(ctx){
    ctx.save();
        ctx.translate(this.x, this.y);    
            ctx.drawImage(this.img, 0, 0, this.size.w, this.size.h, 0, 0, this.size.w, this.size.h);
    ctx.restore();
};

Sprite.prototype.moveBackground = function(deltaTime, b){
    
    if (Math.trunc(this.y) >= sizeScreem.h ){ this.y = -(Math.abs(b.y) + this.size.h) ; }       
    
    this.y = this.y + (this.vy * deltaTime * 10);
};


Sprite.prototype.mover = function (dt) {

    this.vx = this.vx + this.ax * dt;
    this.vy = this.vy + this.ay * dt;

    if (this.ay == 0){
        if(this.vy != 0){
            this.vy -= this.vy * (dt * this.faty);
        }
        else{
            this.vy = 0;
        }
    }

    if (this.ax == 0){
        if(this.vx != 0){
            this.vx -= this.vx * (dt * this.fatx);
        }
        else{
            this.vx = 0;
        }
    }

    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;

};

Sprite.prototype.colidiuCom = function (alvo) {

    if(this.x+this.width < alvo.x) return false;
    if(this.x > alvo.x+this.width) return false;
    if(this.y+this.height < alvo.y) return false;
    if(this.y > alvo.y+this.height) return false;

    return true;
};

Sprite.prototype.limitePlayer = function(){
    var top = sizeScreem.h/2;
    var left = 0;
    var right = sizeScreem.w - 80;
    var bottom = sizeScreem.h - 90;
    
    if (this.x < left ){ this.x = left; this.vx = 0; }
    if (this.x > right ){ this.x = right; this.vx = 0; }
    if (this.y < top ){ this.y = top; this.vy = 0; }
    if (this.y > bottom ){ this.y = bottom; this.vy = 0; }
    
};

Sprite.prototype.desenhaACo = function(ctx){
    
    ctx.save();
        ctx.strokeStyle = 'firebrick';
        ctx.strokeRect(this.x+10, this.y+10, this.size.w-20, this.size.h-20);
        ctx.fillRect(this.x + (this.size.w), this.y, 4, 4);
    ctx.restore();
};


