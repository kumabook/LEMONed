import axios from 'axios';

export default {
  index: (page, perPage) => axios.get('/v1/artists', {
    params: {
      page,
      per_page: perPage,
    },
  }).then(response => response.data),
  get:    id => axios.get(`/v1/artists/${id}`),
  create: artist => axios.post('/v1/artists', {
    params: artist,
  }),
  update: artist => axios.post(`/v1/artists/${artist.id}`, {
    params: artist,
  }),
  destroy: artist => axios.delete(`/v1/artists/${artist.id}`),
};
