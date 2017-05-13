const server = require('./lib/server');

const port = process.env.PORT || '4000';
server.start(port);
