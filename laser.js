function Laser(x, y, rotate, stroke) {
  this.x = x;
  this.y = y;
  this.size = 8;
  this.stroke = stroke;
  this.speed = 16;
  this.speedX = 0;
  this.speedY = 0;
  this.rotate = rotate;
  this.isColliding = false;
  this.isCollidable = true;
  this.killTimer = 24;
  
  this.reset = function() {
  }
  
  this.update = function() {
    var xRot = Math.cos((Math.PI / 180) * (this.rotate - 180));
    var yRot = Math.sin((Math.PI / 180) * (this.rotate - 180));
    
    this.speedX = this.speed * xRot;
    this.speedY = this.speed * yRot;
    
    if(this.speedX <= this.speed*-1) { this.speedX = this.speed*-1; }
    if(this.speedX >= this.speed) { this.speedX = this.speed; }
    if(this.speedY <= this.speed*-1) { this.speedY = this.speed*-1; }
    if(this.speedY >= this.speed) { this.speedY = this.speed; }
    
    this.x += this.speedX;
    this.y += this.speedY;
    
    if(this.x > MAIN.width) {
      this.x = 0 - this.size; 
    } else if((this.x + this.size*1.2) < 0) {
      this.x = MAIN.width;
    }
    if(this.y > MAIN.height) {
      this.y = 0 - this.size;
    } else if(this.y + this.size*1.2 < 0) {
      this.y = MAIN.height;
    }
    
    if(this.killTimer > 0) {
      this.killTimer--;
    }
    
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotate*Math.PI/180);
    ctx.translate(this.x*-1, this.y*-1);
    ctx.moveTo(this.x - this.size/2, this.y);
    ctx.lineTo(this.x + this.size/2, this.y);
    if(this.stroke) {
      ctx.strokeStyle = this.stroke;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.closePath();
    ctx.restore();
  };
}