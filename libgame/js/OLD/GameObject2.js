"use strict";


function GameObject2( pos = new Vector2(0,0) ){
    Transform.call(this);    
    
    this.fatx = 1.0;				
	this.faty = 0.0;
    
    //! atualiza posição e orientação do personagem
	this.move = function(context) { // dt = new Vector2(10 * DT, G * DT) ){ //, g, map) {
		
        this.update( context );       
        
        this.acceleration.x -= this.fatx * this.velocity.x;
		this.acceleration.y -= this.faty * this.velocity.y;
        
        this.velocity.x += this.acceleration.x * DT;
		this.velocity.y += (this.acceleration.y + G) * DT;
        
        if(Math.abs(this.velocity.x) < EPS) this.velocity.x = 0.0;
		if(Math.abs(this.velocity.y) < EPS) this.velocity.y = 0.0;
        
        //this.position.addVectors( this.velocity.multiplyVectors(dt) );
        
        this.position.x += this.velocity.x * DT;
        this.position.y -= this.velocity.y * DT;
		/*        
        this.update(dt, g);
		
		this.a.x -= this.fatx * this.v.x;
		this.a.y -= this.faty * this.v.y;
		
		this.v.x += this.a.x * dt;
		this.v.y += (this.a.y - g) * dt;
		
		if(Math.abs(this.v.x) < EPS) this.v.x = 0.0;
		if(Math.abs(this.v.y) < EPS) this.v.y = 0.0;
		
		//var gr = map.getPosition(this.r.x, this.r.y + this.sz.h/2 - 1, this.sz.w, this.sz.h);

		//var belowIsEmpty = true; 
        
        /*
        var n = Math.floor((gr.w)/2 - 1); n = (n <= 0) ? 1 : n;
		for(var i = -n, k = 0; i <= n; i++) {
			k = (!map.isEmpty(gr.y + 1, gr.x + i)) ? k + 1 : 0;
			if(k == n) { belowIsEmpty = false; break; }
		}
        
		
		this.r.x += this.v.x * dt;
		if(belowIsEmpty) {
			this.r.y += this.v.y * dt;
		} else {
			var dy = Math.min(this.v.y * dt, (gr.y + 1) * DGRID - (this.r.y + this.sz.h/2));
			if(dy == 0) this.v.y = 0.0;
			this.r.y += dy;
		}

		//this.positionLimit(map);
        */
	}
	
    /*
	//! verifica se há colisão entre os sprites
	this.colidiu = function(sprite) {
		if(	this.left() > sprite.right() || this.right() < sprite.left() || 
			this.foot() < sprite.head()  || this.head() > sprite.foot() )
				return false;
		return true;
	}
	
    
	//! Gets da área de colisão
	this.left  = function() { return this.r.x - this.sz.w/2 + this.bd.w; }
	this.right = function() { return this.r.x + this.sz.w/2 - this.bd.w; }
	this.foot  = function() { return this.r.y + this.sz.h/2; }
	this.head  = function() { return this.r.y - this.sz.h/2 + this.bd.h; }
    */
    
} herda(GameObject2, Transform);

Object.assign(GameObject2.prototype ,{ 
    
    draw: function(ctx) {  },

    update: function(dt, g) {  },

    limitMove: function( map = undefined ) {  },
    
    update: function( context )  {  }

},Collision.prototype, new Collision());
/*
GameObject2.prototype.draw = function(ctx, map) {  }

GameObject2.prototype.update = function(dt, g) {  }

GameObject2.prototype.limitMove = function( map = undefined ) {  }
*/
