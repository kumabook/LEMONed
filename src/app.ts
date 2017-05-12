import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import index from './routes/index';

const app: express.Express = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', index);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((error: any, req, res, next) => {
    res.status(error['status'] || 500);
    res.render('error', {
      message: error.message,
      error
    });
  });
}

app.use((error: any, req, res, next) => {
  res.status(error['status'] || 500);
  res.render('error', {
    message: error.message,
    error: {}
  });
  return null;
});

export default app;
