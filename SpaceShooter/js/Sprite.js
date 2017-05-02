"use strict";

function Sprite(img, coord, size, dime){
    
    this.img = img;
    this.coord = coord || new Point(64,64);
    this.size = size  || new Size(50,50);
    this.dime = dime  || new Size(50,50);
    this.g = 0;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.am = 0;
    this.angle = 0;
    this.vang = 0;
    this.cooldown = 0;    
    
}

Sprite.prototype.desenhar = function (ctx) {
  ctx.save();
    ctx.translate(this.coord.x, this.coord.y);        
        ctx.drawImage(this.img, 0, 0, this.dime.w, this.dime.h, this.x, this.y, this.size.w, this.size.h); 
    ctx.translate(-this.coord.x, -this.coord.y);
  ctx.restore();
};

Sprite.prototype.mover = function (dt) {
    
    this.vx = this.vx + this.ax*dt;
    this.vy = this.vy + (this.ay - 0)*dt;
    
    if (this.ay == 0){
        if(this.vy != 0){
            this.vy -= this.vy * (dt/5);
        }
        else{
            this.vy = 0;
        }            
    }
    
    if (this.ax == 0){
        if(this.vx != 0){
            this.vx -= this.vx * (dt/5);
        }
        else{
            this.vx = 0;
        }            
    }
    
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;
    
};

Sprite.prototype.colidiuCom = function (alvo) {
    
    if(this.x+this.width < alvo.x) return false;
    if(this.x > alvo.x+this.width) return false;
    if(this.y+this.height < alvo.y) return false;
    if(this.y > alvo.y+this.height) return false;
    
    return true;
};
