const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressNunjucks = require('express-nunjucks');
const methodOverride = require('method-override')



const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/node-blog');

//loads all models files
fs.readdirSync(__dirname + '/models').forEach((filename)=>{
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

const index = require('./routes/index');
const postsApi = require('./routes/api/posts');
const postsWeb = require('./routes/web/posts');

const app = express();
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');

//trocar no modo production
const njk = expressNunjucks(app, {
    watch: true,
    noCache: true
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'),{maxage: 2592000000}));

//allows to use http verbs
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use('/', index);

app.use('/api/posts', postsApi);
app.use('/posts', postsWeb);

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
  res.render('error');
});

module.exports = app;
