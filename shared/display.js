const pushUpdate = require("../routes/api.js").pushUpdate
let display = {  //display defaults
    inputType: "simple",
    displayWidth: 30,
    displayHeight: 20,
    simple: {
        message: "Hello World!",
        textColor: 16777215,
        textHexColor: "#ffffff",
        borderColor: 16777215,
        borderHexColor: "#ffffff",
        scroll: true,
        speed: 3,
        brightness: 100,
    },
    twoline: {
        topMessage: "Hello World!",
        topTextColor: 16777215,
        topTextHexColor: "#ffffff",
        topScroll: true,
        topSpeed: 3,

        bottomMessage: "Hello World!",
        bottomTextColor: 16777215,
        bottomTextHexColor: "#ffffff",
        bottomScroll: true,
        bottomSpeed: 3,

        borderColor: 16777215,
        borderHexColor: "#ffffff",
        brightness: 100,
    },
    image: {
        brightness: 100,
    }
};

function getDisplay() {
    return display;
}

function updateDisplay(_display, inputType) {
    if (inputType === "simple") {
        _display.textColor = hexToRGB(_display.textHexColor)
        _display.borderColor = hexToRGB(_display.borderHexColor)
    } else if (inputType === "twoline") {
        _display.topTextColor = hexToRGB(_display.topTextHexColor)
        _display.bottomTextColor = hexToRGB(_display.bottomTextHexColor)
        _display.borderColor = hexToRGB(_display.borderHexColor)
    } else if (inputType === "image") {
        _display.image = parseImage(_display.image);
    }

    display.inputType = inputType;
    display[inputType] = _display; //update the actual display object
    pushUpdate() //send new data to all connected ws
}

function parseImage(img) {
    let image = [];
    for (let col = 0; col < getDisplay().displayWidth; col++) { //for each column
        for (let row = 0; row < getDisplay().displayHeight; row++) { //for each row
            image.push(hexToRGB(img.getPixelColor(col, row).toString(16).substring(0, 6))) //add pixel rgb int to the image array
        }
    }
    return image;
}

function hexToRGB(hex) { //converts a hex rgb string to rgb int
    hex = hex.replace("#", "")

    let rgb = parseInt(hex.substring(0, 2), 16)
    rgb = (rgb << 8) + parseInt(hex.substring(2, 4), 16)
    rgb = (rgb << 8) + parseInt(hex.substring(4, 6), 16)

    return rgb
}

//exports
module.exports.getDisplay = getDisplay;
module.exports.updateDisplay = updateDisplay;
module.exports.hexToRGB = hexToRGB;

module.exports.getType = () => display.inputType;
module.exports.getData = () => display[display.inputType];