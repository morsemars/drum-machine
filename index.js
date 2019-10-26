import "./src/sass/style.css";
import { enableRotation, disableRotation, rotateKnob } from './src/js/knob'

const container = document.getElementsByClassName("container")[0];

container.onmousedown = enableRotation;
document.onmouseup = disableRotation;
document.onmousemove = rotateKnob;

