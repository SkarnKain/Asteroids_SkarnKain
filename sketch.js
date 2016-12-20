// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM

var ship;
var asteroids = [];
var lasers = [];
var stars = [];
var score = 0;
var level = 1;
var test = false;
var dead = false;
var beginnning = true;
var first_beginnning = true;
var currentTime = 0;
var pause_time = 2000;


function setup() {
    //createCanvas(windowWidth, windowHeight);
    createCanvas(640, 480);
    colorMode(RGB);
    first_beginnning = true;
    asteroids = [];
    lasers = [];
    stars = [];
    if (dead == true){
      score = 0;
      level = 1;
      dead = false;
    }
    ship = new Ship();
    
    for (var i = 0; i < 30; i++) {
        stars.push(new Star());
    }
    
    for (var i = 0; i < level; i++) {
        asteroids.push(new Asteroid());
    }
}

function draw() {
  background(0);
  push();
  textSize(15);
  fill(200, 200, 200);
  textAlign(RIGHT);
  text("Score : " + score, width - 20, height - 20);
  fill(30, 30, 30);
  textSize(40);
  textAlign(CENTER);
  text("LEVEL " + level, floor(width / 2), floor(height / 2));
  pop();
    
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
        setup();
        break;
    }
    if (ship.closeenough(asteroids[i])) {
        score = score + level;
        //break;
    }
    asteroids[i].render();
    if (!beginnning) {
        asteroids[i].update();
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
        //if (lasers[i].hits(asteroids[j]) || test == true) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 10) {
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          score = score + level * 100;
          test = false;
          break;
        }
      }
    }
  }

  if (asteroids.length == 0){
      level ++;
      setup();
  }  
  
  ship.render();
  ship.turn();
  if (!beginnning) {
    ship.update();
  }
  ship.edges();
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
//    } else if (keyCode == 83) {
//        test = true;
    }
}

function begin_level() {
   currentTime = new Date().getTime();
   first_beginnning = false;
   beginnning = true;
}