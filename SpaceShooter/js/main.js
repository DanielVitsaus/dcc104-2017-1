(function() {
    console.log("Daniel");
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

function start()
{
    bdSheets.add("background", "img/back.png");
    bdSheets.add("player", "img/player.png");
    bdSheets.add("tiro", "img/tiro2.png");
    bdSheets.add("missel", "img/missel.png");
    bdSheets.add("bomba", "img/bomba.png");
    bdSheets.add("ini01", "img/inimigo01.png");
    bdSheets.add("ini02", "img/inimigo02.png");
    bdSheets.add("meteoro", "img/meteoro.png");
    bdSheets.add("thruster", "img/thruster.png");
    bdSheets.add("gameover", "img/gameover.jpg");

    
    var isFPS = false;
    var fps = 0;
    var paused = true;
    var gameover = false;
   
    var lastTime = 0;
    
    var canvas      = document.getElementById("game");
    var context     = canvas.getContext("2d");

    sizeScreem = new Size(canvas.width, canvas.height);

    var player = new Sprite(bdSheets.get("player"),
                            new Point(sizeScreem.w/2-40, sizeScreem.h - 150),
                            new Size(80,80),
                            new Size(256,256),
                            bdSheets.get("thruster"));

    var back01 = new Sprite(bdSheets.get("background"),
                       new Point(0, 0),
                       new Size(1024,1024));
    
    var back02 = new Sprite(bdSheets.get("background"),
                       new Point(0, -(1024)),
                       new Size(1024,1024));
    
    var inimigo = new Enemy(bdSheets.get("ini01"),
                           new Point(sizeScreem.w - 75, 50),
                           new Size(50,100),
                           new Size(128,256));
    
    var spawnI = new Spawn(40, context);

    back01.vy = 15;
    back02.vy = 15;
        
    var tiro = new Shot(bdSheets.get("tiro"), new Point(player.x + 35,player.y + 14), new Size(32,82), new Size(32/3,82/3), -1);
    
    window.requestAnimationFrame( Update , canvas );
    
    function Update (t){
        time = t;
        var now = t;
        deltaTime = (now - lastTime) / 1000;             
        fps = 1000 / (now - lastTime);
        
        window.requestAnimationFrame( Update , canvas);            
        render(deltaTime);
        
        lastTime = now;
    }

    function render(deltaTime){

        //console.log("POS -> ",player.x);
        //console.log("Delta -> ", deltaTime);
        
        if (paused){  
            context.clearRect(0,0, canvas.width,canvas.height);

                back01.moveBackground(deltaTime, back02);
                back01.desenhaBackground(context);       

                back02.moveBackground(deltaTime,back01);
                back02.desenhaBackground(context);    

                //spawnI.spawnOBJ();
            
                //tiro.desenhaACo(context);
                //tiro.desenha(context);
                //tiro.colidiu(player);
            
                player.desenhar(context);
                player.desenhaACo(context);
                //inimigo.desenhar(context);
                //inimigo.moveZig(deltaTime);
                player.limitePlayer();
                player.mover(deltaTime);
            
                

                //context.drawImage(bdSheets.get("tiro"), 0, 0 , 32,82, sizeScreem.w/2 - 4.8, sizeScreem.h/2 + 18 , 10,30);
        }
        else{       
            context.save()
                context.translate(canvas.width/2 - 140, canvas.height/2- 100);             
                    context.font = '80px Helvetica';
                    context.fillStyle = 'firebrick';//'cornflowerblue';
                    context.fillText("Paused", 0,0);        
            context.restore();            
        }
        
        if (gameover){
            context.save();
                context.drawImage(bdSheets.get("gameover"), 0,0, 1024,768);
            
                context.font = '24px Helvetica';
                context.fillStyle = 'cornflowerblue';
                context.fillText("Pressione 'r' para reiniciar!", 10, 760);
                    
            context.restore();
        }
        
        if(isFPS){
            context.save();
                context.font = '20px Helvetica';
                context.fillStyle = 'firebrick';
                context.fillText("FPS -> " + Math.trunc(fps), 10,25); 
            context.restore();
        }
    }


    addEventListener("keydown", function(e){
        
        
        if(e.keyCode == 32 && player.timeFire > 2){
            player.fire();
            player.timeFire = 0;
        }
        
        if(e.keyCode == 192){
            isFPS = isFPS ? false : true;  
        }
        
        if (e.keyCode == 80){            
            paused = paused ? false : true;           
        }
       
		if(e.keyCode == 87 || e.keyCode == 38) {// W
			player.ay = -8 / deltaTime;
            player.th = 40;
            back01.vy = 25;
            back02.vy = 25;
            spawnI.vel = 250;
		} else if(e.keyCode == 65 || e.keyCode == 37) { // A
			player.ax = -8 / deltaTime;           
		} else if(e.keyCode == 83 || e.keyCode == 40) { // S
			player.ay = 8 / deltaTime;
            player.th = 20;
            back01.vy = 10;
            back02.vy = 10;
            spawnI.vel = 100;
		} else if(e.keyCode == 68 || e.keyCode == 39) { // D
			player.ax = 8 / deltaTime;
		}
	});

	addEventListener("keyup", function(e){
		if(e.keyCode == 87 || e.keyCode == 83 || e.keyCode == 40 || e.keyCode == 38) { // W ou S
			player.ay = 0;
            player.th = 30;
            back01.vy = 15;
            back02.vy = 15;
            spawnI.vel = 180;
		} else if(e.keyCode == 65 || e.keyCode == 37) { // A
			player.ax = 0;
		} else if(e.keyCode == 68 || e.keyCode == 39) { // D
			player.ax = 0;
		}
	});

}
