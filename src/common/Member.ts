export class Member {
  id: string;
  rooms: string[] = [];

  constructor(id: string) {
    this.id = id;
  }
}