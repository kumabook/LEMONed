const Router = require('express').Router;

const router = Router();
router.get('/', (req, res) => {
  res.render('signup');
});

module.exports = router;
