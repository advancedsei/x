var express = require('express');
var router = express.Router();

/* GET thank you page. */
router.get('/', function(req, res, next) {
	var email;
	if(req.user){email = req.user.email;}
	req.logout();
  res.render('thankyou', { title: 'Thank you for Registration' ,user : email});
});

module.exports = router;
