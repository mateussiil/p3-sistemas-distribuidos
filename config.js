const development = {
  host: 'http://localhost',
  namespace: 'arduino',
  port: 3333
};

const production = {
  host: 'https://arduino-nodejs-websocket.herokuapp.com/',
  namespace: 'arduino',
  port: process.env.PORT | 3333
};

const config = process.env.NODE_ENV === 'development' ? development : production;
const port = config.port ? ':' + config.port : '';
const namespace = config.namespace ? config.namespace : '';
const url = config.host + port + '/' + namespace;
console.log('url',url)
config.url = url;

module.exports = config;
