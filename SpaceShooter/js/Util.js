"use strict";


const DGRID = 16;	
const EPS  = 0.05;	
const FPS = 60;		
const DT = 10.0/FPS;	
const G = -10;	

function ImageBase() {
	var data = {};

    this.add = function(key, url) {
		data[key] = new Image();
		data[key].src = url;
	}

    this.get = function(key) {
		return data[key];
	}

    this.print = function() {
		for(key in data) console.log(key + " --> " + data[key].src);
	}
}

var bdSheets = new ImageBase();

function Point(x, y) {
	this.x = x;
	this.y = y;
}

function Size(w, h) {
	this.w = w;
	this.h = h;
}