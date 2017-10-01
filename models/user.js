
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  created_at: Date,
  updated_at: Date,
  active:Boolean,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

// on every save, add the date
userSchema.pre('save', function(next) {

  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;
if(!this.active)
  this.active  = false;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR));
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// checking if account is active
userSchema.methods.accountActive = function() {
    return this.active;
};




// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
