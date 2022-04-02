import Events from 'src/common/Events';

let Socket : any = null;

const joinRoom = (roomId: string) => {
  Socket.emit(Events.JOIN_ROOM, roomId);
}

const init = (socket: any) => {
  
  const promise = new Promise((res, _) => {
    if (Socket !== null) {
      res('Already Connected');
      return;
    }

    socket.on('connect', () => {
      Socket = socket; // to use globably in this script
      res('Connected');
    })
  });

  return promise;
}

export default {init, joinRoom};