"use strict";

function Control(){
    
    this.ESC = false;
    this.SPACE = false;
    this.Ctrl = false
    this.Shift = false;    
    
    this.LEFT = false;
    this.RIGHT = false;
    this.UP = false;
    this.DOWN = false;
    
    this.a = false;
    this.b = false;
    this.c = false;
    this.d = false;
    this.e = false;
    this.f = false;
    this.g = false;
    this.h = false;
    this.i = false;
    this.j = false;
    this.k = false;
    this.l = false;
    this.m = false;
    this.n = false;
    this.o = false;
    this.p = false;
    this.q = false;
    this.r = false;
    this.s = false;
    this.t = false;
    this.u = false;
    this.v = false;
    this.w = false;
    this.x = false;
    this.y = false;
    this.z = false;   
    
}

var input = new Control();

addEventListener("keydown" , function(e) {    

    switch(e.keyCode){
        case 27:            
            input.ESC = true;            
        break;
        case 32:
            input.SPACE = true;
        break;
        case 17:
            input.Ctrl = true;
        break;
        case 16:
            input.Shift = true;
        break;
        case 37:
            input.LEFT = true;
        break;
        case 39:
           input.RIGHT = true;
        break;
        case 38:
            input.UP = true;
        break;
        case 40:
            input.DOWN = true;
        break;
        case 65:
            input.a = true;
        break;
        case 66:
            input.b = true;
        break;
        case 67:
            input.c = true;
        break;
        case 68:
            input.d = true;
        break;
        case 69:
            input.e = true;
        break;
        case 70:
            input.f = true;
        break;
        case 71:
            input.g = true;
        break;
        case 72:
            input.h = true;
        break;
        case 73:
            input.i = true;
        break;
        case 74:
            input.j = true;
        break;
        case 75:
            input.k = true;
        break;
        case 76:
            input.l = true;
        break;
        case 77:
            input.m = true;
        break;
        case 78:
            input.n = true;
        break;
        case 79:
            input.o = true;
        break;
        case 80:
            input.p = true;
        break;
        case 81:
            input.q = true;
        break;
        case 82:
            input.r = true;
        break;
        case 83:
            input.s = true;
        break;
        case 84:
            input.t = true;
        break;
        case 85:
            input.u = true;
        break;
        case 86:
            input.v = true;
        break;
        case 87:
            input.w = true;
        break;
        case 88:
            input.x = true;
        break;
        case 89:
            input.y = true;
        break;
        case 90:
            input.z = true;
        break;

        default:
            console.log("erro de tecla");
        break;

    }        

});

addEventListener("keyup" , function(e) {    

    switch(e.keyCode){
        case 27:            
            input.ESC = false;            
        break;
        case 32:
            input.SPACE = false;
        break;
        case 17:
            input.Ctrl = false;
        break;
        case 16:
            input.Shift = false;
        break;
        case 37:
            input.LEFT = false;
        break;
        case 39:
           input.RIGHT = false;
        break;
        case 38:
            input.UP = false;
        break;
        case 40:
            input.DOWN = false;
        break;
        case 65:
            input.a = false;
        break;
        case 66:
            input.b = false;
        break;
        case 67:
            input.c = false;
        break;
        case 68:
            input.d = false;
        break;
        case 69:
            input.e = false;
        break;
        case 70:
            input.f = false;
        break;
        case 71:
            input.g = false;
        break;
        case 72:
            input.h = false;
        break;
        case 73:
            input.i = false;
        break;
        case 74:
            input.j = false;
        break;
        case 75:
            input.k = false;
        break;
        case 76:
            input.l = false;
        break;
        case 77:
            input.m = false;
        break;
        case 78:
            input.n = false;
        break;
        case 79:
            input.o = false;
        break;
        case 80:
            input.p = false;
        break;
        case 81:
            input.q = false;
        break;
        case 82:
            input.r = false;
        break;
        case 83:
            input.s = false;
        break;
        case 84:
            input.t = false;
        break;
        case 85:
            input.u = false;
        break;
        case 86:
            input.v = false;
        break;
        case 87:
            input.w = false;
        break;
        case 88:
            input.x = false;
        break;
        case 89:
            input.y = false;
        break;
        case 90:
            input.z = false;
        break;

        default:
            console.log("erro de tecla");
        break;

    }        

});
    
