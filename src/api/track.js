import axios from 'axios';

export default {
  index: (page, perPage) => axios.get('/v1/tracks', {
    params: {
      page,
      per_page: perPage,
    },
  }).then(response => response.data),
};
