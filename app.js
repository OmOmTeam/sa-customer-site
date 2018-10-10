// Dependencies
// External libraries
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Our own libraries
var session = require('./lib/session');

// Routes
var usersRouter = require('./routes/users');
var publicInfoRouter = require('./routes/public_info');

// Database
var db = require('./models');

// App initialization
var app = express();
app.db = db.sequelize;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware setuo
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session.middleware);
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
app.use('/', publicInfoRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).render('error', {
    'message': '404 Not Found',
    'error': {
      'status': 404,
      'stack': ''
    }
  });
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
