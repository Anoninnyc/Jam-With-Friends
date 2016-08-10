var SimplePeer = require('simple-peer');

var io = require('socket.io-client');
var socket = io();

var peerConnections = {};

const options = { config: { iceServers: [{ url: 'stun.l.google.com:19302' }] }, trickle: true };

// someone has joined the room
socket.on('new.peer', function(sockets) {
  var length = sockets.length;
  var initiatorId = sockets[length - 1];
  if (length > 1) {
    // this client will act as initiator for the new connections
    if (initiatorId === socket.id) {
      //peerConnections = {};
      startConnection(sockets, 0);
    // client will act as remote waiting for initiator's offer
    } else {
      receiveConnection(initiatorId);
    }
  }
});

socket.on('answer', function(data) {
  if (data.to === socket.id) {
    var connection = peerConnections[data.by];
    if (!connection.connected) {
      connection.peer.signal(data.answer);
      connection.connected = true;
    }
  }
});

socket.on('full', function() {
  console.log('room is full');
});

// join a room
var room = 'test';
socket.emit('join', room);

// set up connection as initiator
function startConnection(sockets, number) {
  var peer = new SimplePeer(Object.assign({}, {initiator: true}));
  peerConnections[sockets[number]] = { peer: peer, connected: false, by: socket.id, to: sockets[number] };

  peer.on('signal', function(data) {
    socket.emit('offer', { offer: data, by: socket.id, to: sockets[number] });
  });

  peer.on('connect', function() {
    peer.send('initiator ' + socket.id + ' saying hello');

    // check if we need to make more connections
    if (number < sockets.length - 1) {
      startConnection(sockets, number + 1);
    }
  });

  peer.on('data', function(data) {
    console.log('initiator received message: ' + data);
  });
}

// act as remote
function receiveConnection(initiatorId) {
  var peer = new SimplePeer(Object.assign({}, {initiator: false}));
  peerConnections[initiatorId] = { peer: peer, connected: false, by: initiatorId, to: socket.id };
  peer.on('signal', function(data) {
    socket.emit('answer', { answer: data, by: socket.id, to: initiatorId });
  });

  socket.on('offer', function(data) {
    if (data.to === socket.id) {
      peer.signal(data.offer);
    }
  });

  peer.on('connect', function() {
    peerConnections[initiatorId].connected = true;
    peer.send('i am ' + socket.id + ' saying hello');
  });

  peer.on('data', function(data) {
    console.log('received message: ' + data);
  });
}

