var express = require('express');
var router = express.Router();

function checkLogin(req, res, next){
    if(!req.session.user){
        res.redirect('/');
    }else{
        next();
    }
}

router.get('/', checkLogin, function (req, res, next) {
    res.render('home');
});

router.get('/logout', (req, res) => {
    req.session.destroy(function(e){
        req.logout();
        res.redirect('/');
    });
});

module.exports = router;