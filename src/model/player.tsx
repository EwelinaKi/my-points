export class Player {
  color: string;
  name: string;
  points: number;
  isActive: boolean;
  
  constructor(name: string, color: string, points: number = 0) {
    this.name = name;
    this.color = color;
    this.points = points;
    this.isActive = false;
  }

  setActive(val: boolean): void {
    this.isActive = val;
  }
  
  addPoints(val: number): void {
    this.points = this.points + val;
  }
  
  getPlayer(): IPlayer {
    return {
      name: this.name,
      color: this.color,
      points: this.points,
      isActive: this.isActive
    }
  }
}

export interface IPlayer {
  color: string;
  name: string;
  points: number;
  isActive: boolean;
}