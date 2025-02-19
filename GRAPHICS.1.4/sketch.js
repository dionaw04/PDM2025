let bugs = [];
let squishedCount = 0;
let timeLeft = 30;
let gameOver = false;
let bugSprites;
let squishedSprite;
let frameIndex = 0;
let frameDelay = 5;
let frameCounter = 0;

function preload() {
    bugSprites = loadImage('BeetlePiskel1.png'); // Bug Sprite Sheet
    squishedSprite = loadImage('squished.png'); // Bug(Squished Edition) image
}

function setup() {
    createCanvas(600, 400);
    for (let i = 0; i < 5; i++) {
        bugs.push(new Bug(random(width), random(height)));
    }
    setInterval(() => {
        if (timeLeft > 0) timeLeft--;
        else gameOver = true;
    }, 1000);
}

function draw() {
    background(200);
    
    if (!gameOver) {
        for (let bug of bugs) {
            bug.move();
            bug.display();
        }
        
        fill(0);
        textSize(20);
        text(`Squished: ${squishedCount}`, 20, 30);
        text(`Time: ${timeLeft}`, width - 100, 30);
        
        frameCounter++;
        if (frameCounter >= frameDelay) {
            frameCounter = 0;
            frameIndex = (frameIndex + 1) % 7; // Cycle through animation frames
        }
    } else {
        textSize(32);
        fill(255, 0, 0);
        textAlign(CENTER, CENTER);
        text("Game Over!", width / 2, height / 2);
        text(`Final Score: ${squishedCount}`, width / 2, height / 2 + 40);
    }
}

function mousePressed() {
    for (let bug of bugs) {
        if (!bug.squished && bug.isClicked(mouseX, mouseY)) {
            bug.squish();
            squishedCount++;
            bugs.push(new Bug(random(width), random(height), bug.speed * 1.1));
        }
    }
}

class Bug {
    constructor(x, y, speed = 2) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.squished = false;
        this.direction = p5.Vector.random2D();
    }
    
    move() {
        if (!this.squished) {
            this.x += this.direction.x * this.speed;
            this.y += this.direction.y * this.speed;
            
            if (this.x < 0 || this.x > width) this.direction.x *= -1;
            if (this.y < 0 || this.y > height) this.direction.y *= -1;
        }
    }
    
    display() {
        if (this.squished) {
            image(squishedSprite, this.x - 15, this.y - 15, 30, 30);
        } else {
            push();
            translate(this.x, this.y);
            rotate(atan2(this.direction.y, this.direction.x));
            image(bugSprites, -15, -15, 30, 30, frameIndex * 32, 0, 32, 32);
            pop();
        }
    }
    
    isClicked(mx, my) {
        return dist(mx, my, this.x, this.y) < 15;
    }
    
    squish() {
        this.squished = true;
    }
}