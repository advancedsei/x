var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('termsofservice', { title: 'Advanced Sofware Engineering Institute' ,user : req.user });
});

module.exports = router;
