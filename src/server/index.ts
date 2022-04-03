import {Room} from 'src/common/Room';
import Events from 'src/common/Events';
import { Member } from 'src/common/Member';

let rooms : {[key: string]: Room}= {};
let members : {[key: string]: Member} = {};
let socketRoomService : any;

function logState() {
  console.log(rooms);
  console.log(members);
}

const createRoom = (roomId : string, capacity: number)  => {
  // check if room with id of roomId doesn't already exist
  if (roomId in rooms) {
    console.error(`Room ${roomId} already exists.`);
    return;
  }

  const newRoom = new Room(roomId, capacity);

  // add new room
  rooms[roomId] = newRoom;
  console.debug(`✨ Room ${roomId} Created.`)
}

// Add Member to a Room
const joinRoom = (data: any, socket: any) => {
  console.log(data);
  
  let {member, roomId} = data;
  if (!rooms.hasOwnProperty(roomId)) return; // If room doesn't exist, return. TODO: implement a way to fail

  
  socket.join(data.roomId); // Join room

  member.rooms.push(rooms[data.roomId]);

  members[member.id] = member;
  rooms[data.roomId].addMember(data.member); // Track number of active members in room

  console.debug(`🟢 ${socket.id} joined Room [RoomId: ${roomId}]`);
  logState();
}

const sendMessageHandler = (data: any) => {
  let {roomId, message} = data;
  
  socketRoomService.to(roomId).emit(Events.listen(roomId), message);
}

// Update Rooms when a member leaves
const disconnectCallback = (socket: any) => {
  if (members[socket.id] == undefined) {
    console.error("Member doesn't exist.");
    return;
  }

  members[socket.id].rooms.forEach((room : Room) => {
    room.removeMember(socket.id);
  })
  
  delete members[socket.id];

  console.debug(`❌ ${socket.id} disconnected `);
  logState();
}

// Handle Socket events
const socketBehavior = (socket: any) => {
  socket.on(Events.JOIN_ROOM, (data: any) => joinRoom(data, socket));
  socket.on(Events.SEND_MESSAGE, (data: any) => sendMessageHandler(data));
  socket.on('disconnecting', () => disconnectCallback(socket));
}

// Initialize
const init = (Server: any) => {
  socketRoomService = Server;
  socketRoomService.on('connection', socketBehavior);
}

export default {init, createRoom};