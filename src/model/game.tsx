import {Player} from "./player";

export class Game {
   _pin: string;
   _players;
  
  constructor(pin: string, players: any = []) {
    this._pin = pin;
    this._players = players;

    console.log('players', players)
  }
  
  
  getGame(): IGames {
    return {
      [this._pin]: {
        players: this._players
      }
    }
  }
}

export interface IGames {
  [key: string]: IGame
}
export interface IGame {
  players: Player[]
}
