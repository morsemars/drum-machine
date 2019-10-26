const MAX_KNOB_VALUE = 130;
const MIN_KNOB_VALUE = -1 * MAX_KNOB_VALUE;
const KNOB_SENSITIVITY = 0.2;

let isChanging = false;
let targetObject;
let startingY;

const computePercentValue = degree => (degree + MAX_KNOB_VALUE) / (2 * MAX_KNOB_VALUE);
const isWithinKnobRange = degree => degree >= MIN_KNOB_VALUE && degree <= MAX_KNOB_VALUE;

const getCurrentDegree = element => {
    const transformValue = element.style.transform;
    const numberPattern = /(-?\d+)/;

    if(!transformValue) return 0;
    return parseInt(numberPattern.exec(transformValue)[0]);
}

const hasClass = (className, element) =>  element.className.includes(className);

export const disableRotation = event => {
    targetObject = null;
    isChanging = false;
}

export const enableRotation = event => {
    startingY = event.clientY;
    targetObject = event.target;
    isChanging = true;
}

export const rotateKnob = event => {
    event.preventDefault();
    if(isChanging && hasClass("knob", targetObject)){
        let degreeChange;
        let currentDegree = getCurrentDegree(targetObject);

        degreeChange = (startingY - event.clientY) * KNOB_SENSITIVITY;
        currentDegree += degreeChange;
        if(isWithinKnobRange(currentDegree)){
            targetObject.setAttribute("data-value", computePercentValue(currentDegree))                                                   
            targetObject.style.transform = `rotate(${currentDegree}deg)`;
        }
    }

}
