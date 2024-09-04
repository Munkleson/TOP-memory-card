import { useState } from "react";
import { whichPokemon, shuffleArray } from "./subcomponents/gameModeFunctions";
import { storeInLocalStorage, getHighScore } from "./subcomponents/pointScoring";
import "./css_files/pokemonCardStyles.css";
import { HeaderBar, FooterBar } from "./headerFooterBars";
import { EndingScreen } from "./gameEnd";
import { GameDisplay } from "./CardFunctions";

function InitializeGame({ numberOfPokemon, pokemonData, currentVersion, resetGame, timed }) {
    const [currentGamePokemon, setCurrentGamePokemon] = useState(whichPokemon(pokemonData, numberOfPokemon));
    const [clickedArray, setClickedArray] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [highScore, setHighScore] = useState(getHighScore(numberOfPokemon, timed));
    const [gameOver, setGameOver] = useState(false);
    const [currentlyFlipping, setFlippingStatus] = useState(false);
    const [finalCard, setFinalCard] = useState(null); //// the card that ends the game, either in a win or a loss
    const [gameResult, setGameResult] = useState("");
    const [gameActive, setGameActive] = useState(false);
    const [cardClickedCheck, setCardClickedCheck] = useState(false);
    const [allowedToClick, setClickAllowance] = useState(true); /// Remove this if I want people to stop spamming click/autoclickers

    function cardClick(id, target) {
        if (allowedToClick) {
            /// Remove this if I want people to be able to spam click/autoclickers
            if (!gameOver) {
                target.style.backgroundColor ='#3590F3';
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
                        storeInLocalStorage(updatedPoints, currentVersion, numberOfPokemon, timed);
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
                            target.style.backgroundColor = "";
                            // setFlippingStatus(true);
                            setCurrentGamePokemon(shuffleArray(currentGamePokemon));
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
            <HeaderBar replayGame={replayGame} highScore={highScore} currentScore={currentScore} resetGame={resetGame} />
            {gameOver && <EndingScreen gameResult={gameResult} replayGame={replayGame} />}
            <GameDisplay currentGamePokemon={currentGamePokemon} cardClick={cardClick} finalCard={finalCard} gameResult={gameResult} numberOfPokemon={numberOfPokemon} currentlyFlipping={currentlyFlipping}/>
            <FooterBar timed={timed} gameOverFunction={gameOverFunction} gameActive={gameActive} cardClickedCheck={cardClickedCheck} setCardClickedCheckFunction={setCardClickedCheckFunction} gameOver={gameOver} />
        </>
    );
}



export { InitializeGame };
