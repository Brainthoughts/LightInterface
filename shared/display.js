let display = {
    id: 1,
    message: "test",
    textColor: [255,255,255],
    textHexColor: "#ffffff",
    borderColor: [255,255,255],
    borderHexColor: "#ffffff",
    scroll: true,
    speed: 75,
    displayWidth: 20,
    displayHeight: 30,
    brightness: .25,
};

function getDisplay() {
    return display;
}

function updateDisplay(_display) {
    display = _display;

    let r = display.textColor[0].toString(16).length === 1 ? "0" + display.textColor[0].toString(16) : display.textColor[0].toString(16);
    let g = display.textColor[1].toString(16).length === 1 ? "0" + display.textColor[1].toString(16) : display.textColor[1].toString(16);
    let b = display.textColor[2].toString(16).length === 1 ? "0" + display.textColor[2].toString(16) : display.textColor[2].toString(16);
    display.textHexColor = "#"+r+g+b

    r = display.borderColor[0].toString(16).length === 1 ? "0" + display.borderColor[0].toString(16) : display.borderColor[0].toString(16);
    g = display.borderColor[1].toString(16).length === 1 ? "0" + display.borderColor[1].toString(16) : display.borderColor[1].toString(16);
    b = display.borderColor[2].toString(16).length === 1 ? "0" + display.borderColor[2].toString(16) : display.borderColor[2].toString(16);
    display.borderHexColor = "#"+r+g+b
}

module.exports.getDisplay = getDisplay;
module.exports.updateDisplay = updateDisplay;