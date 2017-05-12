import axios from 'axios';

export default {
  index: (page: number, perPage: number) => axios.get(`/v1/tracks`, {
    params: {
      page: page,
      per_page: perPage,
    },
  }).then(response => response.data),
};
