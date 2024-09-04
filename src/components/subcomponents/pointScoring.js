function storeInLocalStorage(points, version, numberOfPokemon, timedCheck) {
    if (timedCheck){
        localStorage[`timed${numberOfPokemon}`] ? (points > localStorage[`timed${numberOfPokemon}`] ? localStorage[`timed${numberOfPokemon}`] = points : null) : localStorage[`timed${numberOfPokemon}`] = points;
    } else {
        localStorage[numberOfPokemon] ? (points > localStorage[numberOfPokemon] ? localStorage[numberOfPokemon] = points : null) : localStorage[numberOfPokemon] = points;
    }
    localStorage.version = version;
}

function getHighScore(numberOfPokemon, timedCheck) {
    if (timedCheck){
        return localStorage[`timed${numberOfPokemon}`] ? localStorage[`timed${numberOfPokemon}`] : 0;
    } else {
        return localStorage[numberOfPokemon] ? localStorage[numberOfPokemon] : 0;
    }
}

export { storeInLocalStorage, getHighScore };