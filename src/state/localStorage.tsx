export function getFromLocalStorage(key: string): any {
  // @ts-ignore
  return JSON.parse(window.localStorage.getItem(key));
}

export function saveToLocalStorage(key: string, value): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function clearLocalStorage(key: string): void {
  window.localStorage.removeItem(key);
}
