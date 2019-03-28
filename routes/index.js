var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/login', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.statusCode(400);
    res.json({
      res: false,
      message: 'Invalid request.'
    });
  } else {
    User.find({
      email: req.body.email,
      password: req.body.password
    }).then(user => {
      if (user.length != 0) {
        console.log(user);
        req.session.user = user;
        res.redirect('/home');
      } else {  
        res.render('index', { message: 'Invalid Credentails!'});
      }
    })
  }
});


module.exports = router;