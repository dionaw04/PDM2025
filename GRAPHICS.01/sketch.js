function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {
  background(250,30,100);

  noStroke();
  fill(100);
  square(100,100,100);

  fill(100,100,100);
  circle(125,125,25);
  circle(175,125,25);

  arc(150,150,50,50,0,110);

  stroke("green");
  strokeWeight(4);
  beginShape();
  vertex(100,100);
  vertex(75,75);
  vertex(125,90);
  vertex(150,70);
  vertex(175,90);
  vertex(190,50);
  vertex(200,100);
  endShape(CLOSE);
}
