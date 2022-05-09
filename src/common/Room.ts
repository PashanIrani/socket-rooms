export class Room {
  id: string;
  capacity: number | null = null;
  members : string[] = [];
  // TODO: Password

  constructor(id: string, capacity: number) {
    this.id = id;

    if (capacity) {
      this.capacity = capacity;
    }
  }

  hasMember(memberId: string) {
    for (let i = 0; i < this.members.length; ++i) {
      if (this.members[i] === memberId) return true;
    }
    
    return false;
  }

  addMember(memberId: string) {
    if (this.hasMember(memberId)) return false;

    this.members.push(memberId);
    return true;
  }

  removeMember(id: string) {
    this.members = this.members.filter((memberId : string) => {
      return memberId !== id;
    });
  }
}
