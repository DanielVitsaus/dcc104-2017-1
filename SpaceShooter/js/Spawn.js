function Spawn(quantOBJ , ctx){
    
    this.objs = [];
    this.objs2 = [];
    this.obj = undefined;
    this.direita = false;
    this.esquerda = false;
    this.sp = true; 
    this.coord = new Point(0,0);
    this.ac = new Point(0,0);
    this.vec = new Point(0,0);
    this.quantOBJ = quantOBJ || 20;
    this.indexSpawn = 1;
    this.x = 0;
    this.y = 50;
    this.index = 1;
    this.ctx = ctx;
    this.vel = 180;
};

Spawn.prototype.spawnOBJ = function()
{    
    if (this.objs.length < 1){
        this.indexSpawn = 1;//Math.floor(Math.random() * (3 - 1) + 1 ) ;
        console.log(this.indexSpawn);
        //this.instanciaOBJ();
		this.sp = true;
    }
    
    switch(this.indexSpawn){
    
        case 1:
			this.spawnZigDiag(-1,1, false);
            break;
        case 2:
			//this.spawnZigDiag(0,-1, false);
            this.spawnLinha();
            break;
        case 3:
			//this.spawnZigDiag(0,-1, false);
            break;
        case 4:
			//this.spawnZigDiag(1,-1, false);
            break;
		case 5:
			//this.spawnLinha();
			//this.spawnLinha();
			break;
        default:
            break;
    }
};

Spawn.prototype.instanciaOBJ = function(){
    
    var iminigo1 = true;
    
    for (var i = 0; i < this.quantOBJ ; i++){          
        
        if(iminigo1){
            var o = new Enemy(bdSheets.get("ini01"),
                           new Point(sizeScreem.w - 75, -110),
                           new Size(50,100),
                           new Size(128,256));
            
            this.objs.push(o);
            iminigo1 = false;
        }
        else{
            var o2 = new Enemy(bdSheets.get("ini02"),
                           new Point(sizeScreem.w - 75, -110),
                           new Size(100,100),
                           new Size(256,256));
            iminigo1 = true;
            this.objs.push(o2);
        }
        
        
    }    
    console.log(this.objs);
};

Spawn.prototype.spawnZigDiag = function(p , d, diag){
    
    var iminigo1 = true;
          
    if (this.sp){        
		this.vec.x = 120 * d;
        if (diag){
            this.vec.y = this.vec.x * d;
            this.vec.x *= d;
        }else{
            this.vec.y = 80;
        }
        
		if (p == -1){
			this.x = 0;            
		}else if (p == 0){
			this.x = sizeScreem.w/2;
            d *= -1;
		}else if(p == 1){
			this.x = sizeScreem.w;
		}
		
        for (var i = 0; i < this.quantOBJ ; i++){
            console.log("Cria");
             if(iminigo1){
                var o = new Enemy(bdSheets.get("ini01"),
                               new Point(sizeScreem.w - 75, -110),
                               new Size(50,100),
                               new Size(128,256));

                this.objs.push(o);
                iminigo1 = false;
            }
            else{
                var o2 = new Enemy(bdSheets.get("ini02"),
                               new Point(sizeScreem.w - 75, -110),
                               new Size(100,100),
                               new Size(256,256));
                iminigo1 = true;
                this.objs.push(o2);
            }
            
            this.y -= 180;
            if (!diag){                
                this.objs[i].y = this.y;           
            }else{
                this.objs[i].y = this.y ; 
                this.objs[i].x = this.x + ( (i+1) * 60 ) * d ;
            } 
            
            this.objs[i].vx = this.vec.x;    
            this.objs[i].vy = this.vec.y;
        }
        this.x = 0;
        this.y = 0;
		this.sp = false;
    }
  
    // DESENHA E MOVIMENTA
    for (var i = 0; i < this.objs.length; i++){       
        
        this.objs[i].desenhar(this.ctx);
		if (!diag){           
           this.objs[i].moveZig();	         
            
		}else{
			this.objs[i].moveDiag(deltaTime);
		}
		if(this.objs[i].foraTela()){
            this.objs[i].d *= -1;
            this.objs[i].y = (this.objs[i].y + 135 + i ) * -1.3;   
		}else{
            
        }        
	}    
    
};

Spawn.prototype.spawnLinha = function(){   
    
    var iminigo1 = true;
    
    if (this.sp){
		var xa = 50;
		this.x = 0;		
		this.y = -100;
        
        for (var i = 0; i < this.quantOBJ; i++){
            console.log("Cria");
            if(iminigo1){
                var o = new Enemy(bdSheets.get("ini01"),
                               new Point(sizeScreem.w - 75, -110),
                               new Size(50,100),
                               new Size(128,256));

                this.objs.push(o);
                iminigo1 = false;
            }
            else{
                var o2 = new Enemy(bdSheets.get("ini02"),
                               new Point(sizeScreem.w - 75, -110),
                               new Size(100,100),
                               new Size(256,256));
                iminigo1 = true;
                this.objs.push(o2);
            }
			           
			if (xa >= sizeScreem.w - 80){
				this.y -= 100;
				xa = 40;
			}            
           
			this.objs[i].x = xa;
            this.objs[i].y = this.y; 
            xa += this.objs[i].size.w + 30; 
        }
		this.sp = false;
    }
    this.y = 0;
	
    // DESENHA E MOVIMENTA
	for (var i = 0; i < this.objs.length; i++){
        this.objs[i].desenhar(this.ctx);
        this.objs[i].desenhaACo(this.ctx);
        this.objs[i].velZIg = 3;
        this.objs[i].vy = this.vel;
		this.objs[i].moveD(deltaTime);
                
		if(this.objs[i].foraTelaLinha()){
			var o = this.objs.splice(i,1);
            delete o;
		}
	}
    //3ti7x1mbdj!
};

/*

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo(i) {  
  await sleep(500);  
    this.objs[i].moveZig(deltaTime);
}
*/
