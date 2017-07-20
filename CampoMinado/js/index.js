function Text(font, size, rgb) {
	this.font = font 	|| "Verdana";
	this.size = size 	|| 20;
	this.color = rgb 	|| "#fff  " ;
	
	this.raster = function(ctx, text, x, y) {
		ctx.font = "" + this.size + "px " + this.font;
		ctx.fillStyle = this.color;
		ctx.fillText(text, x, y);
	}
}

function start(){
    
    var lastTime = 0;
    var deltaTime = 0;
    var time = 0;
    
    var textPontos = new Text();   
    var qBomb = new Text("Verdana", 20, "#E80000");
    var qfrut = new Text("Verdana", 20, "#00E8E8");
    
    var imgFrut = new Image();
    imgFrut.src = "img/frut2.png";
    var imgBomb = new Image();
    imgBomb.src = "img/bomb.png";
    
    var imgGameOver = new Image();
    imgGameOver.src = "img/gameover.jpg";
    var imgWinner = new Image();
    imgWinner.src = "img/w1.png";
    
    var pontos = 0;
    var qtFrut = 0;
    var qtBomb = 0;
    
    var canvas = document.getElementById("game");
    var context = canvas.getContext("2d");
    
    const WIDTH = canvas.offsetWidth;
	const HEIGHT = canvas.offsetHeight;
    
    var mapa = new Map(10,10);
    
    var fadePlaca = false;
    var x = 0;
    var y = 0;
    var gameover = false;
    var winner = false;
    
    window.requestAnimationFrame( Update , canvas );
    
    function Update (t){
        time = t;
        var now = t;
        deltaTime = (now - lastTime) / 1000;         
        
        window.requestAnimationFrame( Update , canvas);            
        render(deltaTime);
        
        lastTime = now;
    }

    function render(deltaTime){
        
       if (gameover) {
           
           context.save();
                context.drawImage(imgGameOver, 5,50, 600,600);
            
                context.font = '24px Helvetica';
                context.fillStyle = 'cornflowerblue';
                context.fillText("Pressione 'r' para reiniciar!", 10, 760);
                    
            context.restore();
       }
       else if (winner) {
           
           context.save();
                context.drawImage(imgWinner, 5,50, 600,600);
            
                context.font = '24px Helvetica';
                context.fillStyle = 'cornflowerblue';
                context.fillText("Pressione 'r' para reiniciar!", 10, 760);
                    
            context.restore();
       }
        
       else{
           context.clearRect(0, 0, WIDTH, HEIGHT);	
            context.save();
                context.drawImage(imgFrut,WIDTH - 170, 5, 33,33);
                context.drawImage(imgBomb,WIDTH - 368, 8, 35,35);
                textPontos.raster(context, "Pontos: " + pontos, 12, 30);
                qBomb.raster(context, "Bombas: " + qtBomb, WIDTH - 325, 30);
                qfrut.raster(context, "Frutas: " + qtFrut, WIDTH - 125, 30);

                context.translate(5,50);
                    mapa.desenhar(context);   


                if (fadePlaca && mapa.alfaPlaca > 0.0){                    
                    mapa.alfaPlaca -= deltaTime * 10; 
                }else if (mapa.alfaPlaca <= 0.0){
                    //itemPro();
                    fadePlaca = false;
                    mapa.alfaPlaca = 1.0;
                    mapa.cells[mapa.posPlayer.idY - y][mapa.posPlayer.idX - x] = -1;   

                    if (mapa.cellsIt[mapa.posPlayer.idY - y][mapa.posPlayer.idX - x] == 3){
                        winner = true;                        
                    }
                    
                    if (mapa.cellsIt[mapa.posPlayer.idY - y][mapa.posPlayer.idX - x] == 2){
                        mapa.cellsIt[mapa.posPlayer.idY - y][mapa.posPlayer.idX - x] = 0;
                        gameover = true;
                        console.log("GameOver");
                    }
                    
                    if (mapa.cellsIt[mapa.posPlayer.idY - y][mapa.posPlayer.idX - x] == 1){
                        pontos++;
                        mapa.cellsIt[mapa.posPlayer.idY - y][mapa.posPlayer.idX - x] = 0;
                        console.log("Pontos");
                    }                    
                    
                    x = 0;
                    y = 0;

                }        

            context.restore();        
        }
    }
    
    function itemPro(){
        
        if (mapa.posPlayer.idY > 0 && mapa.posPlayer.idX > 0  
            && mapa.posPlayer.idY < 9 && mapa.posPlayer.idX < 9 ){
            
            if (mapa.cellsIt[mapa.posPlayer.idY - 1][mapa.posPlayer.idX - 1] == 1){
                qtFrut++;
            }
            if (mapa.cellsIt[mapa.posPlayer.idY - 1][mapa.posPlayer.idX] == 1){
                qtFrut++;
            }
            if (mapa.cellsIt[mapa.posPlayer.idY - 1][mapa.posPlayer.idX + 1] == 1){
                qtFrut++;
            }
            if (mapa.cellsIt[mapa.posPlayer.idY + 1][mapa.posPlayer.idX ] == 1){
                qtFrut++;
            }
            if (mapa.cellsIt[mapa.posPlayer.idY + 1][mapa.posPlayer.idX - 1] == 1){
                qtFrut++;
            }
            if (mapa.cellsIt[mapa.posPlayer.idY ][mapa.posPlayer.idX - 1] == 1){
                qtFrut++;
            }
            if (mapa.cellsIt[mapa.posPlayer.idY ][mapa.posPlayer.idX + 1] == 1){
                qtFrut++;
            }
            if (mapa.cellsIt[mapa.posPlayer.idY + 1][mapa.posPlayer.idX + 1] == 1){
                qtFrut++;
            }
            
            // bomba
            
            if (mapa.cellsIt[mapa.posPlayer.idY - 1][mapa.posPlayer.idX - 1] == 2){
                qtBomb++;
            }
            if (mapa.cellsIt[mapa.posPlayer.idY - 1][mapa.posPlayer.idX] == 2){
                qtBomb++;
            }
            if (mapa.cellsIt[mapa.posPlayer.idY - 1][mapa.posPlayer.idX + 1] == 2){
                qtBomb++;
            }
            if (mapa.cellsIt[mapa.posPlayer.idY + 1][mapa.posPlayer.idX ] == 2){
                qtBomb++;
            }
            if (mapa.cellsIt[mapa.posPlayer.idY + 1][mapa.posPlayer.idX - 1] == 2){
                qtBomb++;
            }
            if (mapa.cellsIt[mapa.posPlayer.idY ][mapa.posPlayer.idX - 1] == 2){
                qtBomb++;
            }
            if (mapa.cellsIt[mapa.posPlayer.idY ][mapa.posPlayer.idX + 1] == 2){
                qtBomb++;
            }
            if (mapa.cellsIt[mapa.posPlayer.idY + 1][mapa.posPlayer.idX + 1] == 2){
                qtBomb++;
            }
        }        
    }
    
    function is_movePlayer(key){
        console.log(mapa.posPlayer);
        switch(key){
        
            case 37 :
                if (mapa.posPlayer.idX > 0){
                    return true;
                }
                else{
                    return false;
                }
                break;
                
            case 38 :
                if (mapa.posPlayer.idY > 0){
                    return true;
                }
                else{
                    return false;
                }
                break;
                
            case 39 :
                if (mapa.posPlayer.idX < 9){
                    return true;
                }
                else{
                    return false;
                }
                break;
                
            case 40 :
                if (mapa.posPlayer.idY < 9){
                    return true;
                }
                else{
                    return false;
                }
                break;     
                
            default:
                return false;
                break;
                
        }
    }
    
    addEventListener("keydown", function(e){    
               
        
        if (e.keyCode == 82 && (gameover || winner)){            
            location.reload();       
        }
       
		if(e.keyCode == 87 || e.keyCode == 38) {// W
            if (is_movePlayer(e.keyCode))
            {
                y = 1;
                if (mapa.cells[mapa.posPlayer.idY - y][mapa.posPlayer.idX] != -2){
                    
                    mapa.cells[mapa.posPlayer.idY ][mapa.posPlayer.idX] = -2;
                    mapa.cells[mapa.posPlayer.idY - y][mapa.posPlayer.idX] = 10;            
                }
                mapa.cells[mapa.posPlayer.idY ][mapa.posPlayer.idX] = -2;
                fadePlaca = true;                
               
                
            }			
		} else if(e.keyCode == 65 || e.keyCode == 37) { // A
			if (is_movePlayer(e.keyCode))
            {
                x = 1;
                if (mapa.cells[mapa.posPlayer.idY ][mapa.posPlayer.idX - x] != -2){
                    
                    mapa.cells[mapa.posPlayer.idY ][mapa.posPlayer.idX] = -2;
                    mapa.cells[mapa.posPlayer.idY ][mapa.posPlayer.idX - x] = 10;            
                }
                mapa.cells[mapa.posPlayer.idY ][mapa.posPlayer.idX] = -2;
                fadePlaca = true; 
            }
            
		} else if(e.keyCode == 83 || e.keyCode == 40) { // S
			if (is_movePlayer(e.keyCode))
            {
                y = -1;
                if (mapa.cells[mapa.posPlayer.idY - y][mapa.posPlayer.idX] != -2){
                    
                    mapa.cells[mapa.posPlayer.idY ][mapa.posPlayer.idX] = -2;
                    mapa.cells[mapa.posPlayer.idY - y][mapa.posPlayer.idX] = 10;            
                }
                mapa.cells[mapa.posPlayer.idY ][mapa.posPlayer.idX] = -2;
                fadePlaca = true;  
            }
		} else if(e.keyCode == 68 || e.keyCode == 39) { // D
			if (is_movePlayer(e.keyCode))
            {
                x = -1;
                if (mapa.cells[mapa.posPlayer.idY ][mapa.posPlayer.idX - x] != -2){
                    
                    mapa.cells[mapa.posPlayer.idY ][mapa.posPlayer.idX] = -2;
                    mapa.cells[mapa.posPlayer.idY ][mapa.posPlayer.idX - x] = 10;            
                }
                mapa.cells[mapa.posPlayer.idY ][mapa.posPlayer.idX] = -2;
                fadePlaca = true;  
            }
            
		}
        
	});
    
    addEventListener("keyup", function(e){
        
		if(e.keyCode == 87 || e.keyCode == 83 || e.keyCode == 40 || e.keyCode == 38) { // W ou S
			
		} else if(e.keyCode == 65 || e.keyCode == 37) { // A
			
		} else if(e.keyCode == 68 || e.keyCode == 39) { // D
			
		}
        
	});
    
}