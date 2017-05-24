const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Artist = sequelize.define('artist', {
  name:         { type: Sequelize.STRING, unique: 'compositeIndex', allowNull: false },
  url:          Sequelize.STRING,
  thumbnailUrl: Sequelize.STRING,
  artworkUrl:   Sequelize.STRING,
});

module.exports = Artist;
