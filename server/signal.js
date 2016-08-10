const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);

var rooms = {};
io.on('connection', function(socket) {
  socket.on('join', function(room) {
    console.log('joining room', room);
    var numberOfClients = io.of('/').in(room).clients.length;
    console.log('number', numberOfClients);
    //var numberOfClients = 1;
    if (numberOfClients >= 4) {
      socket.emit('full', room);
    } else {
      socket.join(room);
      rooms[room] = rooms[room] || [];
      rooms[room].push(socket.id.slice(2));
      //io.in(room).emit('new.peer', rooms[room]);
      io.to(room).emit('new.peer', rooms[room]);
    }
  });
    
  socket.on('offer', function(offer) {
    socket.broadcast.emit('offer', offer);
  })
    
  socket.on('answer', function(data) {
    socket.broadcast.emit('answer', data);
  });
});

app.use(express.static(path.resolve(__dirname, '..', 'client/public')));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'client/public/index.html'));
});

server.listen(3000, function() {
  console.log('Listening');
});

