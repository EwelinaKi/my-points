export function getFromLocalStorage(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

export function saveToLocalStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function clearLocalStorage(key) {
  window.localStorage.removeItem(key);
}
