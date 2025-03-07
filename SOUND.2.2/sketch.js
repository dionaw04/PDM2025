let synth1, filt, rev;
let activeKey = null;
let keyNotes = {
 'a' : 'A4',
 's' : 'B4',
 'd' : 'C5',
 'f' : 'D5',
 'h' : 'E5',
 'j' : 'F5',
 'k' : 'G5',
 'l' : 'A5',
}
let filterSlider;

function setup() {
 createCanvas(400, 400);


 filt = new Tone.Filter(1000, "lowpass").toDestination();
 rev = new Tone.Reverb(2).connect(filt);
 synth1 = new Tone.FMSynth({
   envelope: {
     attack: 0.1,
     decay: 0.2,
     sustain: 0.9,
     release: 0.3
 }
}).connect(rev)

 filterSlider = createSlider(20, 2000, 1000);
 filterSlider.position(120, 250);
 filterSlider.input(updateFilterFrequency);
}

function draw() {
 background(220);
 textSize(16);
 text('Use keys A-F and H-L only (not G)', 70, 100);
 text('Filter Frequency: ' + filterSlider.value(), 110, 230);
}

function keyPressed() {
 let pitch = keyNotes[key];
 if (pitch && key !== activeKey) {
   synth1.triggerRelease();
   activeKey = key;
   synth1.triggerAttack(pitch);
 }
}

function keyReleased() {
 if (key == activeKey) {
   synth1.triggerRelease();
   activeKey = null;
 }
}

function updateFilterFrequency() {
 let freq = filterSlider.value();
 filt.frequency.value = freq;
}

