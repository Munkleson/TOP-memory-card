function whichPokemon(arrayOfPokemon, howManyPokemon) {
    const amountOfPokemon = arrayOfPokemon.length;
    const indexArray = [];

    while (indexArray.length < howManyPokemon) {
        const randomNumber = Math.floor(Math.random() * amountOfPokemon);
        if (!indexArray.includes(randomNumber)) {
            indexArray.push(randomNumber);
        }
    }
    return indexArray.map((index) => arrayOfPokemon[index]);

}

function classicGameShuffle(arrayOfPokemon) {
    const shuffledArray = [...arrayOfPokemon];
    for (let index = 0; index < shuffledArray.length; index++) {
        let randomIndex = Math.floor(Math.random() * (index + 1));
        let temporaryValue = shuffledArray[index];
        shuffledArray[index] = shuffledArray[randomIndex];
        shuffledArray[randomIndex] = temporaryValue;
    }
    return shuffledArray;
}

function standardGameShuffle(arrayOfPokemon, maxNumberOfPokemon, clickedArray) {
    function recursiveShuffle() {
        let numberOfValidIds = 0;
        const tempArray = [...arrayOfPokemon];
        const shuffledArray = [];
        while (shuffledArray.length < maxNumberOfPokemon){
            let randomNumber = Math.floor(Math.random() * tempArray.length);
            const splicedData = tempArray.splice(randomNumber, 1)[0];
            shuffledArray.push(splicedData);
            console.log(clickedArray.includes(splicedData.id))
            if (!clickedArray.includes(splicedData.id)){
                numberOfValidIds++;
            }
        }
        if (numberOfValidIds !== 0){
            return shuffledArray;
        } else {
           return recursiveShuffle();
        }
    }


    return recursiveShuffle();
}

export { whichPokemon, classicGameShuffle, standardGameShuffle };
