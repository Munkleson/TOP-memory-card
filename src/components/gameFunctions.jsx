import { useState } from "react";
import { whichPokemon, shuffleArray } from "./gameModeFunctions";
import { storeInLocalStorage, getHighScore } from "./pointScoring";
import "./pokemonCardStyles.css";

function InitializeGame({ numberOfPokemon, pokemonData, currentVersion }) {
    const [currentGamePokemon, setCurrentGamePokemon] = useState(whichPokemon(pokemonData, numberOfPokemon));
    const [clickedArray, setClickedArray] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [highScore, setHighScore] = useState(getHighScore());
    const [gameOver, setGameOver] = useState(false);

    function cardClick(id) {
        if (!gameOver) {
            if (!clickedArray.includes(id)) {
                setCurrentGamePokemon(shuffleArray(currentGamePokemon));
                setClickedArray([...clickedArray, id]);
                const updatedPoints = currentScore + 1;
                setCurrentScore(updatedPoints);
                if (updatedPoints > highScore) {
                    setHighScore(updatedPoints);
                    storeInLocalStorage(updatedPoints, currentVersion);
                }
            } else {
                setGameOver(true);
            }
        }
    }

    function replayGame() {
        setGameOver(false);
        setCurrentScore(0);
        setCurrentGamePokemon(whichPokemon(pokemonData, numberOfPokemon));
        setClickedArray([]);
    }

    return (
        <>
            <br />
            <button onClick={replayGame}>Replay</button>
            <GameDisplay currentGamePokemon={currentGamePokemon} cardClick={cardClick} currentScore={currentScore} highScore={highScore}/>
        </>
    );
}

function GameDisplay({ currentGamePokemon, cardClick, currentScore, highScore }) {
    return (
        <>
            <p>{highScore}</p>
            <p>{currentScore}</p>
            <div className="cardHolder">
                {currentGamePokemon.map((element) => {
                    return (
                        <div onClick={() => cardClick(element.id)} key={element.id} className="pokemonCard" style={{ backgroundImage: `url(${element.imageUrl})` }}>
                            {element.name}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export { InitializeGame };
