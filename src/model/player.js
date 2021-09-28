export class Player {
  _color;
  _name;
  _points;
  
  constructor(name, color, points = 0) {
    this._name = name;
    this._color = color;
    this._points = points;
  }
  
  addPoints(val) {
    this._points = this._pionts + val;
  }
  
  getPlayer() {
    return {
      name: this._name,
      color: this._color,
      points: this._points,
    }
  }
  
}
