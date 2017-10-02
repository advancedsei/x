var express = require('express');
var router = express.Router();
// load up the user model
var User  = require('../models/user');

/* GET registration page. */
router.get('/', function(req, res, next) {
User.findOneAndUpdate({ 'email' :  req.query.email ,'_id':req.query.token_id}, { active: true }, function(err, user) {
if (!user){res.redirect('/error');}
var user = req.query.email ;
   req.logout();
		res.render('confirm', { title: 'Activation Confirmation',user:user});
	});
});

module.exports = router;
