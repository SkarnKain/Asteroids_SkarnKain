// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM

var ship;
var ovni = [];
var lasers_ovni = [];
var frame;
var asteroids = [];
var lasers = [];
var stars = [];
var dust = [];
var score = 0;
var bestscore = 0;
var level = 10;
var ovni_shooting_time = 300 - (level * 20);
var test = false;
var dead = false;
var beginnning = true;
var first_beginnning = true;
var currentTime = 0;
var pause_time = 2000;


function setup() {
    
    if (!ship){
        //createCanvas(800, 600);
        createCanvas(windowWidth, windowHeight);
    }
    colorMode(RGB);
    first_beginnning = true;
    asteroids = [];
    lasers = [];
    stars = [];
    ovni = [];
    lasers_ovni = [];
    frame = 1;
    if (dead == true){
      score = 0;
      level = 1;
      dead = false;
    }
    
    if (!ship){
        ship = new Ship();
    }
    for (var i = 0; i < 30; i++) {
        stars.push(new Star());
    }
    var nb_asteroid = level + 1;
    var nb_ovni = floor(level / 2) - 1;
    if (nb_ovni < 0){nb_ovni = 0};
    for (var i = 0; i < nb_asteroid; i++) {
        asteroids.push(new Asteroid());
    }
    
    for (var i = 0; i < nb_ovni; i++) {
        ovni.push(new Ovni());
    }
}

function draw() {
  background(0);
  push();
  textSize(15);
  fill(200, 200, 200);
  textAlign(RIGHT);
  text("Score : " + score, width - 20, height - 20);
  if (score > bestscore) {
    bestscore = score;    
  }
  textAlign(LEFT);
  text("Best : " + bestscore, 20, height - 20);
  fill(30, 30, 30);
  textSize(40);
  textAlign(CENTER);
  textStyle(BOLD);
  text("LEVEL " + level, floor(width / 2), floor(height / 2));
  pop();

  if (!beginnning) {
    frame += 1;
  }
    
  for (var i = 0; i < stars.length; i++) {
        stars[i].render();
  }
    
  if (first_beginnning) {
      begin_level()
  }
    
  if (currentTime + pause_time <= new Date().getTime()) {
      beginnning = false;
  }
    
  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
        dead = true;
        var dustVel = ship.vel;
        var dustNum = 100;
        addDust(ship.pos, dustVel, 0, 1, 0.2, dustNum);
        ship = new Ship();
        setup();
        break;
    }
    if (ship.closeenough(asteroids[i])) {
        score = score + level;
    }
    asteroids[i].render();
    if (!beginnning) {
        asteroids[i].update();
        asteroids[i].ast_rotate();
    }
    asteroids[i].edges();
  }

  for (var i = lasers.length - 1; i >= 0; i--) {
    
    if (!beginnning) {
        lasers[i].render();
        lasers[i].update();
    }
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          var dustVel = p5.Vector.add(lasers[i].vel.mult(0.2), asteroids[j].vel);
          var dustNum = (asteroids[j].r + 1) * 1;
          addDust(asteroids[j].pos, dustVel, 0.8, 0.5, 0.2, dustNum);
          if (asteroids[j].r > 10) {
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          score = score + level * 100;
          break;
        }
      }
    }
  }

  for (var i = lasers.length - 1; i >= 0; i--) {
      for (var j = ovni.length - 1; j >= 0; j--) {
        if (lasers[i].hits_ovni(ovni[j])) {
          var dustVel = p5.Vector.add(lasers[i].vel.mult(0.2), ovni[j].vel);
          var dustNum = (ovni[j].size + 1) * 5;
          addDust(ovni[j].pos, dustVel, 1, 0, 0, dustNum);
          ovni.splice(j, 1);
          lasers.splice(i, 1);
          score = score + level * 500;
          break;
        }
      }
  }


 for (var i = ovni.length - 1; i >= 0; i--) {
    
    if (ship.hits_ovni(ovni[i])) {
        dead = true;
        var dustVel = ship.vel;
        var dustNum = 100;
        addDust(ship.pos, dustVel, 0, 1, 0.2, dustNum);
        ship = new Ship();
        setup();
        break;
    }
    if (!beginnning) {
        ovni[i].update();
    }
    ovni[i].edges();
    ovni[i].render();
 }

  if (frame / ovni_shooting_time == floor(frame / ovni_shooting_time)) {
      for (var i = ovni.length - 1; i >= 0; i--) {
          var angle_laser = convert_theta(ship.pos.x, ship.pos.y, ovni[i].pos.x, ovni[i].pos.y);
          lasers_ovni.push(new Laser_ovni(ovni[i].pos, angle_laser, ovni[i].size));
      }
  }

  for (var i = lasers_ovni.length - 1; i >= 0; i--) {
    
    if (!beginnning) {
        lasers_ovni[i].render();
        lasers_ovni[i].update();
    }
    if (lasers_ovni[i].offscreen()) {
      lasers_ovni.splice(i, 1);
    } else {
    if (lasers_ovni[i].hits(ship)) {
        dead = true;
        var dustVel = ship.vel;
        var dustNum = 100;
        addDust(ship.pos, dustVel, 0, 1, 0.2, dustNum);
        ship = new Ship();
        setup();
        break;
        }
    }
  }
    
  if (asteroids.length == 0 && ovni.length == 0){
      level ++;
      setup();
  }  
  
  ship.render();
  ship.turn();
  if (!beginnning) {
    ship.update();
  }
  ship.edges();

  for (var i = dust.length - 1; i >= 0; i--) {
    dust[i].update();
    if (dust[i].transparency <= 0) {
      dust.splice(i, 1);
    }
  }    
 
  for (var i = dust.length - 1; i >= 0; i--) {
    dust[i].render();
  } 
}

function keyReleased() {
  if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(false);
  }
}

function keyPressed() {
    if (key == ' ') {
        if (!beginnning) {
            lasers.push(new Laser(ship.pos, ship.heading, ship.r));
        }
    } else if (keyCode == RIGHT_ARROW) {
        ship.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW) {
        ship.setRotation(-0.1);
    } else if (keyCode == UP_ARROW) {
        ship.boosting(true);
    }
}

function begin_level() {
   currentTime = new Date().getTime();
   first_beginnning = false;
   beginnning = true;
}

function convert_theta(x1, y1, x2, y2) {
    this.x = x1 - x2;
    this.y = y1 - y2;
    if (this.x > 0 && this.y >= 0){
        this.theta = atan(y / x);
    } else if (this.x > 0 && this.y < 0){
        this.theta = atan(y / x) + TWO_PI;
    } else if (this.x < 0){
        this.theta = atan(y / x) + PI;
    } else if (this.x = 0 && this.y > 0){
        this.theta = PI / 2;
    } else if (this.x = 0 && this.y < 0){
        this.theta = 3 * PI / 2;
    }
return theta;
}