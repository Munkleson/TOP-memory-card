import { gameSettings } from "../gameSettingsVariables";

const gameModeData = {
    classic: {
        name: "Classic",
        difficulties: ["Easy", "Medium", "Hard", "Insane", "Custom"],
    },
    standard: {
        name: "Standard",
        difficulties: ["Easy", "Medium", "Hard", "Insane", "Nightmare", "Custom"],
    }
}

gameModeData.classic.instructions = [
    `• In this game mode, you will have a number of cards per round based on the difficulty level. All of them will be shown at the same time`,
    `• Once a card is ${gameSettings.mobileOrNot ? "tapped" : "clicked"}, the deck will shuffle and the cards may be displayed in a previous position than they were previously`,
    `• The number of cards per round will depend on the difficulty level. The settings are as follows:`,
    `    - ${gameModeData.classic.difficulties[0]}: 6 cards`,
    `    - ${gameModeData.classic.difficulties[1]}: 12 cards`,
    `    - ${gameModeData.classic.difficulties[2]}: 20 cards`,
    `    - ${gameModeData.classic.difficulties[3]}: 30 cards`,
    `    - ${gameModeData.classic.difficulties[4]}: You may choose a number from 6 to 30 cards`,
    ``,
    ``,
];
gameModeData.standard.instructions = [
    "• In this game mode, you will have a number of cards per round based on the difficulty level. However, only a number of them will be displayed at a time",
    `• Once a card is ${gameSettings.mobileOrNot ? "tapped" : "clicked"}, the deck will shuffle and show you a random selection of cards out of all the cards in the deck`,
    "• The number of cards displayed will depend on the difficulty level. The settings are as follows:",
    `    - ${gameModeData.standard.difficulties[0]}: 3 cards displayed out of 6`,
    `    - ${gameModeData.standard.difficulties[1]}: 6 cards displayed out of 12`,   
    `    - ${gameModeData.standard.difficulties[2]}: 9 cards displayed out of 20`, 
    `    - ${gameModeData.standard.difficulties[3]}: 9 cards displayed out of 30`, 
    `    - ${gameModeData.standard.difficulties[4]}: 9 cards displayed out of 99`, 
    `    - ${gameModeData.standard.difficulties[5]}: Up to a maximum of 9 cards displayed. You may choose a number from 6 to 99 cards`,          
    "* There will always be at least one valid card displayed",
];

export { gameModeData };
