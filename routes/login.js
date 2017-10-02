var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Sign In',user : req.user,message: req.flash('loginMessage')});
});


// process the login form
        router.post('/', passport.authenticate('local-login', {
            successRedirect : '/portal', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

module.exports = router;
