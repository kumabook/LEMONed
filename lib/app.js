const express       = require('express');
const logger        = require('morgan');
const bodyParser    = require('body-parser');
const path          = require('path');
const api           = require('./routes/api');
const index         = require('./routes/index');
const signup        = require('./routes/signup');
const login         = require('./routes/login');
const logout        = require('./routes/logout');
const s3router      = require('react-s3-uploader/s3router');
const passport      = require('passport');
const flash         = require('connect-flash');
const session       = require('express-session');
const localStrategy = require('./local_strategy');
const User          = require('./model/user');

passport.use('local-signup', localStrategy.signup);
passport.use('local-signin', localStrategy.signin);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
}

const app = express();

app.use(session({
  secret:            process.env.SECRET_KEY,
  resave:            true,
  saveUninitialized: true,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/s3', s3router({
  bucket:           process.env.BUCKET || 'LEMONed',
  region:           process.env.REGION || 'us-east-1',
  signatureVersion: 'v4',
  headers:          { 'Access-Control-Allow-Origin': '*' },
  ACL:              'private',
  uniquePrefix:     true,
}));
app.use('/v1/', api);
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/*', isLoggedIn, index);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((error, req, res) => {
    res.status(error.status || 500);
    res.render('error', {
      message: error.message,
      error,
    });
  });
}

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.render('error', {
    message: error.message,
    error:   {},
  });
  return null;
});

module.exports = app;
