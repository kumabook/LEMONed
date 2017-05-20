const Router = require('express').Router;

const router = Router();

router.get('/', (req, res) => {
  res.render('index', {
    title:      'LEMONed',
    message:    req.flash(),
    isLoggedIn: req.isAuthenticated(),
  });
});

module.exports = router;
