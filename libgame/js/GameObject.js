"use strict";


function GameObject( ){  
    
    this.components = {} ; 
    this.addComponents("transforn", new Transform());    
    
    
    this.fatx = 1.0;				
	this.faty = 0.0;
    
    //! atualiza posição e orientação do personagem
	this.move = function(context) { // dt = new Vector2(10 * DT, G * DT) ){ //, g, map) {
		
        this.update( context );       
        
        this.components["transforn"].acceleration.x -= this.fatx * this.components["transforn"].velocity.x;
		this.components["transforn"].acceleration.y -= this.faty * this.components["transforn"].velocity.y;
        
        this.components["transforn"].velocity.x += this.components["transforn"].acceleration.x * DT;
		this.components["transforn"].velocity.y += (this.components["transforn"].acceleration.y + G) * DT;
        
        if(Math.abs(this.components["transforn"].velocity.x) < EPS) this.components["transforn"].velocity.x = 0.0;
		if(Math.abs(this.components["transforn"].velocity.y) < EPS) this.components["transforn"].velocity.y = 0.0;
        
        //this.position.addVectors( this.velocity.multiplyVectors(dt) );
        
        this.components["transforn"].position.x += this.components["transforn"].velocity.x * DT;
        this.components["transforn"].position.y -= this.components["transforn"].velocity.y * DT;
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
    
} 

Object.assign(GameObject.prototype ,{ 
    
    draw: function(ctx) {  },

    limitMove: function( map = undefined ) {  },
    
    update: function( context )  {  }

},Collision.prototype, new Collision());

GameObject.prototype.addComponents = function(key, object){
        
    this.components[key] = object;
    /*
    var nomePro = Object.keys(object.prototype);
    for(var prop in nomePro){
        //this.prototype[prop] = object.prop];
        //console.log(nomePro[prop]);
    }
    Object.assign(GameObject.prototype, object , key.prototype) ;
    */
};

GameObject.prototype.removeComponents = function(key){
    
    delete this.components[key];    
};

GameObject.prototype.getComponents = function(key){
    return this.components[key];
};
