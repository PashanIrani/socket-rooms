import { Member, Events, MessageData } from 'src/common';

declare global {
  interface Window { socketRooms: {socket: any, me: Member | null}; }
}

let roomResponseCallbacks: {[key: string]: Function} = {};

const setResponse = (roomId: string, responseCallback : Function) => {
  roomResponseCallbacks[roomId] = responseCallback;
}

const sendMessageToRoom = (roomId: string, message: any) => {
  let {socket, me} = window.socketRooms;

  if (me == null) {
    console.error('Something went wrong, current session has not be initialized properly.');
    return;
  }

  const md = new MessageData(me.id, message, roomId);
  socket.emit(Events.SEND_MESSAGE, md);
}

const joinRoom = (roomId: string, responseCallback : Function | undefined) => {
  let {socket, me} = window.socketRooms;

  // Emit join room event
  socket.emit(Events.JOIN_ROOM, {roomId, member: me});

  // get ready to listen to specific room
  socket.on(Events.LISTEN_FOR_MESSAGES, (data: MessageData) => { 
    if(me?.id == data.from) return;

    // Check if responseCallback was set using function. .setResponse(roomId, () => {}) defined callbacks should always run.
    if (roomId in roomResponseCallbacks) {
      responseCallback = roomResponseCallbacks[roomId];
    } 
    
    // run calllback if defined, otherwise throw eroor
    if (responseCallback) {
      responseCallback(data);
    } else {
      console.error('Response callback not provided.');
    }
  });
}

const init = (userProvidedSocket: any) => {
  window.socketRooms = {socket: null, me: null};
  let {socket, me} = window.socketRooms;

  // resolve promise once connected 
  const promise = new Promise((res, _) => {
    if (socket !== null && me !== null) {
      res('Already Connected');
      return;
    }

    userProvidedSocket.on('connect', () => {
      window.socketRooms = {socket: userProvidedSocket, me: new Member(userProvidedSocket.id)};
      res('Connected');
    });
  });

  return promise;
}

export default {init, joinRoom, sendMessageToRoom, setResponse};