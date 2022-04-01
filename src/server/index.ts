import {Room} from 'src/common/Room';

let rooms : {[key: string]: any}= {};

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



export default {createRoom};