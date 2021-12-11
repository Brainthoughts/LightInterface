const express = require("express"),
    // {body} = require('express-validator'),
    router = express.Router(),
    formidable = require('formidable'),
    fs = require("fs")
Jimp = require('jimp');
const {getDisplay} = require("../shared/display");

display = require("../shared/display.js")


router.get("/simple", function (req, res) {
    res.render("input/simple")
})

router.post("/simple", function (req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        if (err)
            console.log(err)
        display.updateDisplay({ //update the display object
            message: fields.message,
            textHexColor: fields.textColor,
            borderHexColor: fields.borderColor,
            scroll: (fields.scroll === "true"),
            speed: parseInt(fields.speed),
            brightness: parseFloat(fields.brightness),
        }, res.locals.inputType)
        res.redirect(req.originalUrl)
    })
})

router.get("/twoline", function (req, res) {
    res.render("input/twoLine")
})

router.post("/twoline", function (req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        if (err)
            console.log(err)

        display.updateDisplay({
            topMessage: fields.topMessage,
            topTextHexColor: fields.topTextColor,
            topScroll: (fields.topScroll === "true"),
            topSpeed: parseInt(fields.topSpeed),

            bottomMessage: fields.bottomMessage,
            bottomTextHexColor: fields.bottomTextColor,
            bottomScroll: (fields.bottomScroll === "true"),
            bottomSpeed: parseInt(fields.bottomSpeed),

            borderHexColor: fields.borderColor,
            brightness: parseFloat(fields.brightness),
        }, res.locals.inputType)
        res.redirect(req.originalUrl)
    })
})

router.get("/image", function (req, res) {
    res.render("input/image")
})

router.post("/image", function (req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err)
            res.send("There was an error processing your file, try again later.")
            return
        }
        if (files.image.size > 0) { //if an image was actually uploaded
            Jimp.read(files.image.filepath, function (err, img) { //load image into jimp
                if (err) {
                    console.log(err)
                    res.send("There was an error processing your file, try again later.")
                    return
                }
                img.resize(getDisplay().displayWidth, getDisplay().displayHeight) //resize image to 30x20 px
                    .writeAsync(process.cwd() + '/public/images/currentImage.jpg') //save new image
                    .then(function () {
                        updateImage(req, res, fields, files.image.filepath)
                    })
            })
        } else {
            updateImage(req, res, fields, files.image.filepath)
        }
    });

})


function updateImage(req, res, fields, oldImagePath) { //converts jimp image to array
    fs.unlinkSync(oldImagePath) //VERY IMPORTANT: don't forget to delete uploaded images from /tmp
    Jimp.read(process.cwd() + '/public/images/currentImage.jpg', function (err, img) { //read new image
        if (err) {
            console.log(err)
            res.send("There was an error processing your file, try again later.")
            return
        }
        display.updateDisplay({
            image: img,
            brightness: parseInt(fields.brightness),
        }, res.locals.inputType)
        res.redirect(req.originalUrl)
    })
}

module.exports = router;