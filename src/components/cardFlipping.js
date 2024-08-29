function flipCards() {
    const cardsFront = document.querySelectorAll(".pokemonCardFront")
    const cardsBack = document.querySelectorAll(".pokemonCardBack")
    cardsFront.forEach(element => {
        element.classList.add('pokemonCardFrontFlipped')
    })
    cardsBack.forEach(element => {
        element.classList.add('pokemonCardBackFlipped');
    })
}

function flipCardsBackToNormal() {
    const cardsFront = document.querySelectorAll(".pokemonCardFront")
    const cardsBack = document.querySelectorAll(".pokemonCardBack")
    cardsFront.forEach(element => {
        element.classList.remove('pokemonCardFrontFlipped')
    })
    cardsBack.forEach(element => {
        element.classList.remove('pokemonCardBackFlipped');
    })
}

export { flipCards, flipCardsBackToNormal }