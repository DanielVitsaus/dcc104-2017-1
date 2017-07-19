"use strict";

function Transform(){
    
    this.positionn = new Vector2();
    this.rotate = 0;
    this.scale = new Vector2();
    this.acceleration = new Vector2();
    this.velocity = new Vector2();   
    
}


Transform.prototype = {
    
    construct: Transform,
    
    isTransform: true,       
    
    "position": {
      get: function() { return this.position; },
      set: function(pos) { this.position = pos;},
    },
    
    "rotate": {
      get: function() { return this.rotate; },
      set: function(r) { this.rotate = r; },
    },
    
    "scale": {
      get: function() { return this.scale; },
      set: function(s) { this.scale = s; },
    },   
    
    "acceleration": {
      get: function() { return this.acceleration; },
      set: function(ac) { this.acceleration = ac; },
    },
    
    "velocity": {
      get: function() { return this.velocity; },
      set: function(v) { this.velocity = v; },
    },

    
    Translate: function( vec ){
        
        //console.log("Da classe Tranform"); 
        this.acceleration.addVectors( vec );
        this.velocity.addVectors( this.acceleration );
        this.position.addVectors( this.velocity );
    },    
    
    Rotate: function( angle, context, pivo = new Vector2( this.position.x + (0.5 * 64), this.position.y + (0.5 * 128) ) ){
                
        context.translate( pivo.x, pivo.y );        
        context.rotate(angle); 
        pivo.negate();
        context.translate( pivo.x, pivo.y );      
        
    },
    
    Scale: function(s, context){ context.scale(s.x, s.y); }    
    
}
