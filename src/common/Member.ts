import {Room} from 'src/common/Room';

export class Member {
  id: string;
  rooms: Room[] = [];

  constructor(id: string) {
    this.id = id;
  }
}