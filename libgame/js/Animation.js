"use strict";

function State(img = "img/nada.png", sXY = new Vector2() , sWH = new Vector2(), dXY = new Vector2(), dWH = new Vector2(),
              velo = 2, lengthFrame = 0, sizeFrame = new Vector2(), typeState = 1){

    this.sprite = new Sprite( img, sXY , sWH, dXY , dWH, velo, lengthFrame, sizeFrame );
    this.typeState = typeState;

    Object.freeze(this.sprite);
    Object.freeze(this.typeState);
}

const NO_REPEAT   = 1;
const CYCLIC	    = 2;
const RETURN	    = 3;

function Animation(){

  this.animations = {};
  this.currentState = 0;

  this.addState = function(key = "nada", state = new State()){
    this.animations[key] = state ;
  }

  this.startState = function(key = "nada"){
    this.currentState = this.animations[key];
    this.currentState.sprite.indexFrame = 1;
    this.currentState.sprite.delay = 0;
  }

  this.nextState = function(key){
    this.currentState = this.animations[key];
    this.currentState.sprite.indexFrame = 1;
    this.currentState.sprite.delay = 0;
  }

  
}
