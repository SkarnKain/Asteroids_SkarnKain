// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM

function Dust(pos, vel, R_color, G_color, B_color) {
  this.pos = pos.copy();
  this.vel = vel.copy();
  this.R_color = R_color;
  this.G_color = G_color;
  this.B_color = B_color;
  this.vel.add(p5.Vector.random2D().mult(random(0.5, 1.5)));
  this.transparency = random(200, 255);

  this.update = function() {
    this.pos.add(this.vel);
    this.transparency -= 2;
  }

  this.render = function() {
    if (this.transparency > 0) {
      push();
      colorMode(RGB, 255);
      stroke(this.transparency * this.R_color, this.transparency * this.G_color, this.transparency * this.B_color);
      point(this.pos.x, this.pos.y);
      pop();
    }
  }
}

function addDust(pos, vel, R_color, G_color, B_color, n) {
  for (var i = 0; i < n; i++) {
    dust.push(new Dust(pos, vel, R_color, G_color, B_color));
  }
}