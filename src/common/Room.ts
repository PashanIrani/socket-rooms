export class Room {
  id: string;
  capacity: number | null = null;
  // TODO: Password

  constructor(id: string, capacity: number) {
    this.id = id;

    if (capacity) {
      this.capacity = capacity;
    }
    
  }
}
