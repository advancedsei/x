var express = require('express');
var router = express.Router();
var async = require('async');
var crypto = require('crypto');
var User  = require('../models/user');
var emailhtml = require('../email/emailhtml');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('forgotpassword', { title: 'Forgot Password',user : req.user,message: req.flash('forgotpasswordMessage')});
});

/* POST login page. */
router.post('/', function(req, res, next) {
         async.waterfall([
              function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
     function(token, done) {
          User.findOne({ 'email' :  req.body.email.toLowerCase()}, function(err, user) {
               if (!user) {
          req.flash('forgotpasswordMessage', 'No account with that email address exists. Please enter your registered email address.');
                res.render('forgotpassword', { title: 'Forgot Password',user : req.user,message: req.flash('forgotpasswordMessage')});
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.active = false; 
        user.save(function(err) {
          done(err, token, user);
        });

           });
          },
          function(token, user, done) {
            emailhtml.sendEmail('forgotpassword',user.firstname,user.lastname,user.email,user.resetPasswordToken); 
            res.render('forgotpasswordEmail', { title: 'Forgot Password',user : req.body.email.toLowerCase()});
            }

          ], function(err) {
    if (err) return next(err);
    res.redirect('/forgotpassword');
  });
});

router.get('/reset/:token/:email', function(req, res, next) {
 User.findOne({'email': req.params.email,resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
 if (!user) {
      req.flash('forgotpasswordMessage', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgotpassword');
    }
res.render('forgotpasswordEmailForm', { title: 'Reset Password',user : req.user,message: req.flash('resetpasswordMessage')});
});

});


router.post('/reset/:token/:email', function(req, res, next) {
async.waterfall([
  function(done) {
User.findOne({'email': req.params.email,resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
 if (!user) {
      req.flash('forgotpasswordMessage', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgotpassword');
    }
    if(req.body.password !== req.body.password2){
      req.flash('resetpasswordMessage', 'Passwords don\'t match. Please re enter.');
      res.render('forgotpasswordEmailForm', { title: 'Reset Password',user : req.user,message: req.flash('resetpasswordMessage')});
    }
    if(user.validPassword(req.body.password)){
      req.flash('resetpasswordMessage', 'please don\'t use an existing password. Please enter new password.');
      res.render('forgotpasswordEmailForm', { title: 'Reset Password',user : req.user,message: req.flash('resetpasswordMessage')});
    }else{
        user.password = user.generateHash(req.body.password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.active = true; 
         user.save(function(err) {
            done(err, user);
      });
    }
  });
},
 function(user, done) {
emailhtml.sendEmail('passwordchange',user.firstname,user.lastname,user.email,user._id); 
res.render('passwordResetConfirm', { title: 'Password Reset Confirmation',user:req.params.email});
}
], function(err) {
    res.redirect('/');
  });
});


module.exports = router;
