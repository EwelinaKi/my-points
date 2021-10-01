import {Player} from "../model/player";
import {saveToLocalStorage, getFromLocalStorage} from "./localStorage";

//TODO connect with external database

export function getGames() {
  return getFromLocalStorage('games') || null;
}

export function getGameApi(gamePin) {
  return getGames()[gamePin];
}

export function savePlayersApi(gamePin, playersList = []) {
  const games = getGames();
  if (playersList.length) {
    games[gamePin].players = playersList.map(el => el.getPlayer());
    saveGameApi({[gamePin]: games[gamePin]});
  }
}

export function getPlayersApi(gamePin) {
  return getGameApi(gamePin).players.map(player => new Player(player.name, player.color, player.points));
}

export function saveGameApi(game) {
  const savedGames = getGames();
  if (savedGames) {
    saveToLocalStorage('games', {...savedGames, ...game});
  } else {
    saveToLocalStorage('games', {...game});
  }
}

export function deleteGameApi(pin) {
  const savedGames = getGames();
  delete savedGames[pin];
  saveToLocalStorage('games', {...savedGames});
}

