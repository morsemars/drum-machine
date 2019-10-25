import "./src/sass/style.css";
import Knob from './src/js/knob';

let audioContext;

const controlKnobs = Array.from(document.getElementsByClassName("knob"));
const playButton = document.getElementById("play-btn");

controlKnobs.forEach(controlKnob => {
    Knob(controlKnob);
});

playButton.onclick = e => {

    console.log(audioContext.currentTime)

 /*    let kick = new Kick(audioContext);
    let now = audioContext.currentTime;
    let source = audioContext.createBufferSource();
    source.buffer = kick;
    source.connect(audioContext.destination);
    source.start;
    var kick = new Kick(audioContext);
    var now = audioContext.currentTime;
    kick.trigger(now);
    kick.trigger(now + 1);
    kick.trigger(now + 2); */ 
}

window.onload = () => {
    audioContext = new AudioContext();
    console.log("Ready");
}

function Kick(context) {
	this.context = context;
};

Kick.prototype.setup = function() {
	this.osc = this.context.createOscillator();
	this.gain = this.context.createGain();
	this.osc.connect(this.gain);
	this.gain.connect(this.context.destination)
};

Kick.prototype.trigger = function(time) {
	this.setup();

	this.osc.frequency.setValueAtTime(150, time);
	this.gain.gain.setValueAtTime(1, time);

	this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
	this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

	this.osc.start(time);

	this.osc.stop(time + 1.5);
};