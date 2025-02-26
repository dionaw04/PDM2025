let electroRock, piano, guitar, soluja;
let reverb;
let playElectroRockBtn, playPianoBtn, playGuitarBtn, playSolujaBtn;
let reverbSlider;

function preload() {
    // Load audio files from the media folder
    electroRock = loadSound('media/electro_rock.wav');
    piano = loadSound('media/piano.wav');
    guitar = loadSound('media/guitar.wav');
    soluja = loadSound('media/soluja.ogg');
}

function setup() {
    createCanvas(400, 300);

    reverb = new p5.Reverb();
    reverb.set(4, 2); 

    // Connect all sounds to reverb
    electroRock.disconnect();
    piano.disconnect();
    guitar.disconnect();
    soluja.disconnect();
    electroRock.connect(reverb);
    piano.connect(reverb);
    guitar.connect(reverb);
    soluja.connect(reverb);

    // Create buttons to trigger samples
    playElectroRockBtn = createButton('Play Electro Rock');
    playElectroRockBtn.position(20, 20);
    playElectroRockBtn.mousePressed(() => electroRock.play());

    playPianoBtn = createButton('Play Piano');
    playPianoBtn.position(20, 60);
    playPianoBtn.mousePressed(() => piano.play());

    playGuitarBtn = createButton('Play Guitar');
    playGuitarBtn.position(20, 100);
    playGuitarBtn.mousePressed(() => guitar.play());

    playSolujaBtn = createButton('Play Soluja');
    playSolujaBtn.position(20, 140);
    playSolujaBtn.mousePressed(() => soluja.play());

    // Create reverb wet slider (0 to 1)
    createP('Reverb Amount:').position(20, 180);
    reverbSlider = createSlider(0, 10, 0, 0.01);
    reverbSlider.position(20, 220);
}

function draw() {
    background(220); 
    reverb.wet(reverbSlider.value());
}