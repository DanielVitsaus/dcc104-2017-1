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
        this.indexSpawn = Math.floor(Math.random() * (3 - 1) + 1 ) ;
        console.log(this.indexSpawn);
        this.instanciaOBJ();
		this.sp = true;
    }
    
    switch(this.indexSpawn){
    
        case 1:
			this.spawnZigDiag(-1,-1, false);
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
    
    for (var i = 0; i < this.quantOBJ ; i++){
        var o = new Enemy(bdSheets.get("ini01"),
                           new Point(sizeScreem.w - 75, -110),
                           new Size(50,100),
                           new Size(128,256));
        
        var o2 = new Enemy(bdSheets.get("ini02"),
                           new Point(sizeScreem.w - 75, -110),
                           new Size(100,100),
                           new Size(256,256));
        this.objs.push(o);
        this.objs2.push(o2);
    }    
    console.log(this.objs);
};

Spawn.prototype.spawnZigDiag = function(p , d, diag){
          
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
		
        for (var i = 0; i < this.objs.length; i++){
            this.y -= 180;
            if (!diag){                
                this.objs[i].y = this.y;           
                this.objs2[i].y = this.y + 80;           
            }else{
                this.objs[i].y = this.y ; 
                this.objs[i].x = this.x + ( (i+1) * 60 ) * d ;
                this.objs2[i].y = this.y ; 
                this.objs2[i].x = this.x + ( (i+1) * 60 ) * d ;
            } 
            
            this.objs[i].vx = this.vec.x;    
            this.objs[i].vy = this.vec.y;
            this.objs2[i].vx = this.vec.x;    
            this.objs2[i].vy = this.vec.y;           
        }
        this.x = 0;
        this.y = 0;
		this.sp = false;
    }
  
    
    for (var i = 0; i < this.objs.length; i++){       
        
        this.objs[i].desenhar(this.ctx);
        this.objs2[i].desenhar(this.ctx);
		if (!diag){           
           this.objs[i].moveZig(d);	         
           this.objs2[i].moveZig(d * -1);	         
            
		}else{
			this.objs[i].moveDiag(deltaTime);
			this.objs2[i].moveDiag(deltaTime);
		}
		if(this.objs[i].foraTela()){
			var o = this.objs.splice(i,1);            
			var o2 = this.objs2.splice(i,1);            
            delete o;
            delete o2;
		}else{
            
        }        
	}    
    
};

Spawn.prototype.spawnLinha = function(){   
    
    if (this.sp){
		var xa = 30;
		var xa2 = 50;
		var ya = -200;
		this.x = 0;		
		this.y = -100;
        
        for (var i = 0; i < this.quantOBJ; i++){            
			           
			if (xa >= sizeScreem.w - 80){
				this.y -= 200;
				xa = 30;
			}
            if (xa2 >= sizeScreem.w - 80){
				ya -= 200;
				xa2 = 50;
			}
           
			this.objs[i].x = xa;
			this.objs2[i].x = xa2;
            this.objs[i].y = this.y; 
            this.objs2[i].y = ya; 
            xa += 100; 
            xa2 += 100; 
        }
		this.sp = false;
    }
    this.y = 0;
	
	for (var i = 0; i < this.objs.length; i++){
        this.objs[i].desenhar(this.ctx);
        this.objs[i].velZIg = 3;
        this.objs[i].vy = this.vel;
		this.objs[i].moveD(deltaTime);
        
        this.objs2[i].desenhar(this.ctx);
        this.objs2[i].velZIg = 3;
        this.objs2[i].vy = this.vel;
		this.objs2[i].moveD(deltaTime);
        
		if(this.objs[i].foraTelaLinha()){
			var o = this.objs.splice(i,1);
			var o2 = this.objs2.splice(i,1);
            delete o;
            delete o2;
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
