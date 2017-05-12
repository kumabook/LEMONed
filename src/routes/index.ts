import { Router } from 'express';

const index: Router = Router();

index.get('/', function(req, res, next) {
  res.render('index', { title: 'LEMONed' });
});

export default index;
