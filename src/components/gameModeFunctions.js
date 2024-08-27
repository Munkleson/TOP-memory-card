function whichPokemon(arrayOfPokemon, howManyPokemon){
    const length = arrayOfPokemon.length;
    const indexArray = [];

    while (indexArray.length < howManyPokemon) {
        const randomNumber = Math.floor(Math.random() * length);
        if (!indexArray.includes(randomNumber)){
            indexArray.push(randomNumber);
        }
    }
    return indexArray.map(index => arrayOfPokemon[index]);
};






export { whichPokemon };