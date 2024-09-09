import { gameSettings } from "../../gameSettingsVariables";
import { gameModeData } from "../GameModeData";

export default function localStorageVersionControl() {
    //// Deletes everything in the scores section of localstorage if a new version is uploaded (really only if I want to change scoring methods). I'll probably need to edit this down the road to not delete the scores of the gamemodes/difficulties etc that aren't affected.
    if (localStorage.version !== gameSettings.currentVersion){
        localStorage.removeItem("scores");
        localStorage.clear();
        localStorage.version = gameSettings.currentVersion;
        localStorage.scores = JSON.stringify({});
        const scoreObject = JSON.parse(localStorage.getItem("scores"));
            const gameModes = Object.keys(gameModeData);
            gameModes.forEach(mode => {
                if (!scoreObject[mode]){
                    scoreObject[mode] = {};
                };
                gameModeData[mode].difficulties.forEach(difficulty => {
                    if (!scoreObject[mode][difficulty]){
                        scoreObject[mode][difficulty] = {};
                    };
                    if (!scoreObject[mode][difficulty].true){
                        scoreObject[mode][difficulty].true = 0;
                    } 
                    if (!scoreObject[mode][difficulty].false){
                        scoreObject[mode][difficulty].false = 0;
                    } 
                });
            });
        localStorage.setItem("scores", JSON.stringify(scoreObject));
    }
}