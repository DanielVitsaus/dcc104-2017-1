function Map(rows, collumns) {
    
  this.SIZE = 60;
  this.enemies = [];
  this.img = new Image();
  this.img.src = "img/p.jpg";

  this.indexPosPl = Math.floor(Math.random() * 4) ;
  this.cells = [];
  this.cellsIt = [];
    
  for (var r = 0; r < rows; r++) {
      
    this.cells[r] = [];
    this.cellsIt[r] = [];
      
    for (var c = 0; c < collumns; c++) {
        
      if(this.indexPosPl == 0 && c == 0 && r == 0 ){
          this.indexPosPl = -1;
          this.cells[r][c] = -1;
          this.cellsIt[r][c] = -1;
          
      }
      else if(this.indexPosPl == 1 && c == 0 && r == 9){
          this.indexPosPl = -1;
          this.cells[r][c] = -1;
          this.cellsIt[r][c] = -1;
          
      }
      else if(this.indexPosPl == 2 && c == 9 && r == 0){
          this.indexPosPl = -1;
          this.cells[r][c] = -1;
          this.cellsIt[r][c] = -1;
          
      }
      else if(this.indexPosPl == 3 && c == 9 && r == 9){
          this.indexPosPl = -1;
          this.cells[r][c] = -1;
          this.cellsIt[r][c] = -1;
          
      }
      else{    
        this.cells[r][c] = 0;
        this.cellsIt[r][c] = 0;
      }
    }
  }
    
    
}

Map.prototype.desenhar = function (ctx) {
    
  for (var r = 0; r < this.cells.length; r++) {      
    for (var c = 0; c < this.cells[0].length; c++) {
      if(this.cells[r][c] == 0){        
        ctx.drawImage(this.img, c*this.SIZE + 1, r*this.SIZE + 1, this.SIZE - 3,this.SIZE - 3);
      }
        ctx.strokeStyle = 'green';
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
    }
  }

};

Map.prototype.setCells = function (newCells) {
  for (var i = 0; i < newCells.length; i++) {
    for (var j = 0; j < newCells[i].length; j++) {
      switch (newCells[i][j]) {
        case 1:
          this.cells[i][j] = 1;
          break;
        case 2:
          this.cells[i][j] = 0;
          newEnemy = new Sprite();
          newEnemy.images = this.images;
          newEnemy.y = (i+0.5)*this.SIZE;
          newEnemy.x = (j+0.5)*this.SIZE;
          this.enemies.push(newEnemy);
          break;
        default:
          this.cells[i][j] = 0;
      }
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