const express    = require('express');
const logger     = require('morgan');
const bodyParser = require('body-parser');
const path       = require('path');
const index      = require('./routes/index');
const s3router   = require('react-s3-uploader/s3router');
const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/s3', s3router({
  bucket:           process.env.BUCKET || 'LEMONed',
  region:           'us-east-1',
  signatureVersion: 'v4',
  headers:          { 'Access-Control-Allow-Origin': '*' },
  ACL:              'private',
  uniquePrefix:     true,
}));
app.use('/*', index);

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
