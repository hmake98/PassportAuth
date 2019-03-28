var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect',
    passport.authenticate('google'), // complete the authenticate using the google strategy
    (err, req, res, next) => { // custom error handler to catch any errors, such as TokenError
        if (err) {
            res.redirect('/'); // redirect them back to the login page
        }
    },
    (req, res) => {
        req.logIn(req.user, function (err) {
            if (!err) {
                req.isAuthenticated();
                // On success, redirect back to '/'
                req.session.user = req.user;
                res.redirect('/home');
            } else {
                console.log(err);
            }
        });
    }
)

router.get('/facebook', passport.authenticate('facebook', {
    authType: 'reauthenticate',
    scope: ['user_friends', 'manage_pages']
}));

router.get('/facebook/redirect',
    passport.authenticate('facebook'), // complete the authenticate using the google strategy
    (err, req, res, next) => { // custom error handler to catch any errors, such as TokenError
        if (err) {
            res.redirect('/'); // redirect them back to the login page
        }
    },
    (req, res) => {
        req.logIn(req.user, function (err) {
            if (!err) {
                req.isAuthenticated();
                // On success, redirect back to '/'
                req.session.user = req.user;
                res.redirect('/home');
            } else {
                res.render('index', {
                    message: err
                });
            }
        });
    }
)


module.exports = router;