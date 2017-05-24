const Artist = require('../model/artist');

module.exports = {
  index: (req, res) => {
    const page    = parseInt(req.query.page, 10) || 0;
    const perPage = parseInt(req.query.per_page, 10) || 10;
    Promise.all([
      Artist.findAll({ offset: page * perPage, limit: perPage }),
      Artist.count(),
    ]).then(([items, total]) => {
      res.json({ total, items });
    });
  },
  get: (req, res) => {
    res.json({ message: 'ok' });
  },
  create: (req, res) => {
    Artist.create(req.body.params)
      .then(artist => res.json(artist))
      .catch(e => res.status(400)
                     .json({ message: e.message }));
  },
  update: (req, res) => {
    Artist.findById(req.params.artistId)
      .then(artist => artist.update(req.body.params))
      .then(artist => res.json(artist))
      .catch(e => res.status(400)
                     .json({ message: e.message }));
  },
  delete: (req, res) => {
    Artist.findById(req.params.artistId)
      .then(artist => artist.destroy())
      .then(() => res.json({ message: 'ok' }));
  },
};
