function Star(pos, size, color) {
  if (pos) {
    this.pos = pos.copy();
  } else {
    var rand_x = random(width);
    var rand_y = random(height);
    this.pos = createVector(rand_x, rand_y);
  }
  if (size) {
    this.size = size.copy();
  } else {
    this.size = random(1, 10);
  }
  if (color) {
    this.color = color.copy();
  } else {
    this.color = floor(random(0, 55));
  }

  this.render = function() {
    push();
    noFill();
    strokeWeight(1);
    colorMode(HSB);
    stroke(this.color, 100, 20);
    translate(this.pos.x, this.pos.y);
    line(-this.size, 0, this.size, 0);
    line(0, -this.size, 0, this.size);
    line(-this.size / 2, -this.size / 2, this.size / 2, this.size / 2);
    line( this.size / 2, -this.size / 2,-this.size / 2, this.size / 2);
    pop();
  }

}