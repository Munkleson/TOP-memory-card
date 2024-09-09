// function storeInLocalStorage(points, numberOfPokemon, timedCheck, gameModeAndDifficulty) {
//     function checkIfTimedGame() {
//         return timedCheck ? "Timed" : "";
//     }
//     if (gameModeAndDifficulty !== "classicCustom") {
//         if (points > localStorage[`${gameModeAndDifficulty}${checkIfTimedGame()}`] || !localStorage[`${gameModeAndDifficulty}${checkIfTimedGame()}`]) {
//             localStorage[`${gameModeAndDifficulty}${checkIfTimedGame()}`] = points;
//         }
//     } else {
//         if (points > localStorage[`${gameModeAndDifficulty}${numberOfPokemon}${checkIfTimedGame()}`] || !localStorage[`${gameModeAndDifficulty}${numberOfPokemon}${checkIfTimedGame()}`]) {
//             localStorage[`${gameModeAndDifficulty}${numberOfPokemon}${checkIfTimedGame()}`] = points;
//         }
//     }
// }

function storeInLocalStorage(points, numberOfPokemon, timedCheck, gameModeAndDifficultyProps){
    const gameMode = gameModeAndDifficultyProps.gameMode;
    const difficulty = gameModeAndDifficultyProps.gameDifficulty;

    const scores = JSON.parse(localStorage.getItem("scores"));
    if (difficulty !== "custom"){
        !scores[gameMode] && (scores[gameMode] = {});
        !scores[gameMode][difficulty] && (scores[gameMode][difficulty] = {});
        scores[gameMode][difficulty][timedCheck] = points;
    } else {
        !scores[gameMode] && (scores[gameMode] = {});
        !scores[gameMode][difficulty] && (scores[gameMode][difficulty] = {});
        !scores[gameMode][difficulty][numberOfPokemon] && (scores[gameMode][difficulty][numberOfPokemon] = {});
        scores[gameMode][difficulty][numberOfPokemon][timedCheck] = points;
    }
    localStorage.setItem("scores", JSON.stringify(scores));
}

function getHighScore(numberOfPokemon, timedCheck, gameModeAndDifficultyProps) {
    const gameMode = gameModeAndDifficultyProps.gameMode;
    const difficulty = gameModeAndDifficultyProps.gameDifficulty;
    const scores = JSON.parse(localStorage.getItem("scores"));

    if (difficulty !== "custom"){
        !scores[gameMode] && (scores[gameMode] = {});
        !scores[gameMode][difficulty] && (scores[gameMode][difficulty] = {});
        !scores[gameMode][difficulty][timedCheck] && (scores[gameMode][difficulty][timedCheck] = 0);
        const nonCustom = scores[gameMode][difficulty][timedCheck];
        return nonCustom ? nonCustom : 0;
    } else {
        !scores[gameMode] && (scores[gameMode] = {});
        !scores[gameMode][difficulty] && (scores[gameMode][difficulty] = {});
        !scores[gameMode][difficulty][numberOfPokemon] && (scores[gameMode][difficulty][numberOfPokemon] = {});
        !scores[gameMode][difficulty][numberOfPokemon][timedCheck] && (scores[gameMode][difficulty][numberOfPokemon][timedCheck] = 0);
        const custom = scores[gameMode][difficulty][numberOfPokemon][timedCheck];
        return custom ? custom : 0;
    }
}

// function getHighScore(numberOfPokemon, timedCheck, gameModeAndDifficulty) {
//     function checkIfTimedGame() {
//         return timedCheck ? "Timed" : "";
//     }
//     if (gameModeAndDifficulty !== "classicCustom") {
//         return localStorage[`${gameModeAndDifficulty}${checkIfTimedGame()}`] ? localStorage[`${gameModeAndDifficulty}${checkIfTimedGame()}`] : 0;
//     } else {
//         return localStorage[`${gameModeAndDifficulty}${numberOfPokemon}${checkIfTimedGame()}`] ? localStorage[`${gameModeAndDifficulty}${numberOfPokemon}${checkIfTimedGame()}`] : 0; //// For custom games
//     }
// }

export { storeInLocalStorage, getHighScore };
