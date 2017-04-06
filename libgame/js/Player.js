"use strict";


function Player(img = "img/nada.png", sXY = new Vector2() , sWH = new Vector2(), dXY = new Vector2(), dWH = new Vector2(), mass = 1) {
    GameObject.call(this);

    this.massa = mass;

    this.transform =  new Transform();

    this.transform.setPosition(dXY);

    this.sprite = new Sprite( img, sXY , sWH, this.transform.getPosition() , dWH, 1.8 );

    this.sprite.Draw = function( context ){

        if (this.delay >= this.sXY.x){
            this.indexFrame++;
            this.sXY.x = this.sizeFrame.x * this.indexFrame;
        }
        else{
            this.delay += ( this.sizeFrame.x * DT * (this.lengthFrame / (DT * this.lengthFrame * ( (this.time <= 0) ? 0.01 : this.time ) ) ) );
        }

        if (this.sXY.x >= ( this.sizeFrame.x * this.lengthFrame ) ){
            this.sXY.x = this.sizeFrame.x;
            this.delay = 0;
            //console.log(this.v1);
            this.indexFrame = 1;
        }

        context.drawImage(this.img, this.sXY.x, this.sXY.y, this.sW_H.width, this.sW_H.height, this.dXY.x, this.dXY.y,this.dW_H.width, this.dW_H.height);

    }

    this.transform.Translate = function ( context, dt = new Vector2(10 * DT, G * DT) ){

        this.velocity.addVectors( this.acceleration.multiplyVectors(dt) );
        this.position.addVectors( this.velocity.multiplyVectors(dt) );
    }

} herda(Player, GameObject);

Player.prototype.limitMove = function(){

    var minY = (sizeScreem.height - 128);
    var minX = 0;
    var maxX = sizeScreem.width - 64;

    if (this.transform.position.x < minX){
        this.transform.position.x = minX;
    }
    if (this.transform.position.x > maxX){
        this.transform.position.x = maxX;
    }
    if (this.transform.position.y > minY){
        this.transform.position.y = minY;
    }
}
