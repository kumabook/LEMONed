require('dotenv').config();
const server = require('./lib/server');
const db     = require('./lib/database');

const port = process.env.PORT || '4000';
server.start(port);
