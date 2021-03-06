// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM

function Ship(pos) {
  
  if (pos) {
    this.pos = pos.copy();
  } else {
  this.pos = createVector(width / 2, height / 2);
  }
  this.r = 20;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0, 0);
  this.isBoosting = false;

  this.boosting = function(b) {
    this.isBoosting = b;
  }

  this.update = function() {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.993);
  }

  this.boost = function() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    noFill();
    this.rand_flam = random(-5,5);
    stroke(255, 0, 0);
    triangle(-this.r/2, this.r, this.r/2, this.r, 0, this.r * 2 + this.rand_flam);
    stroke(255, 133, 0);
    triangle(-this.r/3, this.r, this.r/3, this.r, 0, this.r * 1.666666 + this.rand_flam);
    stroke(255, 255, 0);
    triangle(-this.r/5, this.r, this.r/5, this.r, 0, this.r * 1.3 + this.rand_flam);
    pop();
  }

  this.hits = function(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r / 2 + asteroid.r / 2) {
      return true;
    } else {
      return false;
    }
  }
  
    this.hits_ovni = function(ovni) {
    var d = dist(this.pos.x, this.pos.y, ovni.pos.x, ovni.pos.y);
    if (d < this.r / 2 + ovni.size / 2) {
      return true;
    } else {
      return false;
    }
  }
  
  this.closeenough = function(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r / 2 + asteroid.r / 2 + 10) {
      return true;
    } else {
      return false;
    }
  }

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    noFill();
    stroke(30);
    ellipse(0, 0, this.r);
    stroke(255);
    
    beginShape();
        var x = 0; var y = -this.r; vertex(x, y);
        var x = this.r / 2; var y = -this.r / 2; vertex(x, y);
        var x = this.r / 2; var y = -this.r / 5; vertex(x, y);
        var x = this.r; var y = this.r / 2; vertex(x, y);
        var x = this.r / 2; var y = this.r / 2; vertex(x, y);
        var x = this.r / 2; var y = this.r; vertex(x, y);
        var x = -this.r / 2; var y = this.r; vertex(x, y);
        var x = -this.r / 2; var y = this.r / 2; vertex(x, y);  
        var x = -this.r; var y = this.r / 2; vertex(x, y); 
        var x = -this.r / 2; var y = -this.r / 5; vertex(x, y);
        var x = -this.r / 2; var y = -this.r / 2; vertex(x, y);     
    endShape(CLOSE);
    
    var x1 = this.r / 2; var y1 = -this.r / 5;
    var x2 = this.r / 2; var y2 = this.r / 2;
    line(x1, y1, x2, y2);
    var x1 = -this.r / 2; var y1 = this.r / 2;
    var x2 = -this.r / 2; var y2 = -this.r / 5;
    line(x1, y1, x2, y2);
    //triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
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

  this.setRotation = function(a) {
    this.rotation = a;
  }

  this.turn = function() {
    this.heading += this.rotation;
  }

}
