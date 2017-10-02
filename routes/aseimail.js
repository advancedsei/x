var express = require('express');
var router = express.Router();
var emailhtml = require('../email/emailhtml');
 router.get('/', [isLoggedIn], function(req, res, next) {
        res.render('aseimail', { user : req.user , title: 'Advanced Sofware Engineering Institute' ,message: req.flash('aseiMailMessage')});
    });


router.post('/', function(req, res, next) {
        
        console.log(req.body.templateType);
        console.log(req.body.name);
        console.log(req.body.emails);
        console.log(req.body.subject);
        console.log(req.body.message);

        var emails = req.body.emails.split(',');
          emails.push("vamsee.asei@gmail.com");// to make sure email goes
          for(var i=0, len=emails.length; i < len; i++){
            emailhtml.sendGenericEmail(req.body.templateType,req.body.subject,req.body.message,emails[i],req.body.name);
          }
        res.render('aseimail', { user : req.user , title: 'Advanced Sofware Engineering Institute',message: req.flash('aseiMailMessage') });
    });

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}


module.exports = router;
