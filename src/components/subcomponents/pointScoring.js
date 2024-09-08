function storeInLocalStorage(points, numberOfPokemon, timedCheck, gameModeAndDifficulty) {
    function checkIfTimedGame() {
        return timedCheck ? "Timed" : "";
    }
    if (gameModeAndDifficulty !== "classicCustom") {
        if (points > localStorage[`${gameModeAndDifficulty}${checkIfTimedGame()}`] || !localStorage[`${gameModeAndDifficulty}${checkIfTimedGame()}`]) {
            localStorage[`${gameModeAndDifficulty}${checkIfTimedGame()}`] = points;
        }
    } else {
        if (points > localStorage[`${gameModeAndDifficulty}${numberOfPokemon}${checkIfTimedGame()}`] || !localStorage[`${gameModeAndDifficulty}${numberOfPokemon}${checkIfTimedGame()}`]) {
            localStorage[`${gameModeAndDifficulty}${numberOfPokemon}${checkIfTimedGame()}`] = points;
        }
    }
}

function getHighScore(numberOfPokemon, timedCheck, gameModeAndDifficulty) {
    function checkIfTimedGame() {
        return timedCheck ? "Timed" : "";
    }
    if (gameModeAndDifficulty !== "classicCustom") {
        return localStorage[`${gameModeAndDifficulty}${checkIfTimedGame()}`] ? localStorage[`${gameModeAndDifficulty}${checkIfTimedGame()}`] : 0;
    } else {
        return localStorage[`${gameModeAndDifficulty}${numberOfPokemon}${checkIfTimedGame()}`] ? localStorage[`${gameModeAndDifficulty}${numberOfPokemon}${checkIfTimedGame()}`] : 0; //// For custom games
    }
}

export { storeInLocalStorage, getHighScore };
