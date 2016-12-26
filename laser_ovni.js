// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM


function Laser_ovni(spos, sangle, ssize) {
  this.vel = p5.Vector.fromAngle(sangle);
  this.vel.mult(7);
  this.colors_ovni = floor(random(0, 30));
  var decal_x = ssize * cos(sangle) + this.vel.x;
  var decal_y = ssize * sin(sangle) + this.vel.y;
  this.pos = createVector(spos.x + decal_x, spos.y + decal_y );

  this.update = function() {
    this.pos.add(this.vel);
  }
  
  this.render = function() {
    push();
    colorMode(HSB);
    stroke(this.colors_ovni, 100, 50);
    strokeWeight(2);
    line(this.pos.x - this.vel.x, this.pos.y - this.vel.y, this.pos.x, this.pos.y);
    pop();
  }

  this.hits = function(ship) {
    var d = dist(this.pos.x, this.pos.y, ship.pos.x, ship.pos.y);
    if (d < ship.r) {
      return true;
    } else {
      return false;
    }
  }

  this.offscreen = function() {
    if (this.pos.x > width || this.pos.x < 0) {
      return true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      return true;
    }
    return false;
  }
}
