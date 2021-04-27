const express = require('express');
const config = require('./config');
const app = express();

// use standardFirmata

// Development only
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static('dist')); // Set 'dist' folder as static assets folder
}

const server = app.listen(config.port, function() {
  let port = config.port;
  console.log('Socket server listening at: ' + port);
});

const io = require('socket.io')(server);

io.of('/arduino').on('connection', (socket) => {

  console.log('New connection: ' + socket.id);

  socket.on('led1:on', function() {
    socket.broadcast.emit('led1:on');
    console.log('Broadcasting: led1:on');
  });
  socket.on('led2:on', function() {
    socket.broadcast.emit('led2:on');
    console.log('Broadcasting: led2:on');
  });
  socket.on('led1:off', function() {
    socket.broadcast.emit('led1:off');
    console.log('Broadcasting: led1:off');
  });
  socket.on('led2:off', function() {
    socket.broadcast.emit('led2:off');
    console.log('Broadcasting: led2:off');
  });
  socket.on('btn01', (data)=>{
    console.log('ok')
    socket.broadcast.emit('btn01');
  })
  socket.on('btn02', (data)=>{
    socket.broadcast.emit('btn02');
  })

});
