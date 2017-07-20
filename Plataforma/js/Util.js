"use strict";

//! Constantes
const DGRID = 16;	//< delta grid
const EPS  = 0.05;	//< floating error
const FPS = 60;		//< frames per second
const DT = 1.0/FPS;	//< seconds per frame
const G = -500;		//< gravity
// inicializadas e congeladas no início do programa
var sizeScreem = SizeScreem();
//////////////////////////////////////////


var herda = function(derivada, base) {
	derivada.prototype = Object.create(base.prototype);
	derivada.prototype.constructor = derivada;
}


function SizeScreem(){       
        
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth  || e.clientWidth  || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;

    //var size = new Vector2(x - (x * 0.02), y - (y * 0.025) );
    var size = new Vector2(1280, 720 );

    return size;

}