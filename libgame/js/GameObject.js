"use strict";

function GameObject(){
    
    //this.transform =  new Transform();
    //this.sprite = new Sprite("img/nada.png");
    
}

Object.assign(GameObject.prototype, Transform.prototype, new Transform(), Sprite.prototype, new Sprite());
