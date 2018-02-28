
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const hbs = require( 'express-handlebars' );


const index = require('./routes/index');
const users = require('./routes/users');
const questionPrompt = require('./routes/question-prompt');
const questionPage = require('./routes/question');
const aboutUs = require('./routes/aboutUs');
const loginRegister = require('./routes/loginRegister');
const userPage = require('./routes/userPage');

const app = express();

const questionRoutes = require('./routes/questions');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine( 'hbs', hbs( {	
    extname: 'hbs',	
    /*defaultLayout: 'index',	*/
    layoutsDir: __dirname + '/views',	
    partialsDir: __dirname + '/views/partials'
} ) );

app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-method-override')('_method'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  if (req.method === "OPTIONS"){
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      res.status(200).json({

      })
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/question-prompt', questionPrompt);
app.use('/questions', questionRoutes);
app.use('/question', questionPage);
app.use('/aboutus', aboutUs);
app.use('/login', loginRegister);
app.use('/userpage', userPage);

mongoose.connect("mongodb://soen341:soen341@soen341-shard-00-00-ruxjj.mongodb.net:27017,soen341-shard-00-01-ruxjj.mongodb.net:27017,soen341-shard-00-02-ruxjj.mongodb.net:27017/test?ssl=true&replicaSet=SOEN341-shard-0&authSource=admin");

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
      error:{
        message: err.message
      }
  })
});

module.exports = app;
