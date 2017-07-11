function Text(font, size, rgb) {
	this.font = font 	|| "Verdana";
	this.size = size 	|| 24;
	this.color = rgb 	|| "#FFF";
	
	this.raster = function(ctx, text, x, y) {
		ctx.font = "" + this.size + "px " + this.font;
		ctx.fillStyle = this.color;
		ctx.fillText(text, x, y);
	}
}

function start() {
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext("2d");
	var text = new Text();
	
	const WIDTH = canvas.offsetWidth;
	const HEIGHT = canvas.offsetHeight;
	const street = { pos: {x: 0, y: HEIGHT-20}, 
				     size: {w: WIDTH, h: 20} };
	
	const FPS = 60;
	const DT = 1/FPS;
	const G = -20;
	
	var shots = []; var shoot = false;
	var shooter = new Shooter({x: WIDTH/2, y: street.pos.y+7.5}, {w: 84, h: 140}, "img/cannon");
	var ball = new Shot(shooter.ballPos.x, shooter.ballPos.y, 0, -325, 12, "img/ball.png");
	
	var lvl = 0; var pontos = 0;
	var gen = new CollectionGenerator(WIDTH, HEIGHT);
	var builds = [];
	var asteroids = []; 
	
	function reset() {
		lvl = 1; pontos = 0;
		builds = gen.build(9);
		builds.splice(4, 1);
		asteroids = gen.asteroid(lvl);
		shooter.reset();
	}; reset();
	
	var loop = function() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		
		if(builds.length == 0) {			
			reset();
		}
		
		for(var i = 0; i < asteroids.length; i++) {
			var ast = asteroids[i]; ast.move(DT, G);
			
			if(ast.center.y > HEIGHT + ast.radius || ast.center.x < -ast.radius || ast.center.x > WIDTH + ast.radius)
				asteroids.splice(i, 1);
		}
		for(var i = 0; i < shots.length; i++) {
			shots[i].move(DT, G);
			
			if(shots[i].pos.y < 0 || shots[i].pos.x < 0 || shots[i].pos.x > WIDTH)
				shots.splice(i, 1);
		}
		shooter.move(DT, G);
		
		for(var i = 0; i < asteroids.length; i++) {
			for(var j = 0; j < shots.length; j++) {
				var status = asteroids[i].reached(shots[j]);
				if(status != 0) { 
					shots.splice(j, 1);
					if(status == 2) {
						asteroids.splice(i, 1);
						pontos++;
						if(pontos % 8 == 0) { lvl++; }
						break;
					}
				}
			}
		}
		for(var i = 0; i < builds.length; i++) {
			for(var j = 0; j < asteroids.length; j++) {
				var status = builds[i].collided(asteroids[j]);
				if(status != 0) {
					asteroids.splice(j, 1);
					if(status == 2) { 
						builds.splice(i, 1);
						break;
					}
				}
			}
		}
		for(var i = 0; i < asteroids.length; i++) {
			var status = shooter.collided(asteroids[i]);
			if(status != 0) { 
				asteroids.splice(i, 1);
				if(status == 2) {
					reset();
					break;
				}
			}
		}
        
		builds.forEach( function(build) { build.draw(ctx); } );
		asteroids.forEach( function(ast) { ast.draw(ctx, true); } );
		shots.forEach( function(shot) { shot.draw(ctx); } );
	        
		shooter.draw(ctx);
		text.raster(ctx, "Pontos: " + pontos, WIDTH - 155, 25);
		
		if(asteroids.length < lvl)
			asteroids = asteroids.concat(gen.asteroid(lvl));
	}

	setInterval(loop, 1000/FPS);
	
	addEventListener("keydown", function(e){
		if(e.keyCode == 32 && !shoot) { // Space
			ball.pos = {x: shooter.ballPos.x, y: shooter.ballPos.y};
			ball.setVelocityVector(shooter.center);
			shots.push(ball);
			ball = null;
			shoot = true;
		}
		else if(e.keyCode == 81 || e.keyCode == 37) 
			shooter.omega = -2;
		else if(e.keyCode == 69 || e.keyCode == 39) 
			shooter.omega = 2;
	});

	addEventListener("keyup", function(e){
		if(e.keyCode == 32) { // Space
			ball = new Shot(shooter.ballPos.x, shooter.ballPos.y, 0, -325, 12, "img/ball.png");
			shoot = false;
		}
		else if(e.keyCode == 81 || e.keyCode == 37) 
			shooter.omega = 0;
		else if(e.keyCode == 69 || e.keyCode == 39) 
			shooter.omega = 0;
	});
}