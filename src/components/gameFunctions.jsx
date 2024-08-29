import { useState } from "react";
import { whichPokemon, shuffleArray } from "./subcomponents/gameModeFunctions";
import { storeInLocalStorage, getHighScore } from "./subcomponents/pointScoring";
import { flipCards, flipCardsBackToNormal } from "./subcomponents/cardFlipping";
import "./css_files/pokemonCardStyles.css";
import HeaderBar from "./headerBar";
import { EndingScreen } from "./gameEnd";

function InitializeGame({ numberOfPokemon, pokemonData, currentVersion, resetGame }) {
    const [currentGamePokemon, setCurrentGamePokemon] = useState(whichPokemon(pokemonData, numberOfPokemon));
    const [clickedArray, setClickedArray] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [highScore, setHighScore] = useState(getHighScore(numberOfPokemon));
    const [gameOver, setGameOver] = useState(false);
    const [currentlyFlipping, setFlippingStatus] = useState(false)
    const [losingCard, setLosingCard] = useState(null);
    const [gameResult, setGameResult] = useState("");

    function cardClick(id) {
        if (!gameOver) {
            //// checks if the same pokemon has been clicked already
            if (!clickedArray.includes(id)) {
                setClickedArray([...clickedArray, id]);
                const updatedPoints = currentScore + 1;
                setCurrentScore(updatedPoints);
                //// high score functionality
                if (updatedPoints > highScore) {
                    setHighScore(updatedPoints);
                    storeInLocalStorage(updatedPoints, currentVersion, numberOfPokemon);
                }
                //// flips cards only if the game is not over
                if (updatedPoints !== numberOfPokemon){
                    flipCards();
                }
                //// this setTimeout is needed so it will rerender with a shuffled array of pokemon
                setTimeout(() => {
                    if (updatedPoints === numberOfPokemon){ /// Winning function - To be continued
                        setGameOver(true);
                        setFlippingStatus(false);
                        setGameResult("win");
                    } else {
                        setFlippingStatus(true);
                        setCurrentGamePokemon(shuffleArray(currentGamePokemon))
                        //// setTimeout is required based on how this is structured. The callback will manipulate the dom elements after the re-render with the cards showing the back side, and flip them back to front but after the cards have been shuffled
                        setTimeout(() => {
                            flipCardsBackToNormal();
                        }, 100);
                    }
                }, 600)
            } else { //// game lose functionality - To be continued
                setGameOver(true);
                setFlippingStatus(false)
                setLosingCard(id);
                setGameResult("loss")
            }
        }
    };

    function replayGame() {
        setCurrentGamePokemon(whichPokemon(pokemonData, numberOfPokemon));
        setClickedArray([]);
        setCurrentScore(0);
        setGameOver(false);
        setFlippingStatus(false);
        setLosingCard(null);
        setGameResult(false);
    }

    return (
        <>
            <div id="topRelativeBar"></div>
            <HeaderBar replayGame={replayGame} highScore={highScore} currentScore={currentScore} resetGame={resetGame}/>
            { gameOver && <EndingScreen gameResult={gameResult} /> }
                <br />
            { 
            !currentlyFlipping ? 
            <GameDisplay currentGamePokemon={currentGamePokemon} cardClick={cardClick} losingCard={losingCard}/>
            : 
            <CardsInMotion currentGamePokemon={currentGamePokemon} cardClick={cardClick}/> 
            }
        </>
    );
}

function GameDisplay({ currentGamePokemon, cardClick, losingCard }) {
    return (
        <div className="cardHolder">
            {currentGamePokemon.map((element) => {
                return (
                    <CardMap key={element.id} elementId={element.id} losingCard={losingCard} cardClick={cardClick} element={element}/>
                );
            })}
        </div>
    );
}

function CardMap ({ key, losingCard, cardClick, element }){
    return (
        <div className="cardDiv" key={key}>
            { losingCard === element.id ?
                <div onClick={(event) => cardClick(element.id, event.target)} className="pokemonCardFront" style={{ backgroundImage: `url(${element.imageUrl})`, backgroundColor: 'red'}}>
                    <p className="pokemonNameOnCard">{element.name}</p> 
                </div>
            : 
                <div onClick={(event) => cardClick(element.id, event.target)} className="pokemonCardFront" style={{ backgroundImage: `url(${element.imageUrl})`}}>
                    <p className="pokemonNameOnCard">{element.name}</p> 
                </div>
            }   
            <div className="pokemonCardBack"></div>
        </div>
    );
};

function CardsInMotion({ currentGamePokemon, cardClick }){
    return (
        <div className="cardHolder">
            {currentGamePokemon.map((element) => {
                return (
                    <div className="cardDiv" key={element.id}>
                        <div onClick={(event) => cardClick(element.id, event.target)} className="pokemonCardFront pokemonCardFrontFlipped" style={{ backgroundImage: `url(${element.imageUrl})` }}>
                            <p className="pokemonNameOnCard">{element.name}</p>
                        </div>
                        <div className="pokemonCardBack pokemonCardBackFlipped"></div>
                    </div>
                );
            })}
        </div>
    )
}

export { InitializeGame };
