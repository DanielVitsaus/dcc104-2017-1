"use strict";

var deltaTime = 0;

function start(){
    
    sheetBD.add("walk", "./img/RobotBoyWalkSprite.png");
    
    var canvas      = document.getElementById("game");
    var context     = canvas.getContext("2d");    
    
    sheetBD.printDataBase();
    
    var tra = new Player(new Vector2(0,0), 
                         new Vector2(128,256), 
                         new Vector2(sizeScreem.width/2 - 64,sizeScreem.height/2), 
                         new Vector2(128/2,256/2));
    
    var ob = new GameObject();
    
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
           
        
        tra.Translate( context );
        tra.limitMove();
        //tra.transform.acceleration.copy ( new Vector2(0,1).multiplyScalar(1 * -G / DT ) ) ;
        //tra.transform.acceleration.copy ( new Vector2(1,0).multiplyScalar(-30) ) ;
        
        tra.acceleration.copy ( new Vector2(50, 0.5 * -G / DT) ) ;
       
        //tra.transform.Rotate((Math.PI/180)*90, context);        
        
        tra.animator.Play("walk", REPEAT, context );
        
        context.restore();

    }   
    
}

