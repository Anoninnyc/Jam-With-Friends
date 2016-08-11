const SimplePeer = require('simple-peer');

const io = require('socket.io-client');

function makePeerConnections(cb) {
  const socket = io();

  const peerConnections = {};

  // const options = { config: { iceServers: [{ url: 'stun.l.google.com:19302' }] }, trickle: true };
  const options = { trickle: true };
  // someone has joined the room
  socket.on('new.peer', sockets => {
    const length = sockets.length;
    const initiatorId = sockets[length - 1];
    if (length > 1) {
      // this client will act as initiator for the new connections
      if (initiatorId === socket.id) {
        // peerConnections = {};
        startConnection(sockets, 0);
      // client will act as remote waiting for initiator's offer
      } else {
        receiveConnection(initiatorId);
      }
    } else {
      cb();
    }
  });

  socket.on('full', () => {
    console.log('room is full');
  });

  // join a room
  const room = 'test';
  socket.emit('join', room);

  // set up connection as initiator
  function startConnection(sockets, number) {
    const peer = new SimplePeer(Object.assign(options, { initiator: true }));
    peerConnections[sockets[number]] = { peer, connected: false, by: socket.id, to: sockets[number] };

    peer.on('signal', data => {
      // prevent destroyed peers from sending signals, janky fix
      if (!peer.destroyed) {
        socket.emit('offer', { offer: data, by: socket.id, to: sockets[number] });
      }
    });

    socket.on('answer', data => {
      if (data.to === socket.id) {
        const connection = peerConnections[data.by];
        if (!connection.connected) {
          connection.peer.signal(data.answer);
          connection.connected = true;
        }
      }
    });

    peer.on('connect', () => {
      peer.send(`initiator ${socket.id} saying hello`);
      // check if need to make more connections
      if (number < sockets.length - 2) {
        startConnection(sockets, number + 1);
      } else {
        cb();
      }
    });

    peer.on('data', data => {
      console.log(`initiator received message: ${data}`);
    });

    peer.on('close', () => {
      // remove reference to peer
      const keys = Object.keys(peerConnections);
      for (let i = 0; i < keys.length; i++) {
        if (peerConnections[keys[i]].peer === peer) {
          delete peerConnections[keys[i]];
        }
      }
    });
  }

  // act as remote
  function receiveConnection(initiatorId) {
    const peer = new SimplePeer(Object.assign(options, { initiator: false }));
    peerConnections[initiatorId] = { peer, connected: false, by: initiatorId, to: socket.id };
    peer.on('signal', data => {
      socket.emit('answer', { answer: data, by: socket.id, to: initiatorId });
    });

    socket.on('offer', data => {
      // prevent destroyed peer from signalling
      if (data.to === socket.id && !peer.destroyed) {
        peer.signal(data.offer);
      }
    });

    socket.on('answer', data => {
      if (data.to === socket.id) {
        const connection = peerConnections[data.by];
        if (!connection.connected) {
          connection.peer.signal(data.answer);
          connection.connected = true;
        }
      }
    });

    peer.on('connect', () => {
      peerConnections[initiatorId].connected = true;
      peer.send(`i am ${socket.id} saying hello`);
    });

    peer.on('data', data => {
      console.log(`received message: ${data}`);
    });

    peer.on('close', () => {
      // remove reference to peer
      const keys = Object.keys(peerConnections);
      for (let i = 0; i < keys.length; i++) {
        if (peerConnections[keys[i]].peer === peer) {
          delete peerConnections[keys[i]];
        }
      }
    });
  }
}

export default makePeerConnections;
