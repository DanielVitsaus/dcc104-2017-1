"use strict";

function SpriteSheetDB() {
	var dataBase = {};
	//! Adiciona nova imagem na base dado uma chave e a url da imagem
	this.add = function(key, url) {
		dataBase[key] = new Image();
		dataBase[key].src = url;
	}
	//! Retorna a imagem chaveada em key
	this.get = function(key) {
		return dataBase[key];
	}
	//! Imprime base
	this.printDataBase = function() {
        var key = 0;
		for(key in dataBase) console.log(key + " --> " + dataBase[key].src);
	}
    
    this.printSpriteSheet = function(key){
        console.log(key + " --> " + dataBase[key].src);
    }
}

var sheetBD = new SpriteSheetDB();

function State(imgKey, sXY, sWH, dXY, dWH, velo, lengthFrame, sizeFrame){
        
    this.img            = sheetBD.get(imgKey);
    this.sXY            = sXY         || new Vector2();
    this.sWH            = sWH         || new Vector2();
    this.dXY            = dXY         || new Vector2();
    this.dWH            = dWH         || new Vector2();
    this.velo           = velo        || 2;
    this.lengthFrame    = lengthFrame || 0;
    this.sizeFrame      = sizeFrame   || new Vector2();   
    
    Object.freeze(this.img);

    this.sprite = new Sprite(this.img, this.sXY , this.sWH, this.dXY , this.dWH, this.velo, this.lengthFrame, this.sizeFrame );
    
}

const REPEAT        = 1;
const NO_REPEAT	    = 2;
const RETURN	    = 3;

function Animation(){    

    this.animations = {};
    this.currentState = undefined;
    
    this.isInitialize = true;

    this.addState = function(key = "idle", state = new State()){
        this.animations[key] = state ;
    }

    this.startState = function(key = "idle"){
        this.currentState = this.animations[key];
        this.currentState.sprite.indexFrame = 1;
        this.currentState.sprite.delay = 0;
        //this.isInitialize = false;
        
        return this.currentState;
    }

    this.changeState = function(key){
        this.currentState = this.animations[key];
        this.currentState.sprite.setIndexFrame(1);
        this.currentState.sprite.setDelay(0);
        this.isInitialize = false;
        
        return this.currentState;
    }    
    
}

function Animator(animation){
    
    this.animation = animation;
    this.currentAnimation = undefined;// this.animation.startState();
    
    
    this.DrawRepeat = function(key){     
        
        if(this.animation.isInitialize)
            this.currentAnimation = this.animation.changeState(key);
        
        
        this.currentAnimation.sprite.Draw = function( context ){        

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
                this.indexFrame = 1;
            }

            context.drawImage(this.img, this.sXY.x, this.sXY.y, this.sW_H.width, this.sW_H.height, this.dXY.x, this.dXY.y,this.dW_H.width, this.dW_H.height);
        }
        
    }
    
    this.DrawNO_Repeat = function(key, context){
        
        if(this.animation.isInitialize)
            this.currentAnimation = this.animation.changeState(key);
        
        this.currentAnimation.sprite.Draw = function( context ){

            if (this.no_Repeat){
                
                if (this.delay >= this.sXY.x){
                    this.indexFrame++;
                    this.sXY.x = this.sizeFrame.x * this.indexFrame;
                }
                else{
                    this.delay += ( this.sizeFrame.x * DT * (this.lengthFrame / (DT * this.lengthFrame * ( (this.time <= 0) ? 0.01 : this.time ) ) ) );
                }            
            }
            
            if (this.sXY.x >= ( this.sizeFrame.x * this.lengthFrame ) ){
                this.sXY.x = this.sizeFrame.x;
                this.delay = 0;
                this.indexFrame = 1;
                this.no_Repeat = false;
            }                

            context.drawImage(this.img, this.sXY.x, this.sXY.y, this.sW_H.width, this.sW_H.height, this.dXY.x, this.dXY.y,this.dW_H.width, this.dW_H.height);

        }
        
    }
    
    this.DrawReturn = function(key, context){
        
        if(this.animation.isInitialize)
            this.currentAnimation = this.animation.changeState(key);
        
        this.currentAnimation.sprite.Draw = function( context ){            

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
                this.indexFrame = 1;
            }

            context.drawImage(this.img, this.sXY.x, this.sXY.y, this.sW_H.width, this.sW_H.height, this.dXY.x, this.dXY.y,this.dW_H.width, this.dW_H.height);
        }
        
    }
    
    
    this.Play = function(key, typeAnimation, context){
        
        switch(typeAnimation){
            
            case REPEAT: this.DrawRepeat(key); 
                         this.currentAnimation.sprite.Draw(context); break;
            
            case NO_REPEAT: this.DrawNO_Repeat(key);    
                            this.currentAnimation.sprite.Draw(context); break;
                
            case CYCLIC: this.DrawReturn(key); 
                         this.currentAnimation.sprite.Draw(context); break;
            
            //case default: return 0 ;
        }
    }
    
}
