function Map(rows, collumns) {
    
  this.SIZE = 60;
  this.enemies = [];
  this.posPlayer = {x: 0 , y: 0, idX: 0, idY: 0};
  this.chegada = {x: 0 , y: 0};
  this.img = new Image();  
  this.img.src = "img/p.jpg";
  this.imgChegada = new Image();
  this.imgChegada.src = "img/chegada.png";
  this.imgFrut = new Image();
  this.imgFrut.src = "img/frut2.png";
  this.imgBomb = new Image();
  this.imgBomb.src = "img/bomb.png";
    
  this.alfaPlaca = 1.0;

  this.indexPosPl = Math.floor(Math.random() * 4) ;
  this.cells = [];
  this.cellsIt = this.posicionaItens(this.indexPosPl);
    
    console.log(this.indexPosPl);
    console.log(this.cellsIt);
  for (var r = 0; r < rows; r++) {
      
    this.cells[r] = [];
      
    for (var c = 0; c < collumns; c++) {        
        
      if(this.indexPosPl == 0 && c == 0 && r == 0 ){
          this.indexPosPl = -1;
          this.cells[r][c] = -1;
          this.cellsIt[r][c] = -1;
          this.chegada.x = 9;
          this.chegada.y = 9;          
      }
      else if(this.indexPosPl == 1 && c == 0 && r == 9){
          this.indexPosPl = -1;
          this.cells[r][c] = -1;
          this.cellsIt[r][c] = -1;
          this.chegada.x = 9;
          this.chegada.y = 0;
          
      }
      else if(this.indexPosPl == 2 && c == 9 && r == 0){
          this.indexPosPl = -1;
          this.cells[r][c] = -1;
          this.cellsIt[r][c] = -1;
          this.chegada.x = 0;
          this.chegada.y = 9;
          
      }
      else if(this.indexPosPl == 3 && c == 9 && r == 9){
          this.indexPosPl = -1;
          this.cells[r][c] = -1;
          this.cellsIt[r][c] = -1;
          this.chegada.x = 0;
          this.chegada.y = 0;
          
      }
      else{          
         this.cells[r][c] = 0;
      }    
        
    }
  }    
  this.cellsIt[this.chegada.y][this.chegada.x] = 3;   
  this.cells[this.chegada.y][this.chegada.x] = 3;   
  console.log(this.cellsIt);
  
}

Map.prototype.desenhar = function (ctx) {
    
  for (var r = 0; r < this.cells.length; r++) {      
    for (var c = 0; c < this.cells[0].length; c++) {
      
       if(this.cells[r][c] == -1){     
        ctx.fillStyle = "#0000E5" ;
		ctx.strokeStyle = "#000";
		ctx.beginPath();
            ctx.arc((c * this.SIZE) + this.SIZE/2, 
                    (r * this.SIZE) + this.SIZE/2, 
                    15, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.stroke();        
		ctx.fill();
        this.posPlayer.x = (c * this.SIZE) + this.SIZE/2;
        this.posPlayer.y = (r * this.SIZE) + this.SIZE/2;
        this.posPlayer.idX = c;
        this.posPlayer.idY = r;
      }
        
      if (this.cellsIt[r][c] == 1){
          ctx.drawImage(this.imgFrut, (c * this.SIZE) + 30/2, (r * this.SIZE) + 30/2, 35,35);
      }
        
      if (this.cellsIt[r][c] == 2){
          ctx.drawImage(this.imgBomb, (c * this.SIZE) + 30/2, (r * this.SIZE) + 30/2, 35,35);
      }       
      
    
      if(this.cells[r][c] == 10){          
        ctx.save()  
            ctx.globalAlpha = this.alfaPlaca;
            ctx.drawImage(this.img, c*this.SIZE + 1, r*this.SIZE + 1, this.SIZE - 3,this.SIZE - 3);
        ctx.restore();
      } 
    
      if(this.cells[r][c] == 0){         
        ctx.drawImage(this.img, c*this.SIZE + 1, r*this.SIZE + 1, this.SIZE - 3,this.SIZE - 3);
      } 
        
      if(this.cells[r][c] == 3){        
        ctx.drawImage(this.imgChegada, c*this.SIZE + 1, r*this.SIZE + 1, this.SIZE - 3,this.SIZE - 3);
      }     
       
      
      ctx.strokeStyle = 'green';
      ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
    }
  }   

};


Map.prototype.mover = function (dt) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].mover(this,dt);
  }
};
Map.prototype.perseguir = function (alvo) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].perseguir(alvo);
  }
};

Map.prototype.posicionaItens = function(posPlayer){
    var mapItem_1;    
    
    switch(posPlayer){
            
        case 0:
            mapItem_1 = [[0,1,0,2,0,2,0,0,1,0],
                                [0,2,0,1,2,0,1,0,1,0],
                                [0,1,2,0,2,0,0,2,0,0],
                                [2,0,2,0,1,2,2,1,0,1],
                                [0,0,2,0,0,1,0,0,0,0],
                                [0,2,0,0,2,1,2,0,0,0],
                                [0,1,1,0,0,1,0,0,0,0],
                                [2,0,2,0,0,2,0,0,0,1],
                                [0,2,0,2,0,0,1,0,1,2],
                                [0,0,0,2,0,0,0,0,1,0]];
            break;
            
        case 1:
            mapItem_1 = [[0,2,0,2,0,2,0,1,2,0],
                                [0,1,0,1,2,0,0,2,1,1],
                                [2,2,2,0,2,0,0,2,0,2],
                                [2,0,1,0,1,2,2,1,1,1],
                                [0,0,2,0,0,1,0,0,0,0],
                                [0,2,0,0,2,1,2,0,0,0],
                                [0,1,2,0,0,1,0,0,0,0],
                                [2,0,1,0,0,2,0,0,0,1],
                                [2,1,2,2,0,0,1,0,1,2],
                                [0,1,1,2,0,0,0,0,1,0]];
            break;
            
        case 2:
            mapItem_1 = [[0,2,0,2,0,2,0,1,0,0],
                                [0,2,0,1,2,0,2,0,1,0],
                                [0,1,2,0,2,0,0,0,0,0],
                                [2,0,2,0,1,2,2,1,0,1],
                                [0,0,2,0,0,1,0,0,0,0],
                                [0,2,0,0,2,1,2,0,2,0],
                                [0,1,2,0,1,2,0,0,0,0],
                                [1,0,1,0,0,2,0,0,0,1],
                                [2,1,0,2,0,0,1,0,1,2],
                                [0,1,2,2,0,0,0,0,1,0]];
            break;
            
        case 3:
            mapItem_1 = [[0,1,0,2,0,2,0,0,0,0],
                                [0,2,0,1,2,0,0,0,1,0],
                                [0,1,2,0,2,0,1,0,0,0],
                                [2,0,2,0,1,2,2,1,0,1],
                                [0,0,2,0,0,1,0,0,0,0],
                                [0,2,0,0,2,1,2,0,1,0],
                                [0,1,1,0,2,1,0,2,0,0],
                                [2,0,2,0,0,2,0,0,0,1],
                                [0,2,0,2,1,2,1,0,2,1],
                                [0,0,0,2,0,0,1,0,1,0]];
            break;            
       
        default:
            mapItem_1 = [[0,1,0,2,0,2,0,1,0,0],
                                [0,2,0,1,2,0,1,0,1,2],
                                [0,1,2,0,2,0,0,1,0,2],
                                [2,0,2,0,1,2,2,1,0,1],
                                [0,0,2,0,0,1,0,0,0,0],
                                [0,2,0,0,2,1,2,0,1,0],
                                [0,1,1,0,0,1,0,2,0,0],
                                [2,0,1,0,0,2,0,0,0,1],
                                [1,2,0,2,0,0,1,0,1,2],
                                [0,0,0,2,0,0,0,0,1,0]];
            break;
                    
    }
    
    return mapItem_1;
    
};