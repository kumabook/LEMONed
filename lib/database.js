const Sequelize = require('sequelize');
const User      = require('./model/user');
const Artist    = require('./model/artist');
const Track     = require('./model/track');

const sequelize = new Sequelize(process.env.DATABASE_URL);
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

User.sync().then(() => {
  console.log('Sync user table');
  const email = 'admin@example.com';
  User.findOne({
    where: { email },
  }).then((user) => {
    if (!user) {
      User.create({
        email,
        password: 'password',
      });
    }
  });
});
Artist.sync().then(() => {
  console.log('Sync album table');
  Track.sync().then(() => {
    console.log('Sync track table');
  });
});
