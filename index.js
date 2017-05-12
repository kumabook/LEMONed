const server = require('./dist/server');

const port = process.env.PORT || '4000';
server.start(port);
