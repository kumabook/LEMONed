const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Track = sequelize.define('track', {
  identifier: {
    type:   Sequelize.STRING,
    unique: true,
  },
  ownerId:       Sequelize.STRING,
  ownerName:     Sequelize.STRING,
  url:           Sequelize.STRING,
  title:         Sequelize.STRING,
  description:   Sequelize.STRING,
  thumbnail_url: Sequelize.STRING,
  artwork_url:   Sequelize.STRING,
  audio_url:     Sequelize.STRING,
  duration:      Sequelize.INTEGER,
  published_at:  Sequelize.DATE,
  created_at:    Sequelize.DATE,
  updated_at:    Sequelize.DATE,
});

module.exports = Track;
