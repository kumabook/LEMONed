const passport = require('passport');
const Router   = require('express').Router;

const router = Router();
router.get('/', (req, res) => {
  res.render('login');
});
router.post('/', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/login',
}));


module.exports = router;
