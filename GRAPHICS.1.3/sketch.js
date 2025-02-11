let purple;
let character;

function preload() {
  purple = loadImage("purple.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  character = new Character (30,30);
  character.addAnimation("right", new SpriteAnimation(purple,2,0,7));
  character.addAnimation("left", new SpriteAnimation(purple, 2,0,7, true));
  character.addAnimation("stand", new SpriteAnimation(purple, 0,0,1));
  character.addAnimation("standLeft", new SpriteAnimation(purple, 0,0,1, true));
  character.currentAnimation = "stand";
}

function draw() {
  background(220);

  character.draw();
}

function keyPressed() {
  character.keyPressed();
}

function keyReleased() {
  character.keyReleased();
}

class Character {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = "stand";
    this.animations = {};
  }

addAnimation(key, animation) {
  this.animations[key] = animation;
}

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "right" :
          this.x += 2;
          break;
        case "left" :
          this.x -= 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
  switch(keyCode) {
    case RIGHT_ARROW:
      this.currentAnimation = "right";
      break;
    case LEFT_ARROW:
      this.currentAnimation = "left";
      this.currentAnimation.flipped = flipped;
      break;
  }
}

 keyReleased () {
    this.currentAnimation = "stand";
    this.animation[this.currentAnimation].flipped = flipped;
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration, flipped = false) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = flipped;
  }

  draw() {
    let s = (this.flipped) ?  -1 : 1;
    scale(s,1);
    image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0)
      this.u++;

    if (this.u === this.startU + this.duration)
      this.u = this.startU;
    pop();
  }
}