export class Player {
  color;
  name;
  points;
  
  constructor(name, color, points = 0) {
    this.name = name;
    this.color = color;
    this.points = points;
  }
  
  addPoints(val) {
    this.points = this._pionts + val;
  }
  
  getPlayer() {
    return {
      name: this.name,
      color: this.color,
      points: this.points,
    }
  }
  
}
