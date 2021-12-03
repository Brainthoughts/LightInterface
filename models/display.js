let mongoose = require("mongoose");

let displaySchema = mongoose.Schema({
    id: {type: Number, unique: true},
    message: {type: String},
    color: {type: Array},
    scroll: {type: Boolean},
    speed: {type: Number},
    displayWidth: {type: Number},
    displayHeight: {type: Number},
    brightness: {type: Number},
});

let progress = mongoose.model("display", displaySchema);
module.exports = progress