const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = sequelize.define('user', {
  email: {
    type:    Sequelize.STRING,
    unique:  true,
    notNull: true,
    isEmail: true,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
