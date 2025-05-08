let port;
let selectedBall = null;
let goalSprite;
let gameState = "start";
let balls = [];
let goal;
let ballY, ballX;
let ballSpeed = 0;
let goalX = 0;
let goalSpeed = 3;
let points = 0;
let timer = 20;
let lastTime;
let shooting = false;
let scored = false;
let soundPlayed = false;
let goalActivated = false;
let bgImage, backgroundSynth, backgroundLoop;
let gameOverSound;
let gameFont;
let goalSynth;
let connectButton;
let lastButtonState = 0; 
let lastTimer = 20;     

function preload() {
  balls.push(loadImage('media/pinkball.png'));
  balls.push(loadImage('media/purpleball.png'));
  balls.push(loadImage('media/basketball.png'));
  goal = loadImage('media/goal.png');
  goalSprite = loadImage('media/goalsprite.png');
  gameOverSound = new Tone.Player("media/gameover.mp3").toDestination();
  bgImage = loadImage('media/background.jpg');
  gameFont = loadFont('media/PressStart2P-Regular.ttf');
}

function connectToSerial() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
    connectButton.style('display', 'none');
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(gameFont);
  stroke(220);
  strokeWeight(4);
  textAlign(CENTER, CENTER);
  ballX = width / 2 - 25;

  port = createSerial();
  connectButton = createButton('Connect to Arduino');
  connectButton.position(width/2 - 100, height/2);
  connectButton.mousePressed(connectToSerial);
  connectButton.style('font-size', '16px');
  connectButton.style('padding', '10px 20px');

  backgroundSynth = new Tone.MembraneSynth({
    harmonicity: 2.5,
    modulationIndex: 10,
    oscillator: { type: 'sine' },
    envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 1 },
    modulation: { type: 'triangle' }
  }).toDestination();
  backgroundLoop = new Tone.Loop((time) => {
    const notes = ["E5", "Dm5", "G5", "C5"];
    const baseNote = notes[Math.floor(Math.random() * notes.length)];
    const pitchShift = window.currentPitchShift || 0;
    const transposedNote = Tone.Frequency(baseNote).transpose(pitchShift).toNote();
    backgroundSynth.triggerAttackRelease(transposedNote, "8n", time);
  }, "0.3");
  Tone.Transport.start();

  goalSynth = new Tone.MetalSynth({
    frequency: 200,
    envelope: { attack: 0.001, decay: 0.1, release: 0.5 },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 400,
    octaves: 1.5
  }).toDestination();
}

function draw() {
  // Read serial data
  let str = port.readUntil("\n");
  if (str) {
    let parts = str.trim().split(",");
    let xVal = 512; 
    let buttonState = 0;
    for (let part of parts) {
      if (part.startsWith("X:")) {
        xVal = parseInt(part.substring(2));
        console.log("Joystick X:", xVal); 
      } else if (part.startsWith("B:")) {
        buttonState = parseInt(part.substring(2));
      }
    }
        if (buttonState === 1 && lastButtonState === 0 && gameState === "play" && !shooting) {
      shooting = true;
      scored = false;
      ballSpeed = -43;
    }
    lastButtonState = buttonState;

    if (gameState === "play" && !shooting) {
      if (xVal < 400) { // Move left
        ballX -= 5;
      } else if (xVal > 624) { // Move right
        ballX += 5;
      }
      ballX = constrain(ballX, 0, width - 50);
    }
  }

  if (gameState === "start") {
    background(bgImage);
    textSize(24);
    fill(0);
    text("Select your ball to begin!", width/2, height/4);
    let ballWidth = 50;
    let spacing = 100;
    let totalWidth = balls.length * ballWidth + (balls.length - 1) * spacing;
    let startX = (width - totalWidth) / 2;
    for (let i = 0; i < balls.length; i++) {
      image(balls[i], startX + i * (ballWidth + spacing), height * 3/4, 50, 50);
    }
  } else if (gameState === "play") {
    background(20, 20, 80);
    goalX += goalSpeed;
    if (goalX + goal.width/4 > width || goalX < 0) {
      goalSpeed *= -1;
    }
    if (goalActivated) {
      image(goalSprite, goalX, 50, goal.width/4, goal.height/4);
    } else {
      image(goal, goalX, 50, goal.width/4, goal.height/4);
    }

    let ballStartY = height * 0.75;
    if (!shooting) {
      image(selectedBall, ballX, ballStartY, 50, 50);
      ballY = ballStartY;
    } else {
      ballY += ballSpeed;
      ballSpeed += 2;
      image(selectedBall, ballX, ballY, 50, 50);
      if (ballY > ballStartY) {
        shooting = false;
        goalActivated = false;
      }
    }

    let goalY = 50;
    let goalHeight = goal.height / 4;
    if (shooting &&
        ballSpeed < 0 &&
        ballY <= goalY + goalHeight &&
        ballY + 50 >= goalY &&
        ballX + 50 > goalX &&
        ballX < goalX + goal.width / 4 + 3 &&
        !scored) {
      points++;
      scored = true;
      goalActivated = true;
      goalSynth.triggerAttackRelease("D#5", "8n");
    }

    let currentTime = millis();
    if (currentTime - lastTime >= 1000) {
      timer--;
      lastTime = currentTime;
    }

    // Buzzer trigger 
    if (timer <= 3 && timer >= 0 && timer != lastTimer) {
      port.write("Z:1\n");
    }
    lastTimer = timer;

    let maxPitchShift = 12;
    let maxTimer = 19;
    let pitchShift = maxPitchShift * (2 - timer / maxTimer);
    window.currentPitchShift = pitchShift;

    stroke(0);
    fill(220);
    textSize(15);
    text(`Time: ${timer}`, 65, 20);
    text(`Points: ${points}`, width - 80, 20);

    if (timer <= 0) {
      gameState = "end";
    }
  } else if (gameState === "end") {
    if (!soundPlayed) {
      gameOverSound.start();
      backgroundSynth.triggerRelease();
      backgroundLoop.stop();
      soundPlayed = true;
    }
    background(bgImage);
    fill(255);
    textSize(32);
    text(`Game Over!\nPoints: ${points}`, width/2, height/2);
    textSize(20);
    text(`Refresh to play again`, width/2, height/2 + 80);
  }
}

async function mousePressed() {
  if (gameState === "start") {
    let ballWidth = 50;
    let spacing = 100;
    let totalWidth = balls.length * ballWidth + (balls.length - 1) * spacing;
    let startX = (width - totalWidth) / 2;
    for (let i = 0; i < balls.length; i++) {
      let x = startX + i * (ballWidth + spacing);
      let y = height * 3/4;
      if (mouseX > x && mouseX < x + ballWidth && mouseY > y && mouseY < y + ballWidth) {
        selectedBall = balls[i];
        gameState = "play";
        lastTime = millis();
        await Tone.start();
        backgroundLoop.start(0);
      }
    }
  }
}