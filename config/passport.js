const passport = require("passport"),
    GoogleStrategy = require("passport-google-oauth20").Strategy,
    keys = require("./keys.js")

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});


passport.use(new GoogleStrategy({
        clientID: keys.google.clientId,
        clientSecret: keys.google.clientSecret,
        callbackURL: keys.google.callbackURL,
        scope: ['email'],
    },
    function (accessToken, refreshToken, profile, cb) {
        let user = {email: profile.emails[0].value};
        if (keys.accounts.admins.includes(profile.emails[0].value)) {
            user.accessLevel = 2;
        } else if (keys.accounts.operators.includes(profile.emails[0].value)) {
            user.accessLevel = 1;
        } else {
            user.accessLevel = 0;
        }
        cb(null, user)
    }
));