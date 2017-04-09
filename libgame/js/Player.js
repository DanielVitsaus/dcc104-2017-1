"use strict";


function Player(sXY = new Vector2() , sWH = new Vector2(), dXY = new Vector2(), dWH = new Vector2(), mass = 1) {
    GameObject.call(this);

    this.nameState = "idle";
    this.massa = mass;
    //this.setPosition(dXY);
    
    this.animate = new Animation();
    this.animate.addState("walk", new State("walk", sXY, sWH, this.getPosition(), dWH, 2, 16, new Vector2(128,256)));
    this.animate.addState("idle", new State("idle", sXY, sWH, this.getPosition(), dWH, 2.5, 30, new Vector2(128,256)));
    
    this.animator = new Animator(this.animate);
    

} herda(Player, GameObject);

Player.prototype.limitMove = function( map = undefined ){

    var minY = (sizeScreem.height/2 - 128);
    var minX = -sizeScreem.width/2 + 64;
    var maxX = sizeScreem.width/2 - 32;

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

Player.prototype.Translate = function ( dt = new Vector2(10 * DT, G * DT) ){

    this.velocity.addVectors( this.acceleration.multiplyVectors(dt) );
    this.position.addVectors( this.velocity.multiplyVectors(dt) );
}
