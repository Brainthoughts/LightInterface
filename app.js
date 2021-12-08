const express = require("express"),
    app = express(),
    favicon = require("serve-favicon"),
    session = require("express-session")({secret: "averygoodsecret", resave: false, saveUninitialized: false}),
    logger = require("morgan"),
    flash = require("connect-flash"),
    expressWs = require('express-ws')(app);

const indexRoutes = require("./routes/index.js"),
    inputRoutes = require("./routes/input.js"),
    apiRoutes = require("./routes/api.js").router,
    display = require("./shared/display.js")


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.use(session)
app.use(logger("common"));
app.use(flash())


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


app.listen(4567, function () {
    console.log("Server started!")
});