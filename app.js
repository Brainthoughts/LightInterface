const keys = require("./config/keys.js"),
    express = require("express"),
    app = express(),
    favicon = require("serve-favicon"),
    session = require("express-session")({secret: "averygoodsecret", resave: false, saveUninitialized: false}),
    logger = require("morgan"),
    flash = require("connect-flash"),
    twilio = require('twilio')(keys.twilio.accountSid, keys.twilio.authToken)

const indexRoutes = require("./routes/index.js"),
    inputRoutes = require("./routes/input.js"),
    apiRoutes = require("./routes/api.js"),
    debugRoutes = require("./routes/debug.js")
display = require("./shared/display.js")


require('express-ws')(app); //sets up ws in the router
app.set("view engine", "ejs"); //for rendering html
app.use(express.static(__dirname + "/public"));
app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.use(session)
app.use(logger("common"));
app.use(flash())


//initialize session variables
app.use(function (req, res, next) {
    res.locals.flash = {success: req.flash("success"), info: req.flash("info"), error: req.flash("error")};
    res.locals.inputType = req.url.split("/")[req.url.split("/").length - 1];
    res.locals.display = display.getDisplay()[res.locals.inputType]; //display of proper input type
    next();
})
app.use("/", indexRoutes)
app.use("/input", inputRoutes)
app.use("/api", apiRoutes.router) //.router needed because my code is bad and apiRoutes exports more than 1 thing

if (process.env.debug) {
    console.log("DEBUG")
    app.use("/debug", debugRoutes)
} else {
    process.on("SIGINT", function () {
        shutdown("SIGINT");
    })

    process.on("SIGTERM", function () {
        shutdown("SIGTERM");
    })

    process.on('uncaughtException', (err, origin) => {
        console.log(`Error: ${err}`);
        console.log(`Origin: ${origin}`);
        shutdown("UNCAUGHT EXCEPTION");
    });
}

function shutdown(code) {
    console.log(`Shutting down: ${code}`)
    for (let number of keys.twilio.phoneNumbers) {
        twilio.messages
            .create({
                body: `Shutting down: ${code}`,
                messagingServiceSid: keys.twilio.messagingServiceSid,
                to: number
            })
            .then(message => {
                console.log(`message sent to ${number} with id ${message.sid}`)
                if (keys.twilio.phoneNumbers.indexOf(number) === keys.twilio.phoneNumbers.length - 1) {
                    process.exit()
                }
            })
            .done();
    }
}

app.listen(4567, function () {
    console.log("Server started!")
});