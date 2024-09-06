function storeInLocalStorage(points, numberOfPokemon, timedCheck, gameMode) {
    if (timedCheck) {
        if (gameMode !== "classicCustom") {
            if (points > localStorage[`${gameMode}Timed`] || !localStorage[`${gameMode}Timed`]) {
                localStorage[`${gameMode}Timed`] = points;
            }
        } else {
            if (points > localStorage[`${gameMode}${numberOfPokemon}Timed`] || !localStorage[`${gameMode}${numberOfPokemon}Timed`]) {
                //// For custom games
                localStorage[`${gameMode}${numberOfPokemon}Timed`] = points;
            }
        }
    } else {
        if (gameMode !== "classicCustom") {
            if (points > localStorage[`${gameMode}`] || !localStorage[`${gameMode}`]) {
                localStorage[`${gameMode}`] = points;
            }
        } else {
            if (points > localStorage[`${gameMode}${numberOfPokemon}`] || !localStorage[`${gameMode}${numberOfPokemon}`]) {
                //// For custom games
                localStorage[`${gameMode}${numberOfPokemon}`] = points;
            }
        }
    }
}

function getHighScore(numberOfPokemon, timedCheck, gameMode) {
    if (timedCheck) {
        if (gameMode !== "classicCustom"){
            return localStorage[`${gameMode}Timed`] ? localStorage[`${gameMode}Timed`] : 0;
        } else {
            return localStorage[`${gameMode}${numberOfPokemon}Timed`] ? localStorage[`${gameMode}${numberOfPokemon}Timed`] : 0; //// For custom games
        }
    } else {
        if (gameMode !== "classicCustom"){
            return localStorage[`${gameMode}`] ? localStorage[`${gameMode}`] : 0; 
        } else {
            return localStorage[`${gameMode}${numberOfPokemon}`] ? localStorage[`${gameMode}${numberOfPokemon}`] : 0; //// For custom games
        }

    }
}

export { storeInLocalStorage, getHighScore };
