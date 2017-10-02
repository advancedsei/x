var express = require('express');
var router = express.Router();
var Hit  = require('../models/hits');

router.post('/', function(req, res, next) {
var newHit = new Hit();
					newHit.as = req.body.as;
                    newHit.city= req.body.city;
                    newHit.country= req.body.country;
                    newHit.countryCode= req.body.countryCode;
                    newHit.isp= req.body.isp;
                    newHit.lat= req.body.lat;
                    newHit.lon= req.body.lon;
                    newHit.org= req.body.org;
                    newHit.query= req.body.query;
                   newHit.region= req.body.region;
                    newHit.regionName= req.body.regionName;
                    newHit.timezone= req.body.timezone;
                    newHit.zip= req.body.zip;
 newHit.save(function(err) {
        if (err)
           console.log(err);
    });
});
module.exports = router;
