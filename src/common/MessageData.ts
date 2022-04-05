export class MessageData {
  from: string;
  message: any;
  roomId: string;

  constructor(from: string, message: any, roomId: string) {
    this.from = from;
    this.message = message;
    this.roomId = roomId;
  }
}