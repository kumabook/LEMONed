const Sequelize = require('sequelize');
const Artist = require('./artist');

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Track = sequelize.define('track', {
  artistId: {
    type:       Sequelize.INTEGER,
    references: {
      model:      Artist,
      key:        'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  url:          Sequelize.STRING,
  title:        Sequelize.STRING,
  description:  Sequelize.STRING,
  thumbnailUrl: Sequelize.STRING,
  artworkUrl:   Sequelize.STRING,
  audioUrl:     Sequelize.STRING,
  duration:     Sequelize.INTEGER,
  publishedAt:  {
    type:         Sequelize.DATE,
    allowNull:    false,
    defaultValue: Sequelize.literal('NOW()'),
  },
});

Track.belongsTo(Artist);

module.exports = Track;
