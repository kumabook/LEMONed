/// <reference path="./app.ts" />
import app from './app';
import * as debugModule from 'debug';
import * as http from 'http';

const debug = debugModule('node-express-typescript:server');

const port = '4000';

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges');
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(bind + ' is already in use');
    process.exit(1);
    break;
  default:
    throw error;
  }
}

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

module.exports = {
  start: (port) => {
    app.set('port', port);
    server.listen(port);
  }
}
