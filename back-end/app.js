var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const helmet = require('helmet');

require('dotenv').config();

var app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));

const session = require('express-session');
const passport = require('passport');
require('./passport/index.js');

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET_COOKIE,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());


var coffeeRoutes = require('./coffee/routes.js');
var questionRoutes = require('./question/routes.js');
var recommendationsRoutes = require('./recommendations/routes.js');
var cafeRoutes = require('./cafe/routes.js');
var adminRoutes = require('./admin/routes.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(helmet());



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/coffee', coffeeRoutes);
app.use('/question', questionRoutes);
app.use('/recommendations', recommendationsRoutes);
app.use('/cafe', cafeRoutes);
app.use('/admin', adminRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
