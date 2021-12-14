const express = require("express"),
    router = express.Router(),
    passport = require("passport")


router.get("/google/login", passport.authenticate("google"))

router.get("/google/callback", passport.authenticate('google', {failureRedirect: '/'}), function (req, res) {
    req.flash("success", "You have successfully logged in as " + req.user.email + ".");
    res.redirect("/")
})

router.get("/google/logout", function (req, res) {
    req.logout();
    res.redirect('/');
})


module.exports = router;