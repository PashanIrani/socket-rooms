# Socket-Rooms
A simple client and server side library to simplify handling rooms in socket.io.

## Planned Features 🔭
* Easily Join and Leave rooms.
* Room restrictions (Limited Room sizes, passwords)
* Broadcast messages within room
* and more...

## Usage

### Server Setup

1. Initialize socket.io server:
```
const { Server } = require("socket.io");
const io = new Server(/* Ensure the options here are set correct for socket.io work */);
```
View [socket.io docs](https://socket.io/docs/v4/server-initialization/#initialization) for socket.io server initialization.

2. Provide Socket-Rooms with initialized **socket.io** instace:
```
const { SocketRoomsServer } = require('socket-rooms');
SocketRoomsServer.init(io);
```

### Client Setup
1. Initialize socket.io:
```
import { io } from 'socket.io-client';
```

2. Initialize socket-rooms:

#### ES Modules
```
import { SocketRoomsClient } from 'socket-rooms';

SocketRoomsClient.init(io()).then(() => {
  // Can now perform socket-rooms functions
});
```

#### `<script>` import
```
<script src="/socket-rooms/Client.js"></script>
```
```
SocketRoomsClient.init(io()).then(() => {
  // Can now perform socket-rooms functions
});
```

## Server Methods

Usage: `SocketRoomsServer.<methodName>()`

### **.init(socket_IO_Instance)**
Initializes Socket-Rooms for server

**socket_IO_Instance** `object` : a socket.io instance, see **Server Setup** part of this doc.


### **.createRoom(roomId, capacity)**
Creates a room with a user provided ID.

**roomId** `string` : an ID for the room

**capacity** `number`: max capacity for the room (Needs Implementation Still)

## Client Methods

Usage: `SocketRoomsClient.<methodName>()`

### **.init(socket_IO_Instance)**
Initializes Socket-Rooms for client

**socket_IO_Instance** `object`: a socket.io instance, see **Server Setup** part of this doc.

### **.joinRoom(roomId, responseCallback)**

Adds client to room. Returns a promise which resolves/rejects based on if client was able to join the room.

**roomId** `string`: ID for the room to join

**responseCallback** `Function`: a callback function that will execute where an event is sent to this room

### **.setResponse(roomId, responseCallback)**

Add/Update callback for a specific room. Will only call if user has privously joined room

**roomId** `string`: ID for the room to join

**responseCallback** `Function`: a callback function that will execute where an event is sent to this room

### **.sendMessageToRoom(roomId, message)**

Send a message to room

**roomId** `string`: ID of room to send message to

**message** `any`: the payload that should be sent to the room

### **.getJoinedRooms()**

Returns list of rooms client has joined.








