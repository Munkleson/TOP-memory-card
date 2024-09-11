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

function fiftyFiftyShuffle(arrayOfPokemon, maxNumberOfPokemon, clickedArray){
        const tempArray = [...arrayOfPokemon];
        const shuffledArray = [];
        let randomClickedId = 0;

        if (clickedArray.length !== 1){
            randomClickedId = Math.floor(Math.random() * clickedArray.length);
        }
        const chosenClickedId = clickedArray[randomClickedId];

        if (Math.floor(Math.random() * 2) === 0){    
            while (shuffledArray.length < 1){
                let randomNumber = Math.floor(Math.random() * tempArray.length);
                if (!clickedArray.includes(tempArray[randomNumber].id)){
                    const splicedData = tempArray.splice(randomNumber, 1)[0];
                    shuffledArray.push(splicedData);
                }
            };
            for (let index = 0; index < arrayOfPokemon.length; index++) {
                if (arrayOfPokemon[index].id === chosenClickedId){
                    shuffledArray.push(arrayOfPokemon[index]);
                }
            };
        } else {
            for (let index = 0; index < arrayOfPokemon.length; index++) {
                if (arrayOfPokemon[index].id === chosenClickedId){
                    shuffledArray.push(arrayOfPokemon[index]);
                }
            };
            while (shuffledArray.length < 2){
                let randomNumber = Math.floor(Math.random() * tempArray.length);
                if (!clickedArray.includes(tempArray[randomNumber].id)){
                    const splicedData = tempArray.splice(randomNumber, 1)[0];
                    shuffledArray.push(splicedData);
                };
            };
        };
        return shuffledArray;
}

function fiftyFiftyMixShuffle(arrayOfPokemon, maxNumberOfPokemon, clickedArray, fiftyFiftyMixRngCounter, setFiftyFiftyMixRngCounter, setFiftyFiftyMixBothFalse){
    const tempArray = [...arrayOfPokemon];
    const shuffledArray = [];
    let randomClickedId = 0;

    function shuffleFunction(){ //// function used so I can utilise closures to make a pseudo-rng generator
        if (Math.floor(Math.random() * fiftyFiftyMixRngCounter) === 0 && clickedArray.length > 2){ //// For when it contains two cards that have been clicked before
            const firstRandomIndex = Math.floor(Math.random() * clickedArray.length);
            function findSecondRandomIndex(){
                const tempIndex = Math.floor(Math.random() * clickedArray.length);
                return tempIndex === firstRandomIndex ? findSecondRandomIndex() : tempIndex;
            }
            const secondRandomIndex = findSecondRandomIndex();
            for (let index = 0; index < arrayOfPokemon.length; index++) {
                if (arrayOfPokemon[index].id === clickedArray[firstRandomIndex]){
                    shuffledArray.push(arrayOfPokemon[index]);  
                }
                if (arrayOfPokemon[index].id === clickedArray[secondRandomIndex]){
                    shuffledArray.push(arrayOfPokemon[index]);
                }
            }
            setFiftyFiftyMixRngCounter(5);
            setFiftyFiftyMixBothFalse(true);
        } else { //// For when it is just a normal fifty-fifty hand
            if (clickedArray.length !== 1){
                randomClickedId = Math.floor(Math.random() * clickedArray.length);
            }
            const chosenClickedId = clickedArray[randomClickedId];
        
            if (Math.floor(Math.random() * 2) === 0){    
                while (shuffledArray.length < 1){
                    let randomNumber = Math.floor(Math.random() * tempArray.length);
                    if (!clickedArray.includes(tempArray[randomNumber].id)){
                        const splicedData = tempArray.splice(randomNumber, 1)[0];
                        shuffledArray.push(splicedData);
                    }
                };
                for (let index = 0; index < arrayOfPokemon.length; index++) {
                    if (arrayOfPokemon[index].id === chosenClickedId){
                        shuffledArray.push(arrayOfPokemon[index]);
                    }
                };
            } else {
                for (let index = 0; index < arrayOfPokemon.length; index++) {
                    if (arrayOfPokemon[index].id === chosenClickedId){
                        shuffledArray.push(arrayOfPokemon[index]);
                    }
                };
                while (shuffledArray.length < 2){
                    let randomNumber = Math.floor(Math.random() * tempArray.length);
                    if (!clickedArray.includes(tempArray[randomNumber].id)){
                        const splicedData = tempArray.splice(randomNumber, 1)[0];
                        shuffledArray.push(splicedData);
                    };
                };
            };
            setFiftyFiftyMixRngCounter(fiftyFiftyMixRngCounter => fiftyFiftyMixRngCounter - 0.5);
        }
    }
    shuffleFunction();
    return shuffledArray;
}

export { whichPokemon, classicGameShuffle, standardGameShuffle, fiftyFiftyShuffle, fiftyFiftyMixShuffle };
