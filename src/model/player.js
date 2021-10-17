export class Player {
  color;
  name;
  points;
  isActive;
  
  constructor(name, color, isActive, points = 0) {
    this.name = name;
    this.color = color;
    this.points = points;
    this.isActive = isActive;
  }

  setActive(val) {
    this.isActive = val;
  }
  
  addPoints(val) {
    this.points = this.points + val;
  }
  
  getPlayer() {
    return {
      name: this.name,
      color: this.color,
      points: this.points,
      isActive: this.isActive
    }
  }
}
