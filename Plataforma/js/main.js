"use strict";

var deltaTime = 0;

function start(){
       
    sheets.add("walk", "img/RobotBoyWalkSprite.png");
    sheets.add("idle", "img/RobotBoyIdleSprite.png");
    sheets.add("jump", "img/RobotBoyJumpSprite.png");
    sheets.add("background", "img/back.png");
    sheets.add("chao", "img/p1.png");
    
    
    var canvas      = document.getElementById("game");
    var context     = canvas.getContext("2d");    
    
      
    console.log("W -> " + sizeScreem.width + " H -> " + sizeScreem.height);
    
    var tra = new Player(new Vector2(0,0), 
                         new Vector2(128,256), 
                         new Vector2(sizeScreem.width/2,sizeScreem.height/2), 
                         new Vector2(128/2,256/2));
    
    var ob = new GameObject();   
    
    var c = new Transform();
    
    var mapa = new Map(sizeScreem.width/12,sizeScreem.height/12);
    
    console.log(c);
    
    var x = 1 , y = 0;
    
    Update();
    
    function Update (){
        
        requestAnimationFrame( Update );      
    
        render(context);        
    }

    function render ( context ){

        context.clearRect(0,0,sizeScreem.width,sizeScreem.height); 
        context.drawImage(sheets.get("background"), 0,0, sizeScreem.width,sizeScreem.height);
        
        mapa.desenhar(context);
        
        tra.move( context );   
        tra.limitMove();          
        tra.draw( context );      
        
    }   
    
    var down = false;
    var contJump = 1;
    
    
    addEventListener("keydown", function(e){
        //console.log(e.keyCode);
        if(e.keyCode == 37 || e.keyCode == 65){
            tra.moveToRight = true;
            x = 1;
            
        } else if(e.keyCode == 39 || e.keyCode == 68){
            tra.moveToLeft = true;
            x = -1;
            
        } else if(e.keyCode == 38 || e.keyCode == 32){           
           
            if(!tra.components["sprite"].animation.isExecuting("jump")) {                
                tra.jump = true;
                contJump++;
            }
        }
    });
    
    addEventListener("keyup", function(e){
       
        if(e.keyCode == 37 || e.keyCode == 65){
            tra.moveToRight = false;
            
        } else if(e.keyCode == 39 || e.keyCode == 68) {
            tra.moveToLeft = false;
            
        } else if(e.keyCode == 38 || e.keyCode == 32) {
            tra.jump = false;
            down = false;            
        }					
    });
    
}
