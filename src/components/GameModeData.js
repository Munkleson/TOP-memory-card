import { gameSettings } from "../gameSettingsVariables";
import GameModeSettings from "./GameModeSettings";

const gameModeData = {
    classic: {
        name: "Classic",
        difficulties: ["Easy", "Medium", "Hard", "Insane", "Custom"],
    },
    standard: {
        name: "Standard",
        difficulties: ["Easy", "Medium", "Hard", "Insane", "Nightmare", "Custom"],
    },
    fiftyFifty: {
        name: "Fifty-fifty",
        difficulties: ["Easy", "Medium", "Hard", "Insane", "Nightmare", "Custom"],
    }
}

gameModeData.classic.instructions = [
    `• In this game mode, all of the cards in the current round will be displayed at the same time`,
    `• Once a card is ${gameSettings.mobileOrNot ? "tapped" : "clicked"}, the deck will shuffle and the cards may be displayed in a previous position than they were previously`,
    `• The total number of cards per round will depend on the difficulty level. The settings are as follows:`,
    `    - ${gameModeData.classic.difficulties[0]}: ${GameModeSettings.classic[gameModeData.classic.difficulties[0]].numberOfCards} cards`,
    `    - ${gameModeData.classic.difficulties[1]}: ${GameModeSettings.classic[gameModeData.classic.difficulties[1]].numberOfCards} cards`,
    `    - ${gameModeData.classic.difficulties[2]}: ${GameModeSettings.classic[gameModeData.classic.difficulties[2]].numberOfCards} cards`,
    `    - ${gameModeData.classic.difficulties[3]}: ${GameModeSettings.classic[gameModeData.classic.difficulties[3]].numberOfCards} cards`,
    `    - ${gameModeData.classic.difficulties[4]}: You may choose a number from ${GameModeSettings.fiftyFifty[gameModeData.classic.difficulties[4]].minCards} to ${GameModeSettings.classic[gameModeData.classic.difficulties[4]].maxCards} cards`,
    `• Timed mode duration: 5 seconds`,
];
gameModeData.standard.instructions = [
    "• In this game mode, only a few of all the cards in the current round will be displayed at a time",
    `• Once a card is ${gameSettings.mobileOrNot ? "tapped" : "clicked"}, the deck will shuffle and show you a random selection of cards out of all the cards in the deck`,
    "• The number of cards displayed and total per round will depend on the difficulty level. The settings are as follows:",
    `    - ${gameModeData.standard.difficulties[0]}: 3 cards displayed out of ${GameModeSettings.standard[gameModeData.standard.difficulties[0]].numberOfCards}`,
    `    - ${gameModeData.standard.difficulties[1]}: 6 cards displayed out of ${GameModeSettings.standard[gameModeData.standard.difficulties[1]].numberOfCards}`,   
    `    - ${gameModeData.standard.difficulties[2]}: 9 cards displayed out of ${GameModeSettings.standard[gameModeData.standard.difficulties[2]].numberOfCards}`, 
    `    - ${gameModeData.standard.difficulties[3]}: 9 cards displayed out of ${GameModeSettings.standard[gameModeData.standard.difficulties[3]].numberOfCards}`, 
    `    - ${gameModeData.standard.difficulties[4]}: 9 cards displayed out of ${GameModeSettings.standard[gameModeData.standard.difficulties[4]].numberOfCards}`, 
    `    - ${gameModeData.standard.difficulties[5]}: The number of cards displayed will range from 3 to 9, depending on the total number of cards that you are playing with. You may choose a number from ${GameModeSettings.standard[gameModeData.standard.difficulties[5]].minCards} to ${GameModeSettings.standard[gameModeData.standard.difficulties[5]].maxCards} cards`,          
    "* There will always be at least one valid card displayed",
    `• Timed mode duration: 5 seconds`,
];

gameModeData.fiftyFifty.instructions = [
    "• In this game mode, two of the cards in the current round will be displayed at a time",
    `• Once a card is ${gameSettings.mobileOrNot ? "tapped" : "clicked"}, the deck will shuffle and show you one card that has been ${gameSettings.mobileOrNot ? "tapped" : "clicked"} already and one card that not been ${gameSettings.mobileOrNot ? "tapped" : "clicked"} before`,
    "• The total number of cards per round will depend on the difficulty level. The settings are as follows:",
    `    - ${gameModeData.fiftyFifty.difficulties[0]}: ${GameModeSettings.fiftyFifty[gameModeData.fiftyFifty.difficulties[0]].numberOfCards} cards`,
    `    - ${gameModeData.fiftyFifty.difficulties[1]}: ${GameModeSettings.fiftyFifty[gameModeData.fiftyFifty.difficulties[1]].numberOfCards} cards`,   
    `    - ${gameModeData.fiftyFifty.difficulties[2]}: ${GameModeSettings.fiftyFifty[gameModeData.fiftyFifty.difficulties[2]].numberOfCards} cards`, 
    `    - ${gameModeData.fiftyFifty.difficulties[3]}: ${GameModeSettings.fiftyFifty[gameModeData.fiftyFifty.difficulties[3]].numberOfCards} cards`, 
    `    - ${gameModeData.fiftyFifty.difficulties[4]}: ${GameModeSettings.fiftyFifty[gameModeData.fiftyFifty.difficulties[4]].numberOfCards} cards`, 
    `    - ${gameModeData.fiftyFifty.difficulties[5]}: You may choose a number from ${GameModeSettings.fiftyFifty[gameModeData.fiftyFifty.difficulties[5]].minCards} to ${GameModeSettings.fiftyFifty[gameModeData.fiftyFifty.difficulties[5]].maxCards} cards`,  
    `• Timed mode duration: 3.5 seconds`,
]

export { gameModeData };
