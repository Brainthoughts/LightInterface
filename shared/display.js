let display = {
    inputType: "simple",
    displayWidth: 20,
    displayHeight: 30,
    simple: {
        message: "Hello World!",
        textColor: [255, 255, 255],
        textHexColor: "#ffffff",
        borderColor: [255, 255, 255],
        borderHexColor: "#ffffff",
        scroll: true,
        speed: 3,
        brightness: 255,
    },
    twoline: {
        topMessage: "Hello World!",
        topTextColor: [255, 255, 255],
        topTextHexColor: "#ffffff",
        topScroll: true,
        topSpeed: 3,

        bottomMessage: "Hello World!",
        bottomTextColor: [255, 255, 255],
        bottomTextHexColor: "#ffffff",
        bottomScroll: true,
        bottomSpeed: 3,

        borderColor: [255, 255, 255],
        borderHexColor: "#ffffff",
        brightness: 255,
    },
};

function getDisplay() {
    return display;
}

function updateDisplay(_display, inputType) {
    if (inputType === "simple") {
        _display.textHexColor = "#" + toBufferedHex(_display.textColor)
    }
    else if (inputType === "twoline") {
        _display.topTextHexColor = "#" + toBufferedHex(_display.topTextColor)
        _display.bottomTextHexColor = "#" + toBufferedHex(_display.bottomTextColor)
    }
    _display.borderHexColor = "#" + toBufferedHex(_display.borderColor)

    display.inputType = inputType;
    display[inputType] = _display;
}

function toBufferedHex(rgb) {
    let hexOut = "";
    for (const color of rgb) {
        hexOut += color.toString(16).length === 1 ? "0" + color.toString(16) : color.toString(16);
    }
    return hexOut
}

function hexToRGB(hex) {

}

module.exports.getDisplay = getDisplay;
module.exports.updateDisplay = updateDisplay;