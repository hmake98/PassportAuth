const keys_google = require('./keys_google');
const keys_facebook = require('./keys_facebook');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: keys_google.google.clientID,
            clientSecret: keys_google.google.clientSecret,
            callbackURL: 'http://localhost:3000/auth/google/redirect'
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }
    ));
};

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new FacebookStrategy({
            clientID: keys_facebook.facebook.clientID,
            clientSecret: keys_facebook.facebook.clientSecret,
            callbackURL: "http://localhost:3000/auth/facebook/redirect"
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: accessToken
            });
        }
    ));
}

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },  
    function (username, password, done) {
        User.findOne({
            email: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            return done(null, user);
        });
    }
));