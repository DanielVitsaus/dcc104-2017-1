function Map(rows, collumns) {
    
    this.SIZE_W = 64;//Math.trunc(collumns) + 1;
    this.SIZE_H = 36;//Math.trunc(rows) + 1;
    this.quat_R = 20;//Math.trunc (sizeScreem.height/ rows) +1;
    this.quat_C = 20;//Math.trunc (sizeScreem.width/ collumns) + 1;
    this.enemies = [];
    
    this.cells = [ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] ];  
    
    
    
    console.log(this.SIZE_W);
    console.log(this.SIZE_H);
}

Map.prototype.desenhar = function (ctx) {
    
    for (var r = 0; r < this.cells.length; r++) {      
        for (var c = 0; c < this.cells[0].length; c++) {
        
            if (this.cells[r][c] == 1){
                ctx.drawImage(sheets.get("chao"), c * this.SIZE_W, r * this.SIZE_H, this.SIZE_W, this.SIZE_W);
                //console.log(r * this.SIZE_H);
            }
      
            ctx.strokeStyle = 'green';
            //this.cells[r][c].x = c*this.SIZE_W;
            //this.cells[r][c].y = r*this.SIZE_H;
            ctx.strokeRect(c*this.SIZE_W, r*this.SIZE_H, this.SIZE_W, this.SIZE_H);
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

/*

function Map(rows, collumns) {
    
  this.SIZE_W = collumns;
  this.SIZE_H = rows;
  this.enemies = [];
    
  this.cells = [];  
    
    for (var r = 0; r < sizeScreem.height/ rows ; r++) {
      
        this.cells[r] = [];
      
        for (var c = 0; c < sizeScreem.width/ collumns; c++) {           
            this.cells[r][c] = 0;
            if (r  == rows - 2){
                this.cells[r][c] = 1;
            }
        }
    }
    
    console.log(this.cells);
}

Map.prototype.desenhar = function (ctx) {
    
  for (var r = 0; r < this.cells.length; r++) {      
    for (var c = 0; c < this.cells[0].length; c++) {
        
        if (this.cells[r][c] == 1){
           //ctx.drawImage(sheets.get("chao"). r * this.SIZE, c * this.SIZE, sizeScreem.width, sizeScreem.height);
        }
      
      ctx.strokeStyle = 'green';
      ctx.strokeRect(c*this.SIZE_W, r*this.SIZE_H, this.SIZE_W, this.SIZE_H);
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


*/