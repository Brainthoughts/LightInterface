const express = require("express"),
    // {body} = require('express-validator'),
    router = express.Router(),
    formidable = require('formidable'),
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
        display.updateDisplay({
            message: fields.message,
            textHexColor: fields.textColor,
            borderHexColor: fields.borderColor,
            scroll: (fields.scroll === "true"),
            speed: parseInt(fields.speed),
            brightness: parseFloat(fields.brightness),
        }, req.url.split("/")[req.url.split("/").length - 1])
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
        }, req.url.split("/")[req.url.split("/").length - 1])
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
        console.log(files);
        if (files.image.size > 0) {
            let oldpath = files.image.filepath;
            Jimp.read(oldpath, function (err, img) {
                if (err) {
                    console.log(err)
                    res.send("There was an error processing your file, try again later.")
                    return
                }
                img.resize(getDisplay().displayWidth, getDisplay().displayHeight).writeAsync(process.cwd() + '/public/images/currentImage.jpg').then(function () {
                    updateImage(req, res, fields)
                })
            })
        } else {
            updateImage(req, res, fields)
        }
    });

})

function updateImage(req, res, fields) {
    let image = Array();
    Jimp.read(process.cwd() + '/public/images/currentImage.jpg', function (err, img) {
        if (err) {
            console.log(err)
            res.send("There was an error processing your file, try again later.")
            return
        }
        for (let x = 0; x < getDisplay().displayWidth; x++) {
            image.push([])
            for (let y = 0; y < getDisplay().displayHeight; y++) {
                image[x].push([img.getPixelColor(x, y).toString(16)])
            }
        }
        // console.log(image)
        display.updateDisplay({
            image: image,
            brightness: parseFloat(fields.brightness),
        }, req.url.split("/")[req.url.split("/").length - 1])
        res.redirect(req.originalUrl)
    })
}

module.exports = router;