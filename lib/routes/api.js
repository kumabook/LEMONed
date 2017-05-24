const Router = require('express').Router;
const tracks = require('../controller/tracks');
const artists = require('../controller/artists');

const router = Router();

router.route('/tracks')
  .get(tracks.index)
  .post(tracks.create);
router.route('/tracks/:trackId')
  .get(tracks.get)
  .post(tracks.update)
  .delete(tracks.delete);

router.route('/artists')
  .get(artists.index)
  .post(artists.create);
router.route('/artists/:artistId')
  .get(artists.get)
  .post(artists.update)
  .delete(artists.delete);

module.exports = router;
