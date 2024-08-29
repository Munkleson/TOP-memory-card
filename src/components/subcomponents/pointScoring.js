function storeInLocalStorage(points, version, numberOfPokemon) {
    localStorage[numberOfPokemon] ? (points > localStorage[numberOfPokemon] ? localStorage[numberOfPokemon] = points : null) : localStorage[numberOfPokemon] = points;
    localStorage.version = version;
}

function getHighScore(numberOfPokemon) {
    return localStorage[numberOfPokemon] ? localStorage[numberOfPokemon] : 0;
}

export { storeInLocalStorage, getHighScore };