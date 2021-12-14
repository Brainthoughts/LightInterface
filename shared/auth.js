let auth = {};

auth.hasAccessLevel = function (accessLevel) {
    return function (req, res, next) {
        if (process.env.debug){
            next();
        } else if (!req.isAuthenticated()) {
            req.flash("info", "You must be logged in to do that.");
            res.redirect("/");
        } else if (req.user.accessLevel < accessLevel) {
            req.flash("error", "You do not have permission to do that.");
            res.redirect("/");
        } else {
            next();
        }
    }
}

module.exports = auth;