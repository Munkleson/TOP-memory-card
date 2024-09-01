
const gameSettings = {
    currentVersion: "V0.1",
    maxNumberOfPokemon: 27,
    minNumberOfPokemon: 6,
};
gameSettings.maxPokemonPerRow = gameSettings.maxNumberOfPokemon / 3;

export { gameSettings };


// const maxNumberOfPokemon = 27; //// Sets the max as a variable so it can changed easily and without having to keep manually editing variables later
// const minNumberOfPokemon = 6;
// // const minNumberOfPokemon = 1; //// for testing purposes only, otherwise the above applies
// const maxPokemonPerRow = maxNumberOfPokemon / 3;