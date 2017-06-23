const Track  = require('../model/track');
const Artist = require('../model/artist');
const pagination = require('../util/pagination');

const queryOptions = {
  include: [
    { model: Artist },
  ],
};

module.exports = {
  index: (req, res) => {
    const params = pagination.getParams(req);
    Promise.all([
      Track.findAll(Object.assign({}, params, queryOptions)),
      Track.count(),
    ]).then(([items, total]) => {
      res.json({ total, items });
    });
  },
  get: (req, res) => {
    Track.findById(req.params.trackId, queryOptions)
      .then((track) => {
        if (track) {
          res.json(track);
        } else {
          res.status(404).json({ message: 'not found' });
        }
      })
      .catch(e => res.status(400)
                     .json({ message: e.message }));
  },
  create: (req, res) => {
    Track.create(req.body.params)
      .then((track) => {
        if (!track.url) {
          return track.updateAttributes({
            url: `${req.protocol}://${req.headers.host}/v1/tracks/${track.id}`,
          });
        }
        return track;
      })
      .then(track => res.json(track))
      .catch(e => res.status(400)
                     .json({ message: e.message }));
  },
  update: (req, res) => {
    Track.findById(req.params.trackId)
      .then(track => track.update(req.body.params))
      .then(track => res.json(track))
      .catch(e => res.status(400)
                     .json({ message: e.message }));
  },
  delete: (req, res) => {
    Track.findById(req.params.trackId)
      .then(track => track.destroy())
      .then(() => res.json({ message: 'ok' }))
      .catch(e => res.status(400)
                     .json({ message: e.message }));
  },
};
