var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {DBHOST,DBPORT,DBNAME}=require('./config/config')


var indexRouter = require('./routes/web/index');
var apiRouter = require('./routes/api/account');
var regRouter = require('./routes/web/reg');
var authAPIRouter = require('./routes/api/auth');

const session=require('express-session')
const MongoStore=require('connect-mongo')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name:'sid',
  secret:'xub',
  saveUninitialized:false,
  resave:true,
  store:MongoStore.create({
    mongoUrl:`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
  }),
  cookie:{
    httpOnly:true,
    maxAge:1000*60*60*24*7
  }
}))


app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/', regRouter);
app.use('/api', authAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404')
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
