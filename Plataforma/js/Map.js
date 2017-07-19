function Map(rows, collumns) {
    
  this.SIZE = 100;
  this.enemies = [];
    
  this.cells = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];  
}

Map.prototype.desenhar = function (ctx) {
    
  for (var r = 0; r < this.cells.length; r++) {      
    for (var c = 0; c < this.cells[0].length; c++) {
        
        if (this.cells[r][c] == 1){
           //ctx.drawImage(sheets.get("chao"). r * this.SIZE, c * this.SIZE, sizeScreem.width, sizeScreem.height);
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

