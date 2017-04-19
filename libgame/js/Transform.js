"use strict";

function Transform(){
    
    this.position = new Vector2();
    this.rotate = 0;
    this.scale = new Vector2();
    this.acceleration = new Vector2();
    this.velocity = new Vector2(); 
    
}

Transform.prototype = {
    
    construct: Transform,
    
    isTransform: true,
    
    getPosition(){
        return this.position;
    },
    
    getRotate(){
        return this.rotate;
    },
    
    getScale(){
        return this.scale;
    },
    
    getAcceleration(){
        return this.acceleration;
    },
    
    getVelocity(){
        return this.velocity;
    },
    
    setPosition( pos ){
        this.position = pos;
    },
    
    setRotate( ro ){
        this.rotate = ro;
    },
    
    setScale( s ){
        this.scale = s;
    },
    
    setAcceleration( ac ){
        this.acceleration = ac;
    },
    
    setVelocity( ve ){
        this.velocity = ve;
    },    
    
    Translate: function( vec ){
        
        //console.log("Da classe Tranform"); 
        this.acceleration.addVectors( vec );
        this.velocity.addVectors( this.acceleration );
        this.position.addVectors( this.velocity );
    },    
    
    Rotate: function( angle, context){
                
        context.translate( ( this.position.x + (0.5 * 64) ), ( this.position.y + (0.5 * 128) ) );        
        context.rotate(angle); 
        context.translate( -( this.position.x + (0.5 * 64) ), -( this.position.y + (0.5 * 128) ));      
        
    },
    
    Scale: function(s, context){
        context.scale(s.x, s.y);
    }
    
}