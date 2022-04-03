import { Member } from "./Member";

export class Room {
  id: string;
  capacity: number | null = null;
  members : Member[] = [];
  // TODO: Password

  constructor(id: string, capacity: number) {
    this.id = id;

    if (capacity) {
      this.capacity = capacity;
    }
  }


  addMember(member: Member) {
    this.members.push(member);
  }

  removeMember(id: string) {
    this.members = this.members.filter((member : Member) => {
      return member.id !== id;
    });
  }
}
