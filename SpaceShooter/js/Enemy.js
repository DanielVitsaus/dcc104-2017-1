"use strict";

function Enemy(img, coord, size, dime, imgTH = undefined){

    this.img = img;
    this.imgTH = imgTH;
    this.coord = coord  || new Point(64,64);
    this.size = size    || new Size(50,50);
    this.dime = dime    || new Size(50,50);
    this.g = 0;
    this.x = coord.x;
    this.y = coord.y;
    this.vx = -120;
    this.vy = 60;
    this.d = 1;
    this.ay = 0;
    this.velZIg = 1;
    this.angle = 0;
    this.vang = 0;
    this.cooldown = 0;
    this.th = 30;

    this.fatx = 2.0;
	this.faty = 4.0;

}

Enemy.prototype.desenhar = function (ctx) {
    ctx.save()
        ctx.translate(this.x, this.y);
            if (this.imgTH != undefined){
                ctx.drawImage(this.imgTH, 0, 0, 64, 256, 35.5, 64, 10, Math.abs( ( Math.cos( 16 * time * Math.PI/1000) ) * this.th) );
            }
            ctx.drawImage(this.img, 0, 0, this.dime.w, this.dime.h, 0, 0, this.size.w, this.size.h);
    ctx.restore();
};

Enemy.prototype.moveZig = function () {    
  
    
    if (this.y > - 90 ){
        this.ay += deltaTime * this.d;
        this.x = ( Math.sin(this.ay * this.velZIg) * 445 ) + 480  ;
    }
    
    this.y = this.y + this.vy * deltaTime;   

};

Enemy.prototype.moveD = function () {     
    
    this.y = this.y + this.vy * deltaTime;   

};

Enemy.prototype.colidiuCom = function (alvo) {

    if(this.x+this.width < alvo.x) return false;
    if(this.x > alvo.x+this.width) return false;
    if(this.y+this.height < alvo.y) return false;
    if(this.y > alvo.y+this.height) return false;

    return true;
};

Enemy.prototype.limitePlayer = function(){

    var left = 0;
    var right = sizeScreem.w - 80;

    if ( this.x < left  && this.y > 0 ){ this.x = left;  }
    if ( this.x > right && this.y > 0 ){ this.x = right; }

};

Enemy.prototype.foraTela = function(){    
    var bottom = sizeScreem.h + 220;
    if (this.y > bottom ){ return true; }

};

Enemy.prototype.foraTelaLinha = function(){    
    var bottom = sizeScreem.h + 400;
    if (this.y > bottom ){ return true; }

};

Enemy.prototype.desenhaACo = function(ctx){
    
    ctx.save();
        ctx.strokeStyle = 'firebrick';
    
        if (this.size.w - 10 == 40){
            ctx.strokeRect(this.x+5, this.y+10, this.size.w -10, this.size.h-20);
        }else{
             ctx.strokeRect(this.x+15, this.y+10, this.size.w-30, this.size.h-20);
        }       
        
        ctx.fillRect(this.x + (this.size.w), this.y, 4, 4);
    ctx.restore();
};
