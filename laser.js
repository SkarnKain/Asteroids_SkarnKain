// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM


var colors = [
  [248, 12, 18],
  [238, 17, 0],
  [255, 51, 17],
  [255, 68, 34],
  [255, 102, 68],
  [255, 153, 51],
  [254, 174, 45],
  [204, 187, 51],
  [208, 195, 16],
  [170, 204, 34],
  [105, 208, 37],
  [34, 204, 170],
  [18, 189, 185],
  [17, 170, 187],
  [68, 68, 221],
  [51, 17, 187],
  [59, 12, 189],
  [68, 34, 153]
]



function Laser(spos, sangle, ssize) {
  this.vel = p5.Vector.fromAngle(sangle);
  this.vel.mult(10);
  this.color = colors[floor(random(0, colors.length - 1))];
  var decal_x = ssize * cos(sangle) + this.vel.x;
  var decal_y = ssize * sin(sangle) + this.vel.y;
  this.pos = createVector(spos.x + decal_x, spos.y + decal_y );

  this.update = function() {
    this.pos.add(this.vel);
  }
  
  this.render = function() {
    push();
    stroke(this.color[0], this.color[1], this.color[2]);
    strokeWeight(2);
    line(this.pos.x - this.vel.x, this.pos.y - this.vel.y, this.pos.x, this.pos.y);
    //point(this.pos.x, this.pos.y);
    pop();
  }

  this.hits = function(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r) {
      return true;
    } else {
      return false;
    }
  }
  
  this.hits_ovni = function(ovni) {
    var d = dist(this.pos.x, this.pos.y, ovni.pos.x, ovni.pos.y);
    if (d < ovni.size) {
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
