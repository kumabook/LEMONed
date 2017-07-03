const Router = require('express').Router;

const router = Router();

router.get('/', (req, res) => {
  res.render('index', {
    title:      'Home',
    message:    req.flash(),
    isLoggedIn: req.isAuthenticated(),
  });
});

module.exports = router;
