

function Shot(img, coord, size, dime, d){
    
    this.coord = coord  || new Point(0,0);
    this.img = img      || bdSheets.get("tiro");
    this.size = size    || new Size(50,50);
    this.dime = dime    || new Size(50,50);
    this.d = d          || 1;
    this.x = coord.x;
    this.y = coord.y;
    this.vx = 0;
    this.vy = 400 * d;
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
    if (this.y < -50){ return true; }
    
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
    
    /*
    if(dir > alvoEsq && alvoTop > top && alvoTop < botoom && esq < alvoEsq
        || dir > alvoEsq && alvoB < botoom && alvoB > top && esq < alvoEsq
        || esq < alvoDir && alvoTop > top && alvoTop < botoom && dir > alvoDir) { 
        console.log("Alvo -> ", alvo.x); 
        console.log("Tiro -> ", dir); 
        console.log("Deu"); 
        return true;}
    */
    
    if(top < alvoB && esq > alvoEsq && dir < alvoDir && alvoB < botoom) { 
        console.log("Alvo -> ", alvo.x); 
        console.log("Tiro -> ", dir); 
        console.log("Deu"); 
        return true;}
    
}

Shot.prototype.desenhaACo = function(ctx){
    
    ctx.save();
        ctx.strokeStyle = 'firebrick';
        ctx.strokeRect(this.x, this.y, this.dime.w, this.dime.h);
        ctx.fillRect(this.x, this.y, 4, 4);
    ctx.restore();
}

