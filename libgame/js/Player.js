"use strict";

function Player(sXY = new Vector2() , sWH = new Vector2(), dXY = new Vector2(), dWH = new Vector2()) {
    GameObject.call(this);   
   
    this.addComponents("sprite", new Sprite2(undefined, sXY, sWH, dXY, dWH, DGRID, new Vector2(128,256)));
    
    this.components["transforn"].scale = new Vector2(0.5,0.5); 
    this.components["transforn"].position = dXY;
    this.moveToRight    = false;
	this.moveToLeft     = false;
	this.jump		    = false;
    this.bd = dWH;   
    
    /*
    this.hmax = this.components["transforn"].scale.y * DGRID * (hmax || 20);
	
	Object.freeze(this.hmax);
	
	// Inicializa animações
	var tmax = -Math.sqrt(2 * Math.abs(G) * this.hmax) / G; 
    tmax = 2 * (tmax + tmax / 50.0)
    
    /*
    this.animate = new Animation();
    this.animate.addState("walk", new State("walk", sXY, sWH, dWH, dWH, 2, 16, new Vector2(128,256)));
    this.animate.addState("idle", new State("idle", sXY, sWH, dWH, dWH, 2.5, 30, new Vector2(128,256)));
    
    this.animator = new Animator(this.animate);
    
    
    
    this.animation = new Animator();
    this.animation.createAnimation("idle", "idle", 30, 128, 256, 0 * DGRID,  0 * DGRID, 2.0, CYCLIC);
	this.animation.createAnimation("walk", "walk", 16, 128, 256, 0 * DGRID,  0 * DGRID, 0.8, CYCLIC);
    this.animation.createAnimation("jump", "jump", 26, 128, 256, 0 * DGRID,  0 * DGRID, tmax, NO_REPEAT);
    */
    this.components["sprite"].addAnimation("idle", "idle", 30, 2.0, CYCLIC);
    this.components["sprite"].addAnimation("walk", "walk", 16, 0.8, CYCLIC);
    this.components["sprite"].addAnimation("jump", "jump", 26, 0, NO_REPEAT, 20, this.components["transforn"].scale.y );
    
    this.components["sprite"].animation.addEventTo("jump", function(params) {
		params.self.bd.height = params.h;
	}, {self: this, h: dWH.height} );
            
    this.components["sprite"].animation.executeAnimation("idle");
    

} herda(Player, GameObject);

Player.prototype.limitMove = function( map = undefined ){

    var minY = (sizeScreem.height - 64);
    var minX = 32;
    var maxX = sizeScreem.width - 32;

    if (this.components["transforn"].position.x < minX){
        this.components["transforn"].position.x = minX;
    }
    if (this.components["transforn"].position.x > maxX){
        this.components["transforn"].position.x = maxX;
    }
    if (this.components["transforn"].position.y > minY){
        this.components["transforn"].position.y = minY;
    }
}

Player.prototype.draw = function(context) {
	context.save();
		context.translate(this.components["transforn"].position.x, this.components["transforn"].position.y);
		context.save();
            this.components["transforn"].Scale(this.components["transforn"].scale, context);
            this.components["sprite"].drawSprite(context);            
		context.restore();
	context.restore();	
}


Player.prototype.update = function( context ){
    
    var jumping = (Math.abs(this.components["transforn"].velocity.y) < EPS);
    
	// se não está pulando, mas é para pular então pula
	if(!jumping && this.jump) {
        console.log("Ta aqui");
		this.jump = false;
		// Equação de torriceli: v² = v0² + 2adr
		// dr = hmax --> v = 0
        //console.log("Velocidade -> " + this.components["transforn"].velocity.y);
		this.components["transforn"].velocity.y = Math.sqrt(2 * Math.abs(G) * this.components["sprite"].hmax);
        //console.log("Velocidade -> " + this.components["transforn"].velocity.y);
		this.components["sprite"].animation.resetTo("jump");
		this.components["sprite"].animation.executeAnimation("jump");
		if(Math.abs(this.components["transforn"].velocity.x) > 2.0) {
			this.components["sprite"].animation.linkAnimations("jump", "walk");
		} else {
			this.components["sprite"].animation.linkAnimations("jump", "idle");
		}
		//this.bd.y -= 16;
	}
    
       
    if(this.moveToRight) {	
		this.components["transforn"].acceleration.x = 0.8 * G ;       
        this.components["transforn"].scale.x = -0.5;
        if (!this.components["sprite"].animation.isExecuting("jump"))
            this.components["sprite"].animation.executeAnimation("walk");
        
	} else if(this.moveToLeft) {
		this.components["transforn"].acceleration.x = -0.8 * G  ;      
		this.components["transforn"].scale.x = 0.5;		
        if (!this.components["sprite"].animation.isExecuting("jump"))
            this.components["sprite"].animation.executeAnimation("walk");
	}else {
		this.components["transforn"].velocity.x = 0 ;
		this.components["transforn"].acceleration.x = 0 ;
        if(Math.abs(this.components["transforn"].velocity.x) < 2.0 && !this.components["sprite"].animation.isExecuting("jump"))
            this.components["sprite"].animation.executeAnimation("idle");
	}
}

Player.prototype.Translate = function ( dt = new Vector2(10 * DT, G * DT) ){

    this.components["transforn"].velocity.addVectors( this.components["transforn"].acceleration.multiplyVectors(dt) );
    this.components["transforn"].position.addVectors( this.components["transforn"].velocity.multiplyVectors(dt) );
}
