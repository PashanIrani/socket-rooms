import {Room} from 'src/common/Room';
import Events from 'src/common/Events';

let rooms : {[key: string]: Room}= {};

const createRoom = (roomId : string, capacity: number)  => {
  // check if room with id of roomId doesn't already exist
  if (roomId in rooms) {
    console.error(`Room ${roomId} already exists.`);
    return;
  }

  const newRoom = new Room(roomId, capacity);

  // add new room
  rooms[roomId] = newRoom;
}

// Add Member to a Room
const joinRoom = (roomId: string, socket: any) => {
  if (!rooms.hasOwnProperty(roomId)) return; // If room doesn't exist, return. TODO: implement a way to fail

  console.debug(`${socket.id} joining... RoomId: ${roomId}`);
  socket.join(roomId); // Join room

  rooms[roomId].incrementActiveMemberCount(); // Track number of active members in room
}

// Update Rooms when a member leaves
const disconnectCallback = (socket: any) => {
  console.debug(`${socket.id} disconnecting... `);

  socket.rooms.forEach((room: any) => { // TODO: implement 'members' to do a proper look up
      if (room === socket.id) return;

      rooms[room].decrementActiveMemberCount();

      // Delete Room if empty. TODO: possibily implement a Persistent Room feature?
      if (rooms[room].activeMemberCount == 0) {
          delete rooms[room];
      }
  });

}

// Handle Socket events
const socketBehavior = (socket: any) => {
  socket.on(Events.JOIN_ROOM, (roomId: string) => joinRoom(roomId, socket));
  socket.on('disconnecting', () => disconnectCallback(socket))
}

// Initialize
const init = (Server: any) => {
  const io = Server;
  io.on('connection', socketBehavior);
}

export default {init, createRoom};