// const fs           = require('fs'),
//       contentTypes = require('./utils/content-types'),
//       sysInfo      = require('./utils/sys-info'),
const     env          = process.env;
var compression = require('compression');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var flash = require('connect-flash');
//  var methodOverride = require('method-override'),
//       session = require('express-session'),
//       passport = require('passport');
// var MongoStore = require('connect-mongo')(session);
// var mongoose = require('mongoose');
// var async = require('async');
// var crypto = require('crypto');
// var config = require('./config/config'); // get our config file

// require('./config/passport')(passport); // pass passport for configuration


var index = require('./routes/index');
// var api = require('./routes/api');
// var login = require('./routes/login');
// var register = require('./routes/register');
// var thankyou = require('./routes/thankyou');
// var confirm = require('./routes/confirm');
// var portal = require('./routes/portal');
// var logout = require('./routes/logout');
// var activate = require('./routes/activate');
// var forgotpassword = require('./routes/forgotpassword');
// var privacypolicy = require('./routes/privacypolicy');
// var termsofservice = require('./routes/termsofservice');
// var aseimail = require('./routes/aseimail');
// var hit = require('./routes/hit');
// var onlineParttime = require('./routes/preGraduateOnline');
// var onlineFulltime = require('./routes/postGraduateOnline');
// var apply = require('./routes/apply');
// var applications = require('./routes/applications');
var app = express();
app.use(compression({ threshold: 0 }));
var server = require('http').createServer(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mongodb config
//mongoose.connect(config.database); // connect to database
// mongoose.connect(config.database,function(err) {
//     if (err)
//         return console.error(err);
// });

//app.set('apptoken', config.secret); // secret variable

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public'),{maxAge:864000000}));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(methodOverride('X-HTTP-Method-Override'));
// app.use(session({secret: config.secret, 
//       saveUninitialized: true, 
//                  resave: false,
//                  rolling: true,
//                  httpOnly: true,
//                   secureProxy: true,
//                   signed: true,
//                   store: new MongoStore({ mongooseConnection: mongoose.connection }),
//                  cookie: { maxAge: 60*60000}
//                }));
// app.use(flash()); // use connect-flash for flash messages stored in session
// app.use(passport.initialize());
// app.use(passport.session());


app.use('/', index);
// app.use('/api', api);
// app.use('/login', login);
// app.use('/register', register);
// app.use('/thankyou', thankyou);
// app.use('/confirm', confirm);
// app.use('/portal', portal);
// app.use('/logout', logout);
// app.use('/activate', activate);
// app.use('/forgotpassword', forgotpassword);
// app.use('/privacypolicy', privacypolicy);
// app.use('/termsofservice', termsofservice);
// app.use('/aseimail', aseimail);
// app.use('/api/hit', hit);
// app.use('/flexSoftwareEngineeringProgram', onlineParttime);
// app.use('/flexSep', onlineParttime);
// app.use('/immersiveSoftwareEngineeringProgram', onlineFulltime);
// app.use('/apply', apply);
// app.use('/applications',applications);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

server.listen(env.NODE_PORT || 3000, env.NODE_IP || '0.0.0.0', function () {
  console.log(`Application worker ${process.pid} started...`);
});

module.exports = app;
