"use strict";

var deltaTime = 0;

function start(){
    
    /*
    sheetBD.add("walk", "img/RobotBoyWalkSprite.png");
    sheetBD.add("idle", "img/RobotBoyIdleSprite.png");
    */
    
    sheets.add("walk", "img/RobotBoyWalkSprite.png");
    sheets.add("idle", "img/RobotBoyIdleSprite.png");
    sheets.add("jump", "img/RobotBoyJumpSprite.png");
    
    
    var canvas      = document.getElementById("game");
    var context     = canvas.getContext("2d");    
    
    //sheets.print();
    
    var tra = new Player(new Vector2(0,0), 
                         new Vector2(128,256), 
                         new Vector2(sizeScreem.width/2,sizeScreem.height/2), 
                         new Vector2(128/2,256/2));
    
    var ob = new GameObject();
    
    var x = 1 , y = 0;
    console.log(tra.position);
    console.log(sizeScreem);
    console.log(ob);
    
    Update();
    
    function Update (){
        
        requestAnimationFrame( Update );      
    
        render(context);        
    }

    function render ( context ){

        context.clearRect(0,0,sizeScreem.width,sizeScreem.height); 
        
        tra.move( context );   
        tra.limitMove();          
        tra.draw( context );       

    }   
    
    var down = false;
    var contJump = 1;
    
    addEventListener("keydown", function(e){
        if(e.keyCode == 37 || e.keyCode == 65){
            tra.moveToRight = true;
            tra.nameState = "walk";
            x = 1;
            console.log("L -> " + Math.trunc(sizeScreem.height - 64));
            //tra.position.multiplyVectors(new Vector2(-1,1));
            
        } else if(e.keyCode == 39 || e.keyCode == 68){
            tra.moveToLeft = true;
            tra.nameState = "walk";
            x = -1;
            
        } else if(e.keyCode == 38 || e.keyCode == 32){           
           
            if(!down) {
                
                down = true;
                tra.jump = true;
                contJump++;
            }
        }
    });
    
    addEventListener("keyup", function(e){
        if(e.keyCode == 37 || e.keyCode == 65){
            tra.moveToRight = false;
            tra.nameState = "idle";
            
        } else if(e.keyCode == 39 || e.keyCode == 68) {
            tra.moveToLeft = false;
            tra.nameState = "idle";
            
        } else if(e.keyCode == 38 || e.keyCode == 32) {
            tra.jump = false;
            if (Math.trunc(tra.position.y) == Math.trunc(sizeScreem.height - 64)){
                down = false;
                contJump = 1;
            }
        }					
    });
    
}

