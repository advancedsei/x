var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET registration page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register',user : req.user,message: req.flash('signupMessage') });
});

router.post('/', passport.authenticate('local-signup', {
            successRedirect : '/thankyou', // thank you page ...
            failureRedirect : '/register', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

module.exports = router;
