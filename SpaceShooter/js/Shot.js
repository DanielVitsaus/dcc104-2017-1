

function Shot(img, coord, size, dime){
    
    this.coord = coord  || new Point(0,0);
    this.img = img      || bdSheets.get("tiro");
    this.size = size    || new Size(50,50);
    this.dime = dime    || new Size(50,50);
    this.x = coord.x;
    this.y = coord.y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 20;
    
}

Shot.prototype.desenha = function(ctx){
    ctx.save();
        ctx.translate(this.x, this.y);    
            ctx.drawImage(this.img, 0, 0, this.size.w, this.size.h, 0, 0, this.dime.w, this.dime.h);
    ctx.restore();
};

Shot.prototype.moveShot = function(deltaTime){
    
    this.vy = this.vy + this.ay * deltaTime;
    
    this.y = this.y + this.vy * deltaTime;
};

