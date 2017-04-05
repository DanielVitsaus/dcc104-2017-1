"use strict";

// Tirando a variavel img, as outro são do tipo Vectro2
function Sprite (img, sXY, sW_H, dXY, dW_H, time) {
    
    this.img            = new Image();
    this.img.src        = img   || "img/nada.png";
    this.sXY            = sXY   || new Vector2(50,50);
    this.sW_H           = sW_H  || new Vector2(50,50);
    this.dXY            = dXY   || new Vector2(50,50);
    this.dW_H           = dW_H  || new Vector2(50,50);     
    this.quantFraeme    = 16 ;// * 2;
    this.dimeFrameX     = 128;
    this.dimeFrameY     = 256;
    this.v1             = 1;
    this.delay          = 0;
    this.time           = time  ||  0;
    
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
    
    Draw: function(){}
    
};