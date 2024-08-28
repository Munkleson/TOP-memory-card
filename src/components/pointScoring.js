function storeInLocalStorage(points, version) {
    localStorage.highScore ? (points > localStorage.highScore ? localStorage.highScore = points : null) : localStorage.highScore = points;
    localStorage.version = version;
}

function getHighScore() {
    return localStorage.highScore ? localStorage.highScore : 0;
}

export { storeInLocalStorage, getHighScore };