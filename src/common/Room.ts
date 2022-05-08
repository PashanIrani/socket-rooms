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

  hasMember(member: Member) {
    for (let i = 0; i < this.members.length; ++i) {
      if (this.members[i].id === member.id) return true;
    }
    
    return false;
  }

  addMember(member: Member) {
    if (this.hasMember(member)) return false;

    this.members.push(member);
    return true;
  }

  removeMember(id: string) {
    this.members = this.members.filter((member : Member) => {
      return member.id !== id;
    });
  }
}
