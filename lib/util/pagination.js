const defaultPerPage = 10;

module.exports = {
  getParams: (req) => {
    const page    = parseInt(req.query.page, 10) || 0;
    const perPage = parseInt(req.query.per_page, 10) || defaultPerPage;
    return { offset: page * perPage, limit: perPage };
  },
};
