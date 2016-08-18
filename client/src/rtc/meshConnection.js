const SimplePeer = require('simple-peer');
const EventEmitter = require('events').EventEmitter;
const io = require('socket.io-client');

const emitter = new EventEmitter();
const peers = {};

// peer connections options
const options = {
  trickle: true,
  config: {
    iceServers: [
      { url: "stun:stun.l.google.com:19302" },
      { url: "stun:stun1.l.google.com:19302" },
      { url: "stun:stun2.l.google.com:19302" },
      { url: "stun:stun3.l.google.com:19302" },
      { url: "stun:stun4.l.google.com:19302" },
    ]
  }
};

const socket = io();

export default function(room) {
  let selfId;

  socket.emit('join', room);

  // socket joined a room, start making connections
  socket.on('joined', sockets => {
    selfId = sockets.pop();
    // if first one in room, done
    if (sockets.length === 0) {
      emitter.emit('connected');
    } else {
      startConnection(sockets, 0, selfId);
    }
  });

  // new socket joined, receive the connection
  socket.on('new peer', () => {
    receiveConnection(selfId);
  });

  // another client is leaving, remove this connection from peers
  socket.on('remove connection', id => {
    delete peers[id];
  });

  return {
    // socket
    socket,
    // called when peer connections are established
    onReady: cb => {
      emitter.on('connected', cb);
    },

    // sends a message through data channel
    send: message => {
      each(peers, peer => { peer.send(message); });
    },

    // called when message is received through data channel
    onMessage: cb => {
      emitter.on('message', cb);
    },

    // called when this client is leaving, destroy and remove all connections
    close: () => {
      socket.emit('exit room', { room, id: selfId });
      each(peers, (peer, key) => {
        peer.destroy();
        delete peers[key];
      });
    }
  };
}

/* ------------ Helper functions ------------ */

function startConnection(sockets, number, selfId) {
  const peer = new SimplePeer(Object.assign(options, { initiator: true }));
  const remote = sockets[number];
  peer.on('signal', data => {
    socket.emit('offer', { offer: data, by: socket.id, to: remote });
  });

  socket.on('answer', data => {
    if (data.to === selfId && data.by === remote) {
      peer.signal(data.answer);
    }
  });

  peer.on('connect', () => {
    peers[remote] = peer;
    if (number < sockets.length - 1) {
      startConnection(sockets, ++number, selfId);
    } else {
      emitter.emit('connected');
    }
  });

  peer.on('data', message => {
    emitter.emit('message', message);
  });
}

function receiveConnection(selfId) {
  const peer = new SimplePeer(Object.assign(options, { initiator: false }));
  let remote;

  socket.on('offer', data => {
    if (data.to === selfId && !peer.connected && !peer.destroyed) {
      remote = data.by;
      peer.signal(data.offer);
    }
  });

  peer.on('signal', data => {
    socket.emit('answer', { answer: data, by: socket.id, to: remote });
  });

  peer.on('connect', () => {
    peers[remote] = peer;
  });

  peer.on('data', message => {
    emitter.emit('message', message);
  });
}

// each function for object
function each(obj, cb) {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    cb(obj[keys[i]], keys[i]);
  }
}
