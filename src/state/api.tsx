import {saveToLocalStorage, getFromLocalStorage} from "./localStorage";
import {Player} from "../model/player";
import {IGame, IGames} from "../model/game";

//TODO connect with external database

export function getGames(): IGames {
  return getFromLocalStorage('games') || null;
}

export function getGameApi(gamePin): IGame {
  return getGames()[gamePin];
}

export function savePlayersApi(gamePin: string, playersList: Player[] = []): void {
  const games = getGames();
  if (playersList.length) {
    // @ts-ignore
    games[gamePin].players = playersList.map(el => el.getPlayer());
    saveGameApi({[gamePin]: games[gamePin]});
  }
}

export function updatePlayerApi(gamePin: string, player: Player): void {
  const games = getGames();
  games[gamePin].players =  games[gamePin].players.map( el => el.name === player.name ? player : el);
  saveGameApi({[gamePin]: games[gamePin]});
}

export function deletePlayerApi(gamePin: string, player: Player): void {
  const games = getGames();
  games[gamePin].players = games[gamePin].players.filter( el => el.name !== player.name);
  saveGameApi({[gamePin]: games[gamePin]})
}

export function getPlayersApi(gamePin: string): Player[] {
  return getGameApi(gamePin).players.map(player => new Player(player.name, player.color, player.points));
}

export function saveGameApi(game: IGames): void {
  const savedGames = getGames();
  if (savedGames) {
    saveToLocalStorage('games', {...savedGames, ...game});
  } else {
    saveToLocalStorage('games', {...game});
  }
}

export function deleteGameApi(pin: string): void {
  const savedGames = getGames();
  delete savedGames[pin];
  saveToLocalStorage('games', {...savedGames});
}

