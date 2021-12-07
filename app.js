const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    favicon = require("serve-favicon"),
    session = require("express-session")({secret: "averygoodsecret", resave: false, saveUninitialized: false}),
    crypto = require("crypto"),
    logger = require("morgan"),
    flash = require("connect-flash"),
    http = require('http'),
    server = http.createServer(app),
    {Server} = require("socket.io"),
    io = new Server(server),
    sharedsession = require("express-socket.io-session"),
    mongoose = require("mongoose")

const indexRoutes = require("./routes/index.js"),
    inputRoutes = require("./routes/input.js"),
    apiRoutes = require("./routes/api.js"),
    display = require("./shared/display.js")

const displayModel = require("./models/display.js")

app.set("view engine", "ejs");
//mongoose.connect('mongodb://localhost/lightInterface', {useNewUrlParser: true, useUnifiedTopology: true})
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.use(session)
app.use(logger("common"));
app.use(flash())
io.use(sharedsession(session, {
    autoSave: true
}));


// require('./routes/sudoku')[1](io);
// displayModel.find({id:1}).exec(function (err, doc) {
//     if (doc) {
//         display = {
//             id: doc.id,
//             message: doc.message,
//             color: doc.color,
//             scroll: doc.scroll,
//             speed: doc.speed,
//             displayWidth: 20,
//             displayHeight: 30,
//             brightness: doc.brightness,
//         }
//         console.log(display)
//     }
//     else {
//         display = {
//             id: 1,
//             message: "test",
//             color: [255,255,255],
//             scroll: true,
//             speed: 75,
//             displayWidth: 20,
//             displayHeight: 30,
//             brightness: .25,
//         }
//         displayModel.create(display)
//     }
// })
//initialize session variables
app.use(function (req, res, next) {
    res.locals.flash = {success: req.flash("success"), info: req.flash("info"), error: req.flash("error")};
    res.locals.display = display.getDisplay()[req.url.split("/")[req.url.split("/").length -1]];
    res.locals.inputType = req.url.split("/")[req.url.split("/").length -1];
    next();
})
app.use("/", indexRoutes)
app.use("/input", inputRoutes)
app.use("/api", apiRoutes)


server.listen(4567, function () {
    console.log("Server started!")
});
