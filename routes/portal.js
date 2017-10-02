var express = require('express');
var router = express.Router();

 router.get('/', [isLoggedIn], function(req, res, next) {
        res.render('portal', { user : req.user , title: 'Advanced Sofware Engineering Institute' });
    });

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports = router;
