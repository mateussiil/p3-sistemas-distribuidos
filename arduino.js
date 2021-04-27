const io = require('socket.io-client');
const five = require('johnny-five');
const config = require('./config');

// Connect to the socket server
const socket = io.connect(config.url);

const board = new five.Board();
board.on('ready', function() {
  const led1 = new five.Led(13); // Set pin 13 for LED
  const led2 = new five.Led(12); // Set pin 13 for LED
  const button1 = new five.Button(10);
  const button2 = new five.Button(9);

  // Turn LED on when event led:on is received
  
  socket.on('led1:on', function(){
    // led.blink(500);
    led1.on();
  });

  button1.on("up", function() {
    socket.emit('btn01', 'on');
  });

  button2.on("up", function() {
    socket.emit('btn02', 'on');
  });

  socket.on('led2:on', function(){
    // led.blink(500);
    led2.on();
  });

  // Turn LED off when event led:off is received
  socket.on('led1:off', function(){
    led1.off();
  });
  socket.on('led2:off', function(){
    led2.off();
  });

});
