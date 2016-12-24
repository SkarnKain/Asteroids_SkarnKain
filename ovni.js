// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM

function Ovni(pos) {
  
  if (pos) {
    this.pos = pos.copy();
  } else {
  var x_ovni = random([0, width]);
  var y_ovni = random(height);
  this.pos = createVector(x_ovni, y_ovni);
  this.size = 10;
  if (x_ovni == 0){
      this.vel = createVector(3, 0);
    } else {
      this.vel = createVector(-3, 0);
    }
  }

  this.update = function() {
    this.pos.add(this.vel);
  }

//  this.hits = function(asteroid) {
//    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
//    if (d < this.r / 2 + asteroid.r / 2) {
//      return true;
//    } else {
//      return false;
//    }
//  }
//  

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(255);
    ellipse(0, 0, this.size * 3, this.size);
    ellipse(0, - this.size / 2, this.size, this.size / 2);
    pop();
  }

  this.edges = function() {
    if (this.pos.x > width + this.size) {
      this.pos.x = -this.size;
    } else if (this.pos.x < -this.size) {
      this.pos.x = width + this.size;
    }
    if (this.pos.y > height + this.size) {
      this.pos.y = -this.size;
    } else if (this.pos.y < -this.size) {
      this.pos.y = height + this.size;
    }
  }
}
