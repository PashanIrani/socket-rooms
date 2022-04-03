export default {
  JOIN_ROOM: 'join room',
  SEND_MESSAGE: 'send message',
  listen: (roomId:string) => {
    return `LISTEN-${roomId}`
  }
}