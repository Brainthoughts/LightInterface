const express = require("express"),
    // {body} = require('express-validator'),
    router = express.Router(),
    formidable = require('formidable'),
    fs = require("fs"),
    sharp = require("sharp"),
    Jimp = require('jimp');
const { getDisplay } = require("../shared/display");

display = require("../shared/display.js")


router.get("/simple", function (req, res) {
    res.render("input/simple")
})

router.post("/simple", function (req, res) {
    let form = new formidable.IncomingForm({ uploadDir: process.cwd() + '/tmp' });
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
    let form = new formidable.IncomingForm({ uploadDir: process.cwd() + '/tmp' });
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
    let form = new formidable.IncomingForm({ uploadDir: process.cwd() + '/tmp' });
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err)
            res.send("There was an error processing your file, try again later.")
            return
        }
        if (files.image.size > 0) { //if an image was actually uploaded
            let image = sharp(files.image.filepath).resize(getDisplay().displayWidth, getDisplay().displayHeight).removeAlpha();
                image.clone().toFile(process.cwd() + '/public/images/currentImage.jpg', function (err, info) {
                    console.log(info);
                    if (err) {
                        console.log(err)
                        res.send("There was an error processing your file, try again later.")
                        return
                    }
                    updateImage(req, res, fields, files.image.filepath, image.clone())
                });
        } else {
            updateImage(req, res, fields, files.image.filepath)
        }
    });

})


function updateImage(req, res, fields, oldImagePath, image) { //converts image to array
    // console.log(image);
    if (!image){
        console.log("load image");
        image = sharp(process.cwd() + '/public/images/currentImage.jpg')
        // console.log(image);
    }
    image.raw()
        .toBuffer((err, data, info) => {
            fs.unlinkSync(oldImagePath) //VERY IMPORTANT: don't forget to delete uploaded images from /tmp
            console.log(info);
            if (err) {
                console.log(err)
                res.send("There was an error processing your file, try again later.")
                return
            }
            console.log([...data])
            display.updateDisplay({
                image: [...data],
                brightness: parseInt(fields.brightness),
            }, res.locals.inputType)
            res.redirect(req.originalUrl)
        })
}

module.exports = router;