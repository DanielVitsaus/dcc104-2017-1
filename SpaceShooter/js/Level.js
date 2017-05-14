"use strict";

function Level(context){
    
    this.spawnI = new Spawn(20, context);
    this.shots = [];
    this.lShot = 0;
    this.shotsIni = [];
    this.lShotIni = 0;
    this.qInimigo = 0;
    this.timeFire = 0;
    this.timeFireIni = 0;
    this.dacoP = 250;
    this.pontos = 0;
    
}

Level.prototype.desenhaLeve = function(ctx, pl){
    
    this.timeFire += deltaTime * 15;    
    this.timeFireIni += deltaTime * 10;    
    
    this.pontosP(ctx);
    this.playerDano(ctx);
    
    this.qInimigo = this.spawnI.objs.length;
    this.spawnI.spawnOBJ();
    
    for (var j = 0; j < this.spawnI.objs.length; j++){
        
        if (this.spawnI.objs[j].y > 0 && Math.trunc(pl.x - 10) <= Math.trunc(this.spawnI.objs[j].x) 
            && Math.trunc(pl.x + 25) >= Math.trunc(this.spawnI.objs[j].x)
            && this.spawnI.objs[j].y < pl.y
            && this.timeFireIni > 2){           
            
            this.fireIni(this.spawnI.objs[j]);            
            this.timeFireIni = 0;
        }
        for (var i = 0; i < this.shotsIni.length; i++){
            
            if (this.shotsIni[i] !== undefined && this.shotsIni[i].foraTelaIn()){
                //console.log("Fora");
                this.shotsIni.splice(i,1);
            }
            
            if(this.shotsIni[i] !== undefined && !this.shotsIni[i].colidiu(pl)){
                this.shotsIni[i].desenha(ctx);
                this.shotsIni[i].moveShot(ctx);
            }
            else if(this.shotsIni[i] !== undefined){
                this.shotsIni.splice(i,1);
                this.dacoP -= 10;
                if (this.dacoP <= 0){
                    gameover = true;
                    paused = paused ? false : true;   
                    if (!paused){
                        musica.pause();
                        musica.src = "audio/death.ogg";
                        musica.play();
                    }                   
                }
            }
            
        }
        
        //Tiro do player
        for(var i = 0 ; i < this.shots.length; i++){            
            
            if (this.shots[i].foraTela()){
                var fi = this.shots.splice(i,1);
                this.lShot = this.shots.length;
                //delete fi;
            }
            if ( this.shots[i] !== undefined && !this.shots[i].colidiu( this.spawnI.objs[j] ) ){
                this.shots[i].desenha(ctx)
                this.shots[i].moveShot();
            }            
            else if(this.shots[i] !== undefined){
                var fi = this.shots.splice(i,1);
                this.lShot = this.shots.length;
                
                this.spawnI.objs[j].d *= -1;
                this.spawnI.objs[j].y = (this.spawnI.objs[j].y + 135 + j) * -2.3;
                
                this.pontos++;
            }
            
        }
    }
     
};

Level.prototype.fire = function(playerCoord){
    
    var tiro = new Shot(bdSheets.get("tiro"), new Point(playerCoord.x + 35, playerCoord.y + 14), new Size(32,82), new Size(32/3,82/3), -1 );
    this.shots.push(tiro);
    this.lShot = this.shots.length;  
    if(audio){
        audio.play("tiro", 0.5);
    }
}

Level.prototype.fireIni = function(playerCoord){
    
    var x = 0,
        y = 0;
    
    if (playerCoord.size.w == 100){
        x = playerCoord.x + 44.5;
        y = playerCoord.y + 56;
        var tiro = new Shot(bdSheets.get("tiroini"), new Point(x , y ), new Size(32,82), new Size(32/3,82/3), 1 );   
    
        this.shotsIni.push(tiro);
        this.lShotIni = this.shotsIni.length; 
        if(audio){
           audio.play("tiroIN", 0.5);
        }
    }
    else{
        x = playerCoord.x + 19;
        y = playerCoord.y + 83;
        var tiro = new Shot(bdSheets.get("tiroini"), new Point(x , y ), new Size(32,82), new Size(32/3,82/3), 1 );   
    
        this.shotsIni.push(tiro);
        this.lShotIni = this.shotsIni.length; 
        if(audio){
            audio.play("tiroIN", 0.5);
        }
    }      
    
};

Level.prototype.playerDano = function(ctx){
    
    ctx.save();
        ctx.strokeStyle = "white";
        ctx.strokeRect(30,20 , 254,14);
        ctx.fillStyle = "red";
        ctx.fillRect(32 ,22 , this.dacoP,10);        
    ctx.restore();
    
}

Level.prototype.pontosP = function(ctx){
    
    ctx.save();
        ctx.drawImage(bdSheets.get("morto"), 910, 15, 30, 30);
        ctx.fillStyle = "white";
        ctx.font = "24px serif";
        ctx.fillText(": " + this.pontos, 950, 38);    
    ctx.restore();
}