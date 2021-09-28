export class Game {
   _pin;
   _players;
  
  constructor(pin, players = []) {
    this._pin = pin;
    this._players = players;
  }
  
  
  getGame() {
    return {
      [this._pin]: {
        players: this._players
      }
    }
  }
  
}
