const gameSettings = {
    currentVersion: "V0.11",
    minNumberOfPokemon: 6,
    maxNumberOfPokemon: 30,
    mobileOrNot: window.innerWidth / window.innerHeight < 1, //// To check if div separators are needed because mobile. Essentially a mobile check
    pokemonGenerations: ["Generation 1", "Generation 2", "Generation 3", "Generation 4", "Generation 5", "Generation 6", "Generation 7", "Generation 8", "Generation 9", "All Generations"],
};
// gameSettings.maxPokemonPerRow = gameSettings.mobileOrNot ? Math.floor(gameSettings.maxNumberOfPokemon / 6) : Math.floor(gameSettings.maxNumberOfPokemon / 3); //// Changes when to separate the cards for evenness depending on if it's a mobile device or not
gameSettings.maxPokemonPerRow = gameSettings.mobileOrNot ? 5 : 10;

export { gameSettings };
