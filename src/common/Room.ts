export class Room {
  id: string;
  capacity: number | null = null;
  activeMemberCount: number = 0;
  // TODO: Password

  constructor(id: string, capacity: number) {
    this.id = id;

    if (capacity) {
      this.capacity = capacity;
    }

  }

  incrementActiveMemberCount() {
    this.activeMemberCount++;
  }

  decrementActiveMemberCount() {
    this.activeMemberCount--;
  }
}
