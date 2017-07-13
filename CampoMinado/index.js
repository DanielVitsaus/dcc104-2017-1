

function start(){
    
    var lastTime = 0;
    var deltaTime = 0;
    var time = 0;
    
    var canvas = document.getElementById("game");
    var context = canvas.getContext("2d");
    
    const WIDTH = canvas.offsetWidth;
	const HEIGHT = canvas.offsetHeight;
    
    var mapa = new Map(10,10);
    
    
    window.requestAnimationFrame( Update , canvas );
    
    function Update (t){
        time = t;
        var now = t;
        deltaTime = (now - lastTime) / 1000;         
        
        window.requestAnimationFrame( Update , canvas);            
        render(deltaTime);
        
        lastTime = now;
    }

    function render(deltaTime){
        
        //console.log(Math.floor(Math.random() * 4));
        
        context.save()
            context.translate(5,50);
                mapa.desenhar(context);
        context.restore();
    }
    
}