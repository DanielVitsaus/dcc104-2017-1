

function Shot(img, coord, size, dime, d){
    
    this.coord = coord  || new Point(0,0);
    this.img = img      || bdSheets.get("tiro");
    this.size = size    || new Size(50,50);
    this.dime = dime    || new Size(50,50);
    this.d = d          || 1;
    this.x = coord.x;
    this.y = coord.y;
    this.vx = 0;
    this.vy = 30 * d;
    this.ax = 0;
    this.ay = 20;
    this.limiteTopo = 50;
    
}

Shot.prototype.desenha = function(ctx){
    ctx.save();
        ctx.translate(this.x, this.y);    
            ctx.drawImage(this.img, 0, 0, this.size.w, this.size.h, 0, 0, this.dime.w, this.dime.h);
    ctx.restore();
};

Shot.prototype.moveShot = function(){
    
    //this.vy = this.vy + this.ay * deltaTime;
    
    this.y = this.y + this.vy * deltaTime;
};

Shot.prototype.foraTela = function(){
    
    /*
    if (this.d > 0){
        this.limiteTopo *= d;
        if (this.y > this.limiteTopo){ return true; }
    }
    else{
        this.limiteTopo *= d;
        
    }  
    */
    if (this.y < 20 * this.d){ return true; }
    
}

Shot.prototype.colidiu = function(alvo){
    
    var esq = this.x,
        dir = this.x + this.dime.w,
        alvoEsq = alvo.x + 10,
        alvoDir = alvo.x + (alvo.size.w - 10),
        top = this.y,
        alvoTop = alvo.y + 10,
        botoom = this.y + this.dime.h, 
        alvoB = alvo.y + (alvo.size.h - 10);
    
    if (alvo.size.w - 10 == 40){
        alvoEsq = alvo.x + 4;
        alvoDir = alvo.x + (alvo.size.w - 0);      
        alvoTop = alvo.y + 6;    
        alvoB = alvo.y + (alvo.size.h - 10);
    }else{
        //console.log("Deu"); 
        alvoEsq = alvo.x + 10;
        alvoDir = alvo.x + (alvo.size.w - 15);      
        alvoTop = alvo.y + 10;    
        alvoB = alvo.y + (alvo.size.h - 8);
    }  
    
    //lado superio esquedo do alvo e lado inferior direito do this.
    if(dir > alvoEsq && alvoTop < botoom && dir < alvoDir && alvoB > botoom) { return true; }
    
    //lado superio direito do alvo e lado inferior esquerdo do this.
    if(esq < alvoDir && alvoTop < botoom && dir > alvoEsq && alvoB > botoom) { return true; }
    
     //lado inferior esquero do alvo e lado superior direito do this.
    if(top < alvoB && dir > alvoEsq && dir < alvoDir && alvoB < botoom) { return true; }
    
    //lado inferior direito do alvo e lado superior esquerdo do this.
    if(top < alvoB && esq < alvoDir && esq > alvoEsq && alvoB < botoom) { return true; }   
    
}

Shot.prototype.desenhaACo = function(ctx){
    
    ctx.save();
        ctx.strokeStyle = 'firebrick';
        ctx.strokeRect(this.x, this.y, this.dime.w, this.dime.h);
        ctx.fillRect(this.x, this.y, 4, 4);
    ctx.restore();
}

