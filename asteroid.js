function Asteroid(x, y, size, fill, stroke, hitCount) {
  this.x = x || Math.random() * (MAIN.width - 0) + 0;
  this.y = y || Math.random() * (MAIN.height - 0) + 0;
  this.size = size;
  this.fill = fill || BACKGROUND;
  this.stroke = stroke;
  this.speed = 2;
  this.speedRotate = 1;
  this.speedX = Math.random() * (this.speed - -this.speed) + -this.speed;
  this.speedY = Math.random() * (this.speed - -this.speed) + -this.speed;
  this.rotate = 0;
  this.isColliding = false;
  this.isCollidable = true;
  this.hitCount = hitCount || 0;
  
  this.reset = function() {
    
  }
  
  this.isHit = function(asteroids) {
      this.size *= 0.5;
      this.hitCount++;
      console.log('Asteroid has been shot!');
      
      asteroids.push(new Asteroid(this.x, this.y, this.size, this.fill, this.stroke, this.hitCount));
  }
  
  this.update = function() {
    if(this.rotate > 360 || this.rotate < -360) { this.rotate = 0; }
    this.rotate += this.speedRotate;
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
  
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x + (this.size/2), this.y + (this.size/2));
    ctx.rotate(this.rotate*Math.PI/180);
    ctx.translate((this.x + (this.size/2))*-1, (this.y + (this.size/2))*-1);
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y);
    ctx.lineTo(this.x + this.size / 3, this.y - this.size / 4);
    ctx.lineTo(this.x + this.size, this.y);
    ctx.lineTo(this.x + this.size - this.size / 8, this.y + this.size / 4);
    ctx.lineTo(this.x + this.size + this.size / 8, this.y + this.size - this.size / 4);
    ctx.lineTo(this.x + this.size, this.y + this.size);
    ctx.lineTo(this.x + this.size / 3, this.y + this.size + this.size / 4);
    ctx.lineTo(this.x, this.y + this.size);
    ctx.lineTo(this.x + this.size / 8, this.y + this.size - this.size / 4);
    ctx.lineTo(this.x - this.size / 4, this.y + this.size / 4);
    ctx.lineTo(this.x, this.y);
    if(this.fill) {
      ctx.fillStyle = this.fill;
      ctx.fill();
    }
    if(this.stroke) {
      ctx.strokeStyle = this.stroke;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.closePath();
    ctx.restore();
  };
}