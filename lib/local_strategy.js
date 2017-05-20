const bcrypt        = require('bcrypt-nodejs');
const User          = require('./model/user');
const passportLocal = require('passport-local');

function cryptHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
function isValidPassword(userpass, password) {
  return bcrypt.compareSync(password, userpass);
}
const LocalStrategy = passportLocal.Strategy;
const options = {
  usernameField:     'email',
  passwordField:     'password',
  passReqToCallback: true,
};

module.exports = {
  signup: new LocalStrategy(
    options,
    (req, email, password, done) => {
      if (req.body.password !== req.body.password_confirmation) {
        return done(null, false, {
          message: 'password mismatch',
        });
      }
      return User.findOne({ where: { email } }).then((user) => {
        if (user) {
          return done(null, false, {
            message: 'That email is already taken',
          });
        }
        const cryptedPassword = cryptHash(password);
        const data = {
          email,
          password: cryptedPassword,
        };
        return User.create(data).then((newUser) => {
          if (!newUser) {
            return done(null, false);
          }
          return done(null, newUser);
        });
      });
    }),
  signin: new LocalStrategy(
    options,
    (req, email, password, done) => {
      User.findOne({ where: { email } }).then((user) => {
        if (!user) {
          return done(null, false, {
            message: 'Email does not exist',
          });
        }
        if (!isValidPassword(user.password, password)) {
          return done(null, false, {
            message: 'Incorrect password',
          });
        }
        const userInfo = user.get();
        return done(null, userInfo);
      }).catch((err) => {
        console.log(`Error ${err}`);
        return done(null, false, {
          message: 'Something went wrong with your login',
        });
      });
    }),
};
