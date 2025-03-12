let img;

function preload() {
    img = loadImage("image/helicopter.jpg");
}

function setup() {
    createCanvas(800, 600);
    image(img, 0, 0, width, height);
}

function mousePressed() {
    
    // Create sound effect using Tone.js
    const synth = new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: { attack: 0.01, decay: 0.05, sustain: 0, release: 0.05 }
    }).toDestination();

    const noise = new Tone.Noise("white").start();
    const noiseFilter = new Tone.Filter({ type: "lowpass", frequency: 800 }).toDestination();
    noise.connect(noiseFilter);
    const noiseEnv = new Tone.AmplitudeEnvelope({ attack: 0.01, decay: 0.2, sustain: 0, release: 0.1 }).connect(noiseFilter);
    
    const lfo = new Tone.LFO({ frequency: 10, min: 200, max: 600 }).start();
    lfo.connect(noiseFilter.frequency);
    
    const reverb = new Tone.Reverb({ decay: 2, wet: 0.5 }).toDestination();
    synth.connect(reverb);
    
    synth.triggerAttackRelease("G2", "8n");
    noiseEnv.triggerAttackRelease("8n");
}
