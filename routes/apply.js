var express = require('express');
var router = express.Router();
var multer  = require('multer');
var dirname = require('path').dirname(__dirname);
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var conn = mongoose.connection;
var fs = require('fs');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;  
var emailhtml = require('../email/emailhtml');

var Application  = require('../models/applications'); 

 router.get('/', [isLoggedIn], function(req, res, next) {
      Application.findOne({ 'account' :  req.user.email,'state':'SUBMITTED'}, function(err, application) {
               if (application) {
                res.render('alreadyapplied', { user : req.user , title: 'Advanced Sofware Engineering Institute' });
                }else{
                  res.render('application', { user : req.user , title: 'Advanced Sofware Engineering Institute' });
                }
           });
    });

 router.post('/', [isLoggedIn],multer({ dest: './uploads/'}).single('resume'), function(req, res, next) {
    var gfs = Grid(conn.db);
    var writestream = gfs.createWriteStream({
        filename: req.file.originalname,
        mimetype  :req.file.mimetype
    });
    fs.createReadStream(dirname + '/' + req.file.path).pipe(writestream);
    writestream.on('close', function (file) {
        var application = new Application();
          application.program = req.body.program;
          application.fname = req.body.fname;
          application.lname = req.body.lname;
          application.email = req.body.email;
          application.phone = req.body.phone;
          application.address = req.body.address;
          application.city = req.body.city;
          application.zipcode = req.body.zipcode;
          application.school = req.body.school;
          application.degree = req.body.degree;
          application.gpa = req.body.gpa;
          application.major = req.body.major;
          application.graddate = req.body.graddate;
          application.aboutyou = req.body.aboutyou;
          application.resumeId = file._id;
          application.state = 'SUBMITTED';
          application.account = req.user.email ;
          application.save(function(err) {
        if (err)
           console.log(err);
        });
          fs.unlinkSync(dirname + '/' + req.file.path);
          emailhtml.sendEmail('applicationsubmittedemail',req.body.fname,req.body.lname,req.user.email,req.user.resetPasswordToken); 
  });
        res.render('applied', { user : req.user , title: 'Advanced Sofware Engineering Institute' });
    });

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports = router;
