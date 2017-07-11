"use strict";

function Sprite2 (img, sXY, sW_H, dXY, dW_H, lengthFrame, sizeFrame) {
    
    this.img            = sheets.get(img)   || undefined;
    this.sXY            = sXY               || new Vector2(50,50);
    this.sW_H           = sW_H              || new Vector2(50,50);
    this.dXY            = dXY               || new Vector2(50,50);
    this.dW_H           = dW_H              || new Vector2(50,50);
    this.lengthFrame    = lengthFrame       || DGRID;
    this.sizeFrame      = sizeFrame         || new Vector2(16,16);  
    this.hmax           = undefined;
    this.animation      = undefined;
    
    if (this.img === undefined ){
        this.animation = new Animator();        
    }
    else{ Object.freeze(this.img); }
    
    Object.freeze(this.lengthFrame);
    Object.freeze(this.sizeFrame);   
    

}

Object.defineProperty(this, "img", {
    get: function() { return this.img; },
    set: function(img) { this.img = img; },
});

Object.defineProperty(this, "sXY", {
    get: function() { return this.sXY; },
    set: function(sXY) { this.sXY = sXY; },
});

Object.defineProperty(this, "sW_H", {
    get: function() { return this.sW_H; },
    set: function(sW_H) { this.sW_H = sW_H; },
});

Object.defineProperty(this, "dXY", {
    get: function() { return this.dXY; },
    set: function(dXY) { this.dXY = dXY; },
});

Object.defineProperty(this, "dW_H", {
    get: function() { return this.dW_H; },
    set: function(dW_H) { this.dW_H = dW_H; },
});

Object.defineProperty(this, "lengthFrame", {
    get: function() { return this.lengthFrame; },
    set: function(lengthFrame) { this.lengthFrame = lengthFrame; },
});

Object.defineProperty(this, "sizeFrame", {
    get: function() { return this.sizeFrame; },
    set: function(sizeFrame) { this.sizeFrame = sizeFrame; },
});

Object.defineProperty(this, "animation", {
    get: function() { return this.animation; },
    set: function(animation) { this.animation = animation; },
});  

Object.defineProperty(this, "hmax", {
    get: function() { return this.hmax; },
    set: function(hmax) { this.hmax = hmax; },
}); 

Sprite2.prototype.drawSprite = function(context){    
       
        if(this.animation !== undefined && this.animation.hasAnimation()) {
            this.animation.drawFrame(context, DT);
        }
        else if (this.img !== undefined){
            context.drawImage(this.img, 
                              this.sXY.x, this.sXY.y, 
                              this.sW_H.width, this.sW_H.height, 
                              -this.dXY.x/2, -this.dXY.y/2, 
                              this.dW_H.width, this.dW_H.height);
        }
        else{
            context.fillStyle = "blue";
            context.fillRect(sizeScreem.width/2, sizeScreem.height/2, 100, 100);
        }
    
}

Sprite2.prototype.addAnimation = function (key, keySheet,numberFrames, _t = 0, _mode, hMax, scaleY = undefined){
    
    var temp, tmax;
    
    this.hmax = (hMax || 20);   
    
    if (this.animation !== undefined){     
        
        if (key === "jump" && scaleY != undefined){
            temp = scaleY * DGRID * this.hmax;
            this.hmax = temp;
            Object.freeze(temp);
            Object.freeze(this.hmax);

            tmax = -Math.sqrt(2 * Math.abs(G) * temp) / G; 
            temp = 2 * (tmax + tmax / 50.0)
        }
        else{ temp = _t; }

        this.animation.createAnimation(key, keySheet, numberFrames, this.sizeFrame.width, this.sizeFrame.height, 0, 0, temp, _mode);
    }
}

