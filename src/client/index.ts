import Events from 'src/common/Events';
import {Member} from 'src/common/Member';

declare global {
  interface Window { socketRooms: {socket: any, me: Member | null}; }
}

const sendMessageToRoom = (roomId: string, message: any) => {
  let {socket, me} = window.socketRooms;
  if (me == null) {
    console.error('Something went wrong, current session has not be initialized properly.');
    return;
  }
  socket.emit(Events.SEND_MESSAGE, {roomId, message, from: me.id})
}

const joinRoom = (roomId: string) => {
  let {socket, me} = window.socketRooms;

  socket.emit(Events.JOIN_ROOM, {roomId, member: me});

  socket.on(Events.listen(roomId), (data:any) => { // TODO: give ability to user to pass a callback, and only call that callback for users which are recievers and not the sender
    console.log('recieved:');
    console.log(data);
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

export default {init, joinRoom, sendMessageToRoom};