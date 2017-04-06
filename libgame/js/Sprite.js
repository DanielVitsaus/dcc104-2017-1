"use strict";

// Tirando a variavel img, as outro são do tipo Vectro2
function Sprite (img, sXY, sW_H, dXY, dW_H, time, lengthFrame = 16, sizeFrame = new Vector2(128,256) ) {

    this.img            = img;
    this.sXY            = sXY   || new Vector2(50,50);
    this.sW_H           = sW_H  || new Vector2(50,50);
    this.dXY            = dXY   || new Vector2(50,50);
    this.dW_H           = dW_H  || new Vector2(50,50);
    this.lengthFrame    = lengthFrame;// * 2;
    this.sizeFrame      = sizeFrame;
    this.indexFrame     = 1;
    this.delay          = 0;
    this.time           = time  ||  0;
    this.no_Repeat      = true;
    

    Object.freeze(this.lengthFrame);
    Object.freeze(this.time);
    Object.freeze(this.sizeFrame);
    Object.freeze(this.img);

}

Sprite.prototype = {

    constructor: Sprite,

    isSprite: true,

    setIMG: function( img ){
        this.img.src = img;
    },

    setSXY: function( s ){
        this.sXY.copy(s);
    },

    getSXY: function(){
        return this.sXY ;
    },

    setSW_H: function( wh ){
        this.sW_H = wh;
    },

    getSW_H: function(){
        return this.sW_H;
    },

    setDXY: function( s ){
        this.dXY = s;
    },

    getDXY: function(){
        return this.dXY ;
    },

    setDW_H: function( wh ){
        this.dW_H = wh;
    },

    getDW_H: function(){
        return this.dW_H;
    },
    
    setIndexFrame: function(index){
        this.indexFrame = index;
    },
    
    setDelay: function(d){
        this.delay = d;
    },

    Draw: function(context){}

};
