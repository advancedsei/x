var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader("Cache-Control", "public, max-age=2592000");
  res.render('index');
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about');
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact');
});


/* GET careers page. */
router.get('/careers', function(req, res, next) {
  res.render('careers');
});

/* GET services page. */
router.get('/services', function(req, res, next) {
  res.render('services');
});







module.exports = router;
