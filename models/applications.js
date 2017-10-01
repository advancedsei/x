
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var applicationSchema = new Schema({
                    program:String,
                    fname:String,
                    lname:String,
                    email:String,
                    phone:String,
                    address:String,
                    city:String,
                    zipcode:String,
                    school:String,
                    degree:String,
                    gpa:String,
                    major:String,
                    graddate:String,
                    aboutyou:String,
                    resumeId:String,
                    state:String,
                    account:String,
                    created_at: Date
                  });

applicationSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.created_at = currentDate;
  next();
});

module.exports = mongoose.model('Applications', applicationSchema);
