let display = {
    id: 1,
    message: "test",
    color: [255,255,255],
    hexColor: "#ffffff",
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
    let r = display.color[0].toString(16).length === 1 ? "0" + display.color[0].toString(16) : display.color[0].toString(16);
    let g = display.color[1].toString(16).length === 1 ? "0" + display.color[1].toString(16) : display.color[1].toString(16);
    let b = display.color[2].toString(16).length === 1 ? "0" + display.color[2].toString(16) : display.color[2].toString(16);
    display.hexColor = "#"+r+g+b
}

module.exports.getDisplay = getDisplay;
module.exports.updateDisplay = updateDisplay;