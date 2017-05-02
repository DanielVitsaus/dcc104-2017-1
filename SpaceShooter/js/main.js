

function start()
{
    bdSheets.add("background", "/img/back.png");
    bdSheets.add("player", "/img/player.png");
    bdSheets.add("tiro", "/img/tiro.png");
    bdSheets.add("missel", "/img/missel.png");
    bdSheets.add("bomba", "/img/bomba.png");
    bdSheets.add("ini01", "/img/inimigo01.png");
    bdSheets.add("ini02", "/img/inimigo02.png");
    bdSheets.add("meteoro", "/img/meteoro.png");
    
    var canvas      = document.getElementById("game");
    var context     = canvas.getContext("2d"); 
    
    var sizeScreem = new Size(canvas.width, canvas.height);
    
    var player = new Sprite(bdSheets.get("player"),
                            new Point(sizeScreem.w/2, sizeScreem.h/2),
                            new Size(80,80),
                            new Size(256,256));
    
    Update();
    function Update (){    
        
        requestAnimationFrame( Update , canvas);          
        render();  
    }
    
    function render(){
        
        context.save();
            context.drawImage(bdSheets.get("background"), 0,0 , 1024,1024, 0,0, 1024,1024);
        
            //context.drawImage(bdSheets.get("player"), 0, 0 , 256,256,1024/2,768/2, 80,80);        
        
            player.desenhar(context);
            player.mover(DT);
        context.restore();
    }
    
    
    addEventListener("keydown", function(e){
        
		if(e.keyCode == 87 || e.keyCode == 38) {// W
			player.ay = -5;
		} else if(e.keyCode == 65 || e.keyCode == 37) { // A
			player.ax = -5;
		} else if(e.keyCode == 83 || e.keyCode == 40) { // S
			player.ay = 5;
		} else if(e.keyCode == 68 || e.keyCode == 39) { // D
			player.ax = 5;
		}
	});

	addEventListener("keyup", function(e){
		if(e.keyCode == 87 || e.keyCode == 83 || e.keyCode == 40 || e.keyCode == 38) { // W ou S
			player.ay = 0;
		} else if(e.keyCode == 65 || e.keyCode == 37) { // A
			player.ax = 0;
		} else if(e.keyCode == 68 || e.keyCode == 39) { // D
			player.ax = 0;
		}
	});
    
}