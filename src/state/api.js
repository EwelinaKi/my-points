//TODO connect to external database

export function getGames() {
  return JSON.parse(window.localStorage.getItem('games')) || null;
}

export function saveGame(game) {
  console.log('save game:', game);
  const savedGames = getGames();
  if (savedGames) {
    window.localStorage.setItem('games', JSON.stringify({...savedGames, ...game}));
  } else {
    window.localStorage.setItem('games', JSON.stringify({...game}));
  }
}

export function deleteGameApi(pin) {
  const savedGames = getGames();
  delete savedGames[pin];
  window.localStorage.setItem('games', JSON.stringify({...savedGames}));
}

