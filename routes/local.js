var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('local');
});

// router.post('/login',
//     passport.authenticate('local', {
//         successRedirect: '/home',
//         failureRedirect: '/',
//         failureFlash: true
//     }, function(req, res){

//     })
// );

router.post('/loginlocal',
    passport.authenticate('local'), // complete the authenticate using the google strategy
    (err, req, res, next) => { // custom error handler to catch any errors, such as TokenError
        if (err) {
            res.redirect('/'); // redirect them back to the login page
        }
    },
    (req, res) => {
        req.logIn(req.user, function (err) {
            if (!err) {
                console.log(req.isAuthenticated());
                console.log(req.user);
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