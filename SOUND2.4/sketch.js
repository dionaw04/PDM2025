let colors = ['orange', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'brown', 'white', 'black'];
let dragging = false;
let selectedColor = 'black';
let lineSketch, marimba, backgroundMusic, monkeySound, tromboneSound;
let startScreen = true;
let bgImage;

function preload() {
  lineSketch = loadSound('media/linesketch.mp3');
  marimba = loadSound('media/marimba.mp3');
  backgroundMusic = loadSound('media/funny music.mp3');
  splatSound = loadSound('media/splat.mp3');
  tromboneSound = loadSound('media/trombone.mp3');
  bgImage = loadImage('media/background photo.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  colorMode(HSB);
}

function draw() {
  if (startScreen) {
    drawStartScreen();
  } else {
    drawPaintScreen();
  }
}

function drawStartScreen() {
  background(bgImage);
  fill(0);
  stroke(100);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Start Painting!", 350, 290);
  
  fill(100, 100, 255);
  rectMode(CENTER);
  rect(width / 2, height / 2 + 50, 200, 50, 10);
  
  fill(0);
  textSize(12);
  text("Click to Start", width / 2, height / 2 + 50);
}

function drawPaintScreen() { 
  noStroke();
  rectMode(CORNER);
  
  fill('red'); square(0, 2, 40);
  fill('orange'); square(0, 45, 40);
  fill('yellow'); square(0, 88, 40);
  fill('green'); square(0, 131, 40);
  fill('cyan'); square(0, 174, 40);
  fill('blue'); square(0, 217, 40);
  fill('magenta'); square(0, 260, 40);
  fill('brown'); square(0, 303, 40);
  fill('white'); square(0, 346, 40);
  fill('black'); square(0, 389, 40);
  
  fill(200, 0, 0);
  rect(width - 120, 20, 100, 40, 10);
  fill(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  text("Clear", width - 70, 40);
}

function mousePressed() {
  if (startScreen) {
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 + 25 && mouseY < height / 2 + 75) {
      startScreen = false;
      background(255);
      backgroundMusic.loop();
      backgroundMusic.setVolume(0.1);
      splatSound.play(); 
    }
  } else {
    if (mouseX >= 0 && mouseX <= 40) {
      let newColor = getColorFromMouseY(mouseY);
      if (newColor !== selectedColor) {
        selectedColor = newColor;
        marimba.play();
      }
    } 
    else if (mouseX > width - 120 && mouseX < width - 20 && mouseY > 20 && mouseY < 60) {
      background(255); 
      tromboneSound.play();
    } 
    else { 
      dragging = true;
    }
  }
}

function mouseDragged() {
  if (dragging && mouseX > 50) {
    stroke(selectedColor);
    strokeWeight(10);
    line(pmouseX, pmouseY, mouseX, mouseY);
    
    if (!lineSketch.isPlaying()) {
      lineSketch.loop();
      lineSketch.setVolume(map(mouseX, 50, width, 0.5, 0));
    }
  }
}

function mouseReleased() {
  dragging = false;
  lineSketch.stop();
}


function getColorFromMouseY(y) {
  if (y >= 2 && y <= 42) return 'red';
  if (y >= 45 && y <= 87) return 'orange';
  if (y >= 88 && y <= 132) return 'yellow';
  if (y >= 131 && y <= 177) return 'green';
  if (y >= 174 && y <= 222) return 'cyan';
  if (y >= 217 && y <= 267) return 'blue';
  if (y >= 260 && y <= 312) return 'magenta';
  if (y >= 303 && y <= 357) return 'brown';
  if (y >= 346 && y <= 402) return 'white';
  if (y >= 389 && y <= 447) return 'black';
  return selectedColor;
}
