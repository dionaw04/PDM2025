function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
}

function draw() {
  background(255);

//////////////// Example 1 //////////////////////
  
  fill(144,238,144);
  rect(10,10,270,130);

  strokeWeight(2);
  stroke(0);
  fill(255);
  circle(75,75,100);
  square(150,25,100);
  
 /////////////// Example 2 /////////////////////
  noStroke();

  //circle 1
  let c = color(255,128,128);
  c.setAlpha(150);
  fill(c);
  circle(150,250,100);
 
  //circle 2
  let d = color(0,0,128);
  d.setAlpha(128)
  fill(d);
  circle(110,300,100);

  //circle 3
  let e = color(0,128,0);
  e.setAlpha(128);
  fill(e);
  circle(190,300,100);

///////////// Example 3 ////////////////////

//background
fill(0);
rect(10,400,270,130);

//pacman
fill(225,225,0);
arc(70,465,90,90,radians(210),radians(150));

//ghost
fill(225,0,0);
rect(148,460,94,45);
arc(195,460,94,90,radians(180),radians(0));

//eyes white part
fill(225);
circle(175,465,25);
circle(215,465,25);

//iris
fill(0,0,225);
circle(175,465,15);
circle(215,465,15);

//////////////// Example 4 ///////////////////////

//background
fill(0,0,128);
square(340,160,280);

strokeWeight(4);
stroke(225);
fill(0,128,0);
circle(480,290,150);

fill(225,0,0);

beginShape();
vertex(480,215)
vertex(503,265)
vertex(555,265)
vertex(512,295)
vertex(528,350)
vertex(480,320)
vertex(432,350)
vertex(448,295)
vertex(405,265)
vertex(457,265)
endShape(CLOSE);







}
