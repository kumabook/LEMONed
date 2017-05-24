import axios from 'axios';

export default {
  index: (page, perPage) => axios.get('/v1/tracks', {
    params: {
      page,
      per_page: perPage,
    },
  }).then(response => response.data),
  get:    id => axios.get(`/v1/tracks/${id}`),
  create: track => axios.post('/v1/tracks', {
    params: track,
  }),
  update: track => axios.post(`/v1/tracks/${track.id}`, {
    params: track,
  }),
  destroy: track => axios.delete(`/v1/tracks/${track.id}`),
};
