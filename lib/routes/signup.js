const basicAuth = require('basic-auth-connect');
const passport  = require('passport');
const Router    = require('express').Router;

const router = Router();
const username = process.env.BASIC_AUTH_USERNAME || 'USERNAME';
const password = process.env.BASIC_AUTH_PASSWORD || 'PASSWORD';
router.use(basicAuth(username, password));
router.get('/', (req, res) => {
  res.render('signup', {
    title:      'Sign up',
    message:    req.flash(),
    isLoggedIn: false,
  });
});
router.post('/', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash:    true,
}));

module.exports = router;
