import { useState } from "react";
import { whichPokemon, shuffleArray } from "./gameModeFunctions";
import { storeInLocalStorage, getHighScore } from "./pointScoring";
import { flipCards, flipCardsBackToNormal } from "./cardFlipping";
import "./pokemonCardStyles.css";

function InitializeGame({ numberOfPokemon, pokemonData, currentVersion }) {
    const [currentGamePokemon, setCurrentGamePokemon] = useState(whichPokemon(pokemonData, numberOfPokemon));
    const [clickedArray, setClickedArray] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [highScore, setHighScore] = useState(getHighScore(numberOfPokemon));
    const [gameOver, setGameOver] = useState(false);
    const [currentlyFlipping, setFlippingStatus] = useState(false)

    function cardClick(id) {
        if (!gameOver) {
            if (!clickedArray.includes(id)) {
                setClickedArray([...clickedArray, id]);
                const updatedPoints = currentScore + 1;
                setCurrentScore(updatedPoints);
                if (updatedPoints > highScore) {
                    setHighScore(updatedPoints);
                    storeInLocalStorage(updatedPoints, currentVersion, numberOfPokemon);
                }
                if (updatedPoints !== numberOfPokemon){
                    flipCards();
                }
                setTimeout(() => {
                    if (updatedPoints === numberOfPokemon){ /// Winning function - To be continued
                        setGameOver(true);
                        setFlippingStatus(false);
                    } else {
                        setFlippingStatus(true);
                        setTimeout(() => {
                            flipCardsBackToNormal();
                        }, 100);
                        setCurrentGamePokemon(shuffleArray(currentGamePokemon))
                    }
                }, 600)
            } else {
                setGameOver(true);
                setFlippingStatus(false)
            }
        }
    }

    function replayGame() {
        setGameOver(false);
        setFlippingStatus(false);
        setCurrentScore(0);
        setCurrentGamePokemon(whichPokemon(pokemonData, numberOfPokemon));
        setClickedArray([]);
    }

    return (
        <>
            <br />
            <button onClick={replayGame}>Replay</button>
            <p>All-time high score for current game mode: {highScore}</p> 
            <p>Current score: {currentScore}</p>
            { !currentlyFlipping ? <GameDisplay currentGamePokemon={currentGamePokemon} cardClick={cardClick} currentScore={currentScore} highScore={highScore}/>
            : <CardsInMotion currentGamePokemon={currentGamePokemon} cardClick={cardClick} currentScore={currentScore} highScore={highScore}/> }
        </>
    );
}

function GameDisplay({ currentGamePokemon, cardClick}) {
    return (
        <>
            <div className="cardHolder">
                {currentGamePokemon.map((element) => {
                    return (
                        <>
                            <div className="cardDiv">
                                <div onClick={() => cardClick(element.id)} key={element.id} className="pokemonCardFront" style={{ backgroundImage: `url(${element.imageUrl})` }}>
                                        <p className="pokemonNameOnCard">{element.name}</p>
                                </div>
                                <div className="pokemonCardBack" key={`back${element.id.toString()}`}></div>
                            </div>
                        </>
                    );
                })}
            </div>
        </>
    );
}

function CardsInMotion({ currentGamePokemon, cardClick}){
    return (
        <>
            <div className="cardHolder">
            {currentGamePokemon.map((element) => {
                    return (
                        <>
                            <div className="cardDiv">
                                <div onClick={() => cardClick(element.id)} key={element.id} className="pokemonCardFront pokemonCardFrontFlipped" style={{ backgroundImage: `url(${element.imageUrl})` }}>
                                    <p className="pokemonNameOnCard">{element.name}</p>
                                </div>
                                <div className="pokemonCardBack pokemonCardBackFlipped" key={`back${element.id.toString()}`}></div>
                            </div>
                        </>
                    );
                })}
            </div>
        </>
    )
}

export { InitializeGame };
