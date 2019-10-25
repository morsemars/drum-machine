const MAX_KNOB_VALUE = 130;
const MIN_KNOB_VALUE = -1 * MAX_KNOB_VALUE;
const KNOB_SENSITIVITY = 5;

const clearOnMouseMoveEvent = event => event.target.onmousemove = null;
const computePercentValue = degree => (degree + MAX_KNOB_VALUE) / (2 * MAX_KNOB_VALUE);
const isWithinKnobRange = degree => degree >= MIN_KNOB_VALUE && degree <= MAX_KNOB_VALUE;

const getCurrentDegree = element => {
    const transformValue = element.style.transform;
    const numberPattern = /(-?\d+)/;

    if(!transformValue) return 0;
    return parseInt(numberPattern.exec(transformValue)[0]);
}

const rotateKnob = event => {
    let degreeChange;
    let currentDegree = getCurrentDegree(event.target);

    event.target.onmousemove = event => {
        degreeChange = (event.movementY) * -1 * KNOB_SENSITIVITY;
        currentDegree += degreeChange;
        if(isWithinKnobRange(currentDegree)){
            event.target.value = computePercentValue(currentDegree);                                                     
            event.target.style.transform = `rotate(${currentDegree}deg)`
        }
    }
}

const init = (controlKnob) => {
    controlKnob.onmousedown = rotateKnob;
    controlKnob.onmouseout = clearOnMouseMoveEvent;
    controlKnob.onmouseup = clearOnMouseMoveEvent;
}

export default init;