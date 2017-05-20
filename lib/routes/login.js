const passport = require('passport');
const Router   = require('express').Router;

const router = Router();
router.get('/', (req, res) => {
  res.render('login', {
    title:      'Login',
    message:    req.flash(),
    isLoggedIn: req.isAuthenticated(),
  });
});
router.post('/', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash:    true,
}));


module.exports = router;
