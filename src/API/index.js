import SocketIOClient from 'socket.io-client';

import {channels} from '../constants'
const url = 'http://192.168.31.242:3002';

let socket = SocketIOClient(url);
socket.on('connect', (a) => {
  console.log('connected', a);
});

export const getLocationData = cb => {
  socket.on(channels.LOCATION, function(data) {
    console.log('Received', data);
    cb(data);
  });
};

export default socket;
