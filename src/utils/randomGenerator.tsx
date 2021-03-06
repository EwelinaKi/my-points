function randomString(len: number, charSet: string): string {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    let randomString = '';
    for (let i = 0; i < len; i++) {
        let randomPos = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPos,randomPos+1);
    }
    return randomString;
}

export function randomPin(): string {
    return randomString(10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-');
}


