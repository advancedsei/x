var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var conn = mongoose.connection;
var fs = require('fs');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;  

var User  = require('../models/user');
var Application  = require('../models/applications');

/* GET users listing. */
router.get('/', [isLoggedIn], function(req, res, next) {
User.find({},'email firstname lastname created_at -_id' ,function(err, users) {
            if (err)
            	res.send(err);
            res.json(users);
        }); 
});

/* GET users listing. */
router.get('/users/byday', [isLoggedIn], function(req, res, next) {

User.aggregate([
 { $group : {
        _id: {
            year : { $year : "$created_at" },        
            month : { $month : "$created_at" },        
            day : { $dayOfMonth : "$created_at"}},users: {$push: {email:'$email',firstname:'$firstname',lastname:'$lastname',created_at:'$created_at'}}
        }},
	{$project: {date: '$_id', users: 1, _id: 0}}
	], function (err, result) {
		if (err)
            	res.send(err);
            res.json(result);
		});
});


/* GET new applications listing. */
router.get('/applications/new', [isLoggedIn], function(req, res, next) {
Application.find({'state':'SUBMITTED'}, function(err, applications) {
               if (err)
                res.send(err);
                    res.json(applications);
           });
});

/* GET accepted applications listing. */
router.get('/applications/accepted', [isLoggedIn], function(req, res, next) {
Application.find({'state':'ACCEPTED'}, function(err, applications) {
               if (err)
                res.send(err);
                    res.json(applications);
           });
});

/* GET rejected applications listing. */
router.get('/applications/rejected', [isLoggedIn], function(req, res, next) {
Application.find({'state':'REJECTED'}, function(err, applications) {
               if (err)
                res.send(err);
                    res.json(applications);
           });
});

/* GET download resume. */
router.get('/applications/resume/:fileid', [isLoggedIn], function(req, res, next) {
    var gfs = Grid(conn.db);
     var readstream = gfs.createReadStream({
        _id: req.params.fileid
      });

     req.on('error', function(err) {
        res.send(500, err);
      });

      readstream.on('error', function (err) {
        res.send(500, err);
      });

      readstream.pipe(res);
});

/* GET accept application listing. */
router.post('/application/accept', [isLoggedIn], function(req, res, next) {
 Application.findOneAndUpdate({ '_id' :  req.body._id}, { state: "ACCEPTED" }, function(err, application) {
 if (!application){res.redirect('/error');}
 });
});

/* GET rejected applications listing. */
router.post('/application/reject', [isLoggedIn], function(req, res, next) {
Application.findOneAndUpdate({ '_id' :  req.body._id}, { state: "REJECTED" }, function(err, application) {
 if (!application){res.redirect('/error');}
 });
});

































// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
    			if(req.user.email  == 'vkethineni@gmail.com')
    				return next();
    				res.redirect('/error');
	}else{
		 res.redirect('/login');
	}
}


module.exports = router;
