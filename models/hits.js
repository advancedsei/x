
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var hitSchema = new Schema({
                    as:String,
                    city:String,
                    country:String,
                    countryCode:String,
                    isp:String,
                    lat:Number,
                    lon:Number,
                    org:String,
                    query:String,
                    region:String,
                    regionName:String,
                    timezone:String,
                    zip:String,
                    created_at: Date
                  });

// on every save, add the date
hitSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
    this.created_at = currentDate;
  next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Hit', hitSchema);
