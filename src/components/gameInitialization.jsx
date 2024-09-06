import { useEffect, useState } from "react";
import { whichPokemon, classicGameShuffle, standardGameShuffle } from "./subcomponents/gameModeFunctions";
import { storeInLocalStorage, getHighScore } from "./subcomponents/pointScoring";
import { HeaderBar, FooterBar } from "./headerFooterBars";
import { EndingScreen } from "./gameEnd";
import { ClassicGame } from "./ClassicGameCardFunctions";
import { StandardGame } from "./StandardGameCardFunctions";
import GameModeSettings from "./GameModeSettings";

function InitializeGame({ numberOfPokemon, pokemonData, backToHomePage, timed, gameMode }) {
    const [currentGamePokemon, setCurrentGamePokemon] = useState(whichPokemon(pokemonData, numberOfPokemon));
    const [clickedArray, setClickedArray] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [highScore, setHighScore] = useState(getHighScore(numberOfPokemon, timed, gameMode));
    const [gameOver, setGameOver] = useState(false);
    const [currentlyFlipping, setFlippingStatus] = useState(false);
    const [finalCard, setFinalCard] = useState(null); //// the card that ends the game, either in a win or a loss
    const [gameResult, setGameResult] = useState("");
    const [gameActive, setGameActive] = useState(false);
    const [cardClickedCheck, setCardClickedCheck] = useState(false);
    const [allowedToClick, setClickAllowance] = useState(true); /// Remove this if I want people to stop spamming click/autoclickers

    const [currentlyDisplayedCards, setCurrentlyDisplayedCards] = useState([]);
    const [cardsRemaining, setCardsRemaining] = useState();

    let maxNumberOfPokemonShown; //// Didn't really work when I used const
    if (gameMode === "standardCustom"){
        if (numberOfPokemon < 18) {
            maxNumberOfPokemonShown = Math.floor(numberOfPokemon / 2);
        }
        // if (numberOfPokemon === 6 || numberOfPokemon === 7){
        //     maxNumberOfPokemonShown = 3;
        // } else if (numberOfPokemon === 8){
        //     maxNumberOfPokemonShown = 4
        // } 
        else {
            maxNumberOfPokemonShown = GameModeSettings[gameMode.slice(8)].maxShown;
        }
    } else if (gameMode.includes("standard")) {
        maxNumberOfPokemonShown = GameModeSettings[gameMode.slice(8)].maxShown;
    }

    useEffect(() => {
        if (currentGamePokemon) {
            setCurrentlyDisplayedCards(whichPokemon(currentGamePokemon, maxNumberOfPokemonShown));
        }
    }, [currentGamePokemon, gameMode, maxNumberOfPokemonShown]);

    // useEffect(() => {
    //     setMaxNumberOfPokemonShown(GameModeSettings[gameMode.slice(8)].maxShown)
    // }, []);

    function cardClick(id, target) {
        if (allowedToClick) {
            /// Remove this if I want people to be able to spam click/autoclickers
            if (!gameOver) {
                target.style.backgroundColor = "#3590F3"; //// This couldn't be just set to hover because hover function interacts weirdly with mobile, and I wanted a bit of indication of what card you chose on mobile
                //// checks if the same pokemon has been clicked already
                setGameActive(true);
                setCardClickedCheck(true);
                setClickAllowance(false);
                if (!clickedArray.includes(id)) {
                    setClickedArray([...clickedArray, id]);
                    const updatedPoints = currentScore + 1;
                    setCurrentScore(updatedPoints);
                    //// high score functionality
                    if (updatedPoints > highScore) {
                        setHighScore(updatedPoints);
                        storeInLocalStorage(updatedPoints, numberOfPokemon, timed, gameMode);
                    }
                    //// flips cards only if the game is not over
                    if (updatedPoints !== numberOfPokemon) {
                        setFlippingStatus(true);
                    }
                    //// victory function
                    if (updatedPoints === numberOfPokemon) {
                        victoryFunction(id);
                    }
                    //// this setTimeout is needed so it will rerender with a shuffled array of pokemon to work with the flipping functions
                    setTimeout(() => {
                        if (updatedPoints !== numberOfPokemon) {
                            target.style.backgroundColor = ""; //// This couldn't be just set to hover because hover function interacts weirdly with mobile, and I wanted a bit of indication of what card you chose on mobile

                            /////// Card shuffling logic
                            if (gameMode.includes("classic")) {
                                setCurrentGamePokemon(classicGameShuffle(currentGamePokemon));
                            } else {
                                setCurrentlyDisplayedCards(standardGameShuffle(currentGamePokemon, maxNumberOfPokemonShown, [...clickedArray, id])); //// Clicked array has to be referenced like this, due to state setting being snapshots of when they were called. So in this case clickedArray would not be updated with the new id that was clicked to trigger this parent function
                            }
                            //// setTimeout is required based on how this is structured. The callback will manipulate the dom elements after the re-render with the cards showing the back side, and flip them back to front but after the cards have been shuffled
                            //// Remove the setTimeout and the flipping completely breaks
                            setTimeout(() => {
                                setFlippingStatus(false);
                            }, 100);
                        }
                        setClickAllowance(true); //// This is done with a set timer so people can only click once the cards have turned sufficiently. Can set a setTimeout within this function to further extend that time so animations complete?
                    }, 700); //// this value is based on the transition time set in the CSS files. A bit unsynced but works
                } else {
                    //// game lose functionality
                    gameOverFunction(id);
                }
            }
        }
    }

    function replayGame() {
        setCurrentGamePokemon(whichPokemon(pokemonData, numberOfPokemon));
        setClickedArray([]);
        setCurrentScore(0);
        setGameOver(false);
        setFlippingStatus(false);
        setFinalCard(null);
        setGameResult(false);
        setGameActive(false);
        setClickAllowance(true); /// Remove this if I want people to be able to spam click/autoclickers
        setCardClickedCheckFunction();
    }

    function gameOverFunction(id) {
        setFinalCard(id);
        setGameResult("loss");
        setGameOver(true);
        setFlippingStatus(false);
        setGameActive(false);
        setCardClickedCheckFunction();
    }

    function victoryFunction(id) {
        setFinalCard(id);
        setGameResult("win");
        setGameOver(true);
        setFlippingStatus(false);
        setGameActive(false);
        setCardClickedCheckFunction();
    }

    function setCardClickedCheckFunction() {
        //// For the timer bar. Checks when the card has been clicked and makes it false after it has been clicked. Done this way for re-rendering purposes and passing down the clicked check as a prop to the timer bar.
        setCardClickedCheck(false);
    }

    return (
        <>
            <HeaderBar replayGame={replayGame} highScore={highScore} currentScore={currentScore} backToHomePage={backToHomePage} />
            {gameOver && <EndingScreen gameResult={gameResult} replayGame={replayGame} />}

            {gameMode.includes("classic") && <ClassicGame currentGamePokemon={currentGamePokemon} cardClick={cardClick} finalCard={finalCard} gameResult={gameResult} numberOfPokemon={numberOfPokemon} currentlyFlipping={currentlyFlipping} gameMode={gameMode} />}
            {gameMode.includes("standard") && <StandardGame currentGamePokemon={currentGamePokemon} cardClick={cardClick} finalCard={finalCard} gameResult={gameResult} numberOfPokemon={numberOfPokemon} currentlyFlipping={currentlyFlipping} gameMode={gameMode} currentlyDisplayedCards={currentlyDisplayedCards} maxNumberOfPokemonShown={maxNumberOfPokemonShown}/>}

            <FooterBar timed={timed} gameOverFunction={gameOverFunction} gameActive={gameActive} cardClickedCheck={cardClickedCheck} setCardClickedCheckFunction={setCardClickedCheckFunction} gameOver={gameOver} />
        </>
    );
}

export { InitializeGame };
