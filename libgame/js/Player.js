"use strict";


function Player(sXY = new Vector2() , sWH = new Vector2(), dXY = new Vector2(), dWH = new Vector2(), mass = 1) {
    GameObject.call(this);

    this.massa = mass;
    this.setPosition(dXY);
    
    this.animate = new Animation();
    this.animate.addState("walk", new State("walk", sXY, sWH, this.getPosition(), dWH, 2, 16, new Vector2(128,256)));
    
    this.animator = new Animator(this.animate);
    

} herda(Player, GameObject);

Player.prototype.limitMove = function(){

    var minY = (sizeScreem.height - 128);
    var minX = 0;
    var maxX = sizeScreem.width - 64;

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

Player.prototype.Translate = function ( context, dt = new Vector2(10 * DT, G * DT) ){

    this.velocity.addVectors( this.acceleration.multiplyVectors(dt) );
    this.position.addVectors( this.velocity.multiplyVectors(dt) );
}
