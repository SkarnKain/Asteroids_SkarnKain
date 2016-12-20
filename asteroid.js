// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM

function Asteroid(pos, r, ast_angle, ast_angle_speed) {
    if (pos) {
    this.pos = pos.copy();
  } else {
    var rand_r = random(height/4, height/1);
    var rand_theta = random(0, TWO_PI);
    var rand_x = rand_r * cos(rand_theta) + width / 2;
    var rand_y = rand_r * sin(rand_theta) + height / 2;
    this.pos = createVector(rand_x, rand_y);
  }
  if (r) {
    this.r = r * 0.5;
  } else {
    this.r = random(level + 10, level * 5 + 10);
    if (this.r > 100){
        this.r = 100;
    }
  }
    
  if (ast_angle) {
    this.ast_angle = ast_angle;
  } else {
    this.ast_angle = random(0, TWO_PI);
  }
    
  if (ast_angle_speed) {
    this.ast_angle_speed = ast_angle_speed;
  } else {
    this.ast_angle_speed = random(-0.05, 0.05);
  }

  this.vel = p5.Vector.random2D();
  this.total = floor(random(5, 15));
  this.offset = [];
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
  }

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.render = function() {
    push();
    noFill();
    strokeWeight(1);
    stroke(30, 10, 0);
    translate(this.pos.x, this.pos.y);
    rotate(this.ast_angle);      
    ellipse(0, 0, this.r);
    strokeWeight(1);
    stroke(160, 140, 120);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  this.breakup = function() {
    var newA = [];
    newA[0] = new Asteroid(this.pos, this.r);
    newA[1] = new Asteroid(this.pos, this.r);
    return newA;
  }

  this.edges = function() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
  
  this.ast_rotate = function() {
    this.ast_angle += this.ast_angle_speed;
    if (this.ast_angle > TWO_PI){
        this.ast_angle = 0;
    }
    if (this.ast_angle < 0){
        this.ast_angle = TWO_PI;
    }
  }
  

}
