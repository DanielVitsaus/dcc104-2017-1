"use strict";

var deltaTime = 0;

function start(){
    
    sheetBD.add("walk", "img/RobotBoyWalkSprite.png");
    sheetBD.add("idle", "img/RobotBoyIdleSprite.png");
    
    var canvas      = document.getElementById("game");
    var context     = canvas.getContext("2d");    
    
    sheetBD.printDataBase();
    
    var tra = new Player(new Vector2(0,0), 
                         new Vector2(128,256), 
                         new Vector2(0,0), 
                         new Vector2(128/2,256/2));
    
    var ob = new GameObject();
    
    var x , y = 0;
    console.log(tra.position);
    console.log(ob);
    
    Update();
    
    function Update (){
        
        requestAnimationFrame( Update );
        
        /*
        var inicio = new Date().getTime();
        var fim = new Date().getSeconds();
        
        if (fim === 0)
            fim = 1;
        
        fim = DT / fim ;
        
        deltaTime = (fim);//(Math.sqrt(DT) ) ;
        
        console.log(deltaTime);
        */
        
        //console.log(new Date().getSeconds());
    
        render(context);        
    }

    function render ( context ){

        context.clearRect(0,0,sizeScreem.width,sizeScreem.height); 
        context.save();
           

        //tra.Translate( context );
        tra.move();
        
        tra.limitMove();
        //tra.transform.acceleration.copy ( new Vector2(0,1).multiplyScalar(1 * -G / DT ) ) ;
        //tra.transform.acceleration.copy ( new Vector2(1,0).multiplyScalar(-30) ) ;
        
        tra.acceleration.copy ( new Vector2(x, 0.8 * -G / DT) ) ;
       
        
        
        //tra.transform.Rotate((Math.PI/180)*90, context);        
        context.translate(sizeScreem.width/2 - 64,sizeScreem.height/2);
        
        //tra.Rotate((Math.PI/180 * 45), context);
        //context.scale(-1,1);
       
        tra.animator.Play(tra.nameState, REPEAT, context );
        //console.log(tra.position);
        context.restore();

    }   
    
    
    addEventListener("keydown", function(e){
        if(e.keyCode == 37 || e.keyCode == 65){
            x = -80;
            tra.nameState = "walk";
            
        } else if(e.keyCode == 39 || e.keyCode == 68){
            x = 80 ;
            tra.nameState = "walk";
            
        } else if(e.keyCode == 38 || e.keyCode == 32){
            //if(!down) {
                //down = true;
                //dk.jump = true;
            //}
        }
    });
    
    addEventListener("keyup", function(e){
        if(e.keyCode == 37 || e.keyCode == 65){
            x = 0;
            tra.nameState = "idle";
            
        } else if(e.keyCode == 39 || e.keyCode == 68) {
            x = 0;
            tra.nameState = "idle";
            
        } else if(e.keyCode == 38 || e.keyCode == 32) {
            //dk.jump = false;
            //down = false;
        }					
    });
    
}

