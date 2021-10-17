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

export function updatePlayerApi(gamePin, player) {
  const games = getGames();
  games[gamePin].players =  games[gamePin].players.map( el => el.name === player.name ? player : el);
  saveGameApi({[gamePin]: games[gamePin]});
}

export function deletePlayerApi(gamePin, player) {
  const games = getGames();
  games[gamePin].players = games[gamePin].players.filter( el => el.name !== player.name);
  saveGameApi({[gamePin]: games[gamePin]})
}

export function getPlayersApi(gamePin) {
  return getGameApi(gamePin).players.map(player => new Player(player.name, player.color, player.isActive, player.points));
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

