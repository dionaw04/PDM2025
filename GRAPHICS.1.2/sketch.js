let colors = ['orange', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'brown', 'white', 'black'];
let dragging = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(1000);
  colorMode(HSB);
}

function draw () { 
  noStroke();

  fill('red');
  square(0,2,40);

  fill('orange');
  square(0,45,40);

  fill('yellow');
  square(0,88,40);

  fill('green');
  square(0,131,40);

  fill('cyan');
  square(0,174,40);

  fill('blue');
  square(0,217,40);

  fill('magenta');
  square(0,260,40);

  fill('brown');
  square(0,303,40);

  fill('white');
  square(0,346,40);

  fill('black');
  square(0,389,40);

  if (dragging && mouseX > 50) {
    stroke(selectedColor);
    strokeWeight(10);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function mousePressed() {
  let line = mouseX - mouseY;

  if (mouseX >= 0 && mouseX <= 40) {
    if (pmouseY >= 2 && pmouseY <= 42) selectedColor = 'red';
    else if (pmouseY >= 45 && pmouseY <= 87) selectedColor = 'orange';
    else if (pmouseY >= 88 && pmouseY <= 132) selectedColor = 'yellow';
    else if (pmouseY >= 131 && pmouseY <= 177) selectedColor = 'green';
    else if (pmouseY >= 174 && pmouseY <= 222) selectedColor = 'cyan';
    else if (pmouseY >= 217 && pmouseY <= 267) selectedColor = 'blue';
    else if (pmouseY >= 260 && pmouseY <= 312) selectedColor = 'magenta';
    else if (pmouseY >= 303 && pmouseY <= 357) selectedColor = 'brown';
    else if (pmouseY >= 346 && pmouseY <= 402) selectedColor = 'white';
    else if (pmouseY >= 389 && pmouseY <= 447) selectedColor = 'black';
  } else { 
    dragging = true;
  }
}

function mouseReleased() {
  dragging = false;
}
