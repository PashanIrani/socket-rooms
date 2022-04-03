import Events from 'src/common/Events';
import {Member} from 'src/common/Member';

let Socket : any = null;
let me : Member | null = null;

const joinRoom = (roomId: string) => {
  Socket.emit(Events.JOIN_ROOM, {roomId, member: me});
}

const init = (socket: any) => {
  // resolve promise once connected 
  const promise = new Promise((res, _) => {
    if (Socket !== null && me !== null) {
      res('Already Connected');
      return;
    }

    socket.on('connect', () => {
      Socket = socket; // to use globably in this script
      me = new Member(Socket.id);
      res('Connected');
    })
  });

  return promise;
}

export default {init, joinRoom};