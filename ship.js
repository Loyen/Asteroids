function Ship(x, y, size, fill, stroke, controls) {
  this.spawn = {X: x, Y: y};
  this.x = x;
  this.y = y;
  this.size = size;
  this.fill = fill || BACKGROUND;
  this.stroke = stroke;
  this.speed = 1.02;
  this.speedMax = 5;
  this.speedRotate = 8;
  this.speedX = 0;
  this.speedY = 0;
  this.rotate = 90;
  this.controls = controls;
  this.isColliding = false;
  this.isCollidable = true;
  this.respawnTimer = 0;
  this.deathCount = 0;
  this.laserCooloff = 0;
  this.laserContainer = [];
  
  this.reset = function() {
    this.x = this.spawn['X'];
    this.y = this.spawn['Y'];
    this.speedX = 0;
    this.speedY = 0;
    this.rotate = 90;
    this.isColliding = false;
    this.isCollidable = true;
  }
  
  this.isHit = function() {
    console.log('Player crashed into asteroid! You will respawn in '+this.respawnTimer/10+'s');
    this.deathCount++;
    this.respawnTimer = 50;
    this.reset();
  }
  
  this.update = function() {
    if(this.rotate > 360 || this.rotate < -360) { this.rotate = 0; }
  
    var xRot = Math.cos((Math.PI / 180) * (this.rotate - 180));
    var yRot = Math.sin((Math.PI / 180) * (this.rotate - 180));
    var friction = 1;
    
    if(this.respawnTimer == 0) {
      if(keysDown[this.controls['UP']]) {
        this.speedX += this.speed * xRot;
        this.speedY += this.speed * yRot;
      } else {
        friction = 0.99;
      }
      if(keysDown[this.controls['DOWN']]) { friction = 0.9; }
      if(keysDown[this.controls['LEFT']]) { this.rotate -= this.speedRotate; }
      if(keysDown[this.controls['RIGHT']]) { this.rotate += this.speedRotate; }
      if(keysDown[this.controls['FIRE']] && this.laserCooloff == 0) {
        this.laserContainer.push(new Laser(this.x + this.size/2, this.y + this.size/2, this.rotate, this.stroke));
        this.laserCooloff = 20;
      }
    }
    
    if(this.laserCooloff > 0) {
      this.laserCooloff--;
    }
    
    if(this.laserContainer) {
      for(i=0;i<=this.laserContainer.length;i++) {
        if(this.laserContainer[i]) {
          this.laserContainer[i].update();
          if(this.laserContainer[i].killTimer == 0) { this.laserContainer.splice([i], 1); }
        }
      }
    }
    
    if(this.speedX <= this.speedMax*-1) { this.speedX = this.speedMax*-1; }
    if(this.speedX >= this.speedMax) { this.speedX = this.speedMax; }
    if(this.speedY <= this.speedMax*-1) { this.speedY = this.speedMax*-1; }
    if(this.speedY >= this.speedMax) { this.speedY = this.speedMax; }
    
    if(this.speedX > -0.1 && this.speedX < 0.1) { this.speedX = 0; }
    if(this.speedY > -0.1 && this.speedY < 0.1) { this.speedY = 0; }
    
    this.speedX *= friction;
    this.speedY *= friction;
    
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
    
    if(this.respawnTimer > 0) {
      this.isCollidable = false;
      this.respawnTimer--;
    } else {
      this.isCollidable = true;
    
      ctx.save();
      ctx.beginPath();
      ctx.translate(this.x + (this.size/3), this.y + this.size/2);
      ctx.rotate(this.rotate*Math.PI/180);
      ctx.translate((this.x + (this.size/3))*-1, (this.y + this.size/2)*-1);
      ctx.moveTo(this.x - (this.size/2), this.y + (this.size/2));
      ctx.lineTo(this.x + this.size, this.y);
      ctx.lineTo(this.x + this.size , this.y + this.size);
      ctx.lineTo(this.x - (this.size/2), this.y + (this.size/2));
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
    }
  };
}