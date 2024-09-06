function storeInLocalStorage(points, numberOfPokemon, timedCheck, gameMode) {
    function checkIfTimedGame() {
        return timedCheck ? "Timed" : "";
    }
    if (gameMode !== "classicCustom"){
        if (points > localStorage[`${gameMode}${checkIfTimedGame()}`] || !localStorage[`${gameMode}${checkIfTimedGame()}`]) {
            localStorage[`${gameMode}${checkIfTimedGame()}`] = points;
        }
    } else {
        if (points > localStorage[`${gameMode}${numberOfPokemon}${checkIfTimedGame()}`] || !localStorage[`${gameMode}${numberOfPokemon}${checkIfTimedGame()}`]) {
            localStorage[`${gameMode}${numberOfPokemon}${checkIfTimedGame()}`] = points;
        }
    }
}

function getHighScore(numberOfPokemon, timedCheck, gameMode) {
    function checkIfTimedGame() {
        return timedCheck ? "Timed" : "";
    }
    if (gameMode !== "classicCustom"){
        return localStorage[`${gameMode}${checkIfTimedGame()}`] ? localStorage[`${gameMode}${checkIfTimedGame()}`] : 0;
    } else {
        return localStorage[`${gameMode}${numberOfPokemon}${checkIfTimedGame()}`] ? localStorage[`${gameMode}${numberOfPokemon}${checkIfTimedGame()}`] : 0; //// For custom games
    }
}

export { storeInLocalStorage, getHighScore };
