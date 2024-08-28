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

function shuffleArray(arrayOfPokemon){
    const shuffledArray = [...arrayOfPokemon];
    for (let index = 0; index < shuffledArray.length; index++) {
        let randomIndex = Math.floor(Math.random() * (index + 1));
        let temporaryValue = shuffledArray[index];
        shuffledArray[index] = shuffledArray[randomIndex];
        shuffledArray[randomIndex] = temporaryValue;
    }
    return shuffledArray;
};



export { whichPokemon, shuffleArray };