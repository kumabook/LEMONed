const Router = require('express').Router;

const index = Router();

index.get('/', (req, res) => {
  res.render('index', { title: 'LEMONed' });
});

module.exports = index;
