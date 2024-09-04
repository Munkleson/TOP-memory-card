
const gameSettings = {
    currentVersion: "V0.1",
    maxNumberOfPokemon: 30,
    minNumberOfPokemon: 6,
    mobileOrNot: (window.innerWidth / window.innerHeight) < 1, //// To check if div separators are needed because mobile. Essentially a mobile check

};
gameSettings.maxPokemonPerRow = gameSettings.mobileOrNot ? Math.floor(gameSettings.maxNumberOfPokemon / 6) : Math.floor(gameSettings.maxNumberOfPokemon / 3); //// Changes when to separate the cards for evenness depending on if it's a mobile device or not

export { gameSettings };


// const maxNumberOfPokemon = 27; //// Sets the max as a variable so it can changed easily and without having to keep manually editing variables later
// const minNumberOfPokemon = 6;
// // const minNumberOfPokemon = 1; //// for testing purposes only, otherwise the above applies
// const maxPokemonPerRow = maxNumberOfPokemon / 3;