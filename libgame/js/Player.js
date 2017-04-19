"use strict";



function Player(sXY = new Vector2() , sWH = new Vector2(), dXY = new Vector2(), dWH = new Vector2(), mass = 1, hmax) {
    GameObject.call(this);

    this.scale = new Vector2(0.5,0.5);     
    //this.scale = new Vector2(1,1);   
    this.bd = dWH;
    this.nameState = "idle";
    this.massa = mass;
    this.setPosition(dXY);
    
    this.moveToRight    = false;
	this.moveToLeft     = false;
	this.jump		    = false;
    
    this.hmax = this.scale.y * DGRID * (hmax || 20);
	
	Object.freeze(this.hmax);
	
	// Inicializa animações
	var tmax = -Math.sqrt(2 * Math.abs(G) * this.hmax) / G; 
    tmax = 2 * (tmax + tmax / 50.0)
    
    /*
    this.animate = new Animation();
    this.animate.addState("walk", new State("walk", sXY, sWH, dWH, dWH, 2, 16, new Vector2(128,256)));
    this.animate.addState("idle", new State("idle", sXY, sWH, dWH, dWH, 2.5, 30, new Vector2(128,256)));
    
    this.animator = new Animator(this.animate);
    */
    
    
    this.animation = new Animator();
    this.animation.createAnimation("idle", "idle", 30, 128, 256, 0 * DGRID,  0 * DGRID, 2.0, CYCLIC);
	this.animation.createAnimation("walk", "walk", 16, 128, 256, 0 * DGRID,  0 * DGRID, 0.8, CYCLIC);
    this.animation.createAnimation("jump", "jump", 26, 128, 256, 0 * DGRID,  0 * DGRID, tmax, NO_REPEAT);
    
    this.animation.addEventTo("jump", function(params) {
		params.self.bd.height = params.h;
	}, {self: this, h: dWH.height} );
            
    this.animation.executeAnimation("idle");
    

} herda(Player, GameObject);

Player.prototype.limitMove = function( map = undefined ){

    var minY = (sizeScreem.height - 64);
    var minX = 32;
    var maxX = sizeScreem.width - 32;

    if (this.position.x < minX){
        this.position.x = minX;
    }
    if (this.position.x > maxX){
        this.position.x = maxX;
    }
    if (this.position.y > minY){
        this.position.y = minY;
    }
}

Player.prototype.draw = function(context) {
	context.save();
		context.translate(this.position.x, this.position.y);
		context.save();
			this.Scale(this.scale, context);            
			if(this.animation.hasAnimation()) {
				this.animation.drawFrame(context, DT);
			}               
            //this.animator.Play(this.nameState, REPEAT, context ); 
		context.restore();
	context.restore();	
}


Player.prototype.update = function( context ){
    
    var jumping = (Math.abs(this.velocity.y) < EPS);
    
	// se não está pulando, mas é para pular então pula
	if(!jumping && this.jump) {
        console.log("Ta aqui");
		this.jump = false;
		// Equação de torriceli: v² = v0² + 2adr
		// dr = hmax --> v = 0
        console.log("Velocidade -> " + this.velocity.y);
		this.velocity.y = Math.sqrt(2 * Math.abs(G) * this.hmax);
        console.log("Velocidade -> " + this.velocity.y);
		this.animation.resetTo("jump");
		this.animation.executeAnimation("jump");
		if(Math.abs(this.velocity.x) > 2.0) {
			this.animation.linkAnimations("jump", "walk");
		} else {
			this.animation.linkAnimations("jump", "idle");
		}
		//this.bd.y -= 16;
	}
    
       
    if(this.moveToRight) {	
		this.acceleration.x = 0.8 * G ;       
        this.scale.x = -0.5;
        if (!this.animation.isExecuting("jump"))
            this.animation.executeAnimation("walk");
        
	} else if(this.moveToLeft) {
		this.acceleration.x = -0.8 * G  ;      
		this.scale.x = 0.5;		
        if (!this.animation.isExecuting("jump"))
            this.animation.executeAnimation("walk");
	}else {
		this.velocity.x = 0 ;
		this.acceleration.x = 0 ;
        if(Math.abs(this.velocity.x) < 2.0 && !this.animation.isExecuting("jump"))
            this.animation.executeAnimation("idle");
	}
}

Player.prototype.Translate = function ( dt = new Vector2(10 * DT, G * DT) ){

    this.velocity.addVectors( this.acceleration.multiplyVectors(dt) );
    this.position.addVectors( this.velocity.multiplyVectors(dt) );
}
