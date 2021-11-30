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
    apiRoutes = require("./routes/api.js")

const displayModel = require("./models/display.js")
let display;

app.set("view engine", "ejs");
mongoose.connect('mongodb://localhost/lightInterface', {useNewUrlParser: true, useUnifiedTopology: true})
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
displayModel.find().exec(function (err, docs) {
    if (docs) {
        display = docs[0]
    }
    else {
        displayModel.create({
            color: [255,255,255],
            scroll: true,
            speed: 100,
            displayWidth: 16,
            displayHeight: 7,
            brightness: .25,
        })
    }
})
//initialize session variables
app.use(function (req, res, next) {
    res.locals.flash = {success: req.flash("success"), info: req.flash("info"), error: req.flash("error")};
    res.locals.display = display;
    next();
})
app.use("/", indexRoutes)
app.use("/api", apiRoutes)


server.listen(4567, function () {
    console.log("Server started!")

});

