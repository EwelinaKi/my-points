export function saveGamePin(pin) {
    window.localStorage.setItem('gamePin', pin)
}

export function getGamePin() {
    return window.localStorage.getItem('gamePin') || '';
}

export function clearGamePin() {
    window.localStorage.clear();
}
