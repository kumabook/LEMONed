const Router = require('express').Router;
const tracks = require('../controller/tracks');
const artists = require('../controller/artists');

const router = Router();

function requireLogin(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthroized' });
  }
}

router.route('/tracks')
  .get(tracks.index)
  .post(tracks.create);
router.route('/tracks/:trackId')
  .get(tracks.get)
  .post(requireLogin, tracks.update)
  .delete(requireLogin, tracks.delete);

router.route('/artists')
  .get(artists.index)
  .post(requireLogin, artists.create);
router.route('/artists/:artistId')
  .get(artists.get)
  .post(requireLogin, artists.update)
  .delete(requireLogin, artists.delete);

module.exports = router;
