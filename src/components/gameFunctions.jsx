import { useEffect, useState } from "react";
import { whichPokemon, shuffleArray } from "./subcomponents/gameModeFunctions";
import { storeInLocalStorage, getHighScore } from "./subcomponents/pointScoring";
import { flipCards, flipCardsBackToNormal } from "./subcomponents/cardFlipping";
import "./css_files/pokemonCardStyles.css";
import { HeaderBar, FooterBar } from "./headerFooterBars";
import { EndingScreen } from "./gameEnd";

function InitializeGame({ numberOfPokemon, pokemonData, currentVersion, resetGame, timed, maxPokemonPerRow }) {
    const [currentGamePokemon, setCurrentGamePokemon] = useState(whichPokemon(pokemonData, numberOfPokemon));
    const [clickedArray, setClickedArray] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [highScore, setHighScore] = useState(getHighScore(numberOfPokemon, timed));
    const [gameOver, setGameOver] = useState(false);
    const [currentlyFlipping, setFlippingStatus] = useState(false)
    const [finalCard, setFinalCard] = useState(null); //// the card that ends the game, either in a win or a loss
    const [gameResult, setGameResult] = useState("");
    const [gameActive, setGameActive] = useState(false);
    const [cardClickedCheck, setCardClickedCheck] = useState(false);
    const [allowedToClick, setClickAllowance] = useState(true); /// Remove this if I want people to stop spamming click/autoclickers

    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    // const [holderWidth, setHolderWidth] = useState(0)
    const holderWidth = cardHolderWidth(numberOfPokemon, viewWidth, maxPokemonPerRow);

    useEffect(() => { //// This is so the changes in window size will still evenly-ish distribute the amount of cards in each row. Edge case (like when opening console and restarting game then)
        const windowSizeHandler = () => {
            setViewWidth(window.innerWidth);
            // cardHolderWidth(numberOfPokemon, window.innerWidth, setHolderWidth)
        };
        window.addEventListener("resize", windowSizeHandler);
        return () => {
            window.removeEventListener("resize", windowSizeHandler);
        }
    }, []);

    function cardClick(id) {
        if (allowedToClick){ /// Remove this if I want people to stop spamming click/autoclickers
            if (!gameOver) {
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
                    };
                    //// flips cards only if the game is not over
                    if (updatedPoints !== numberOfPokemon){
                        flipCards();
                    };
                    //// victory function
                    if (updatedPoints === numberOfPokemon){
                        victoryFunction(id);
                    };
                    //// this setTimeout is needed so it will rerender with a shuffled array of pokemon to work with the flipping functions
                    setTimeout(() => {
                        if (updatedPoints !== numberOfPokemon){
                            setFlippingStatus(true);
                            setCurrentGamePokemon(shuffleArray(currentGamePokemon))
                            //// setTimeout is required based on how this is structured. The callback will manipulate the dom elements after the re-render with the cards showing the back side, and flip them back to front but after the cards have been shuffled
                            setTimeout(() => {
                                flipCardsBackToNormal();
                            }, 100);
                        };
                        setClickAllowance(true); //// This is done with a set timer so people can only click once the cards have turned sufficiently. Can set a setTimeout within this function to further extend that time so animations complete?
                    }, 700) //// this value is based on the transition time set in the CSS files. A bit unsynced but works
                } else { //// game lose functionality
                    gameOverFunction(id);
                };
            };
        }
    };

    function replayGame() {
        setCurrentGamePokemon(whichPokemon(pokemonData, numberOfPokemon));
        setClickedArray([]);
        setCurrentScore(0);
        setGameOver(false);
        setFlippingStatus(false);
        setFinalCard(null);
        setGameResult(false);
        setGameActive(false);
        setClickAllowance(true); /// Remove this if I want people to stop spamming click/autoclickers
    };

    function gameOverFunction(id){
        setFinalCard(id);
        setGameResult("loss");
        setGameOver(true);
        setFlippingStatus(false);
        setGameActive(false);

        setCardClickedCheckFunction();
    }

    function victoryFunction(id){
        setFinalCard(id);
        setGameResult("win");
        setGameOver(true);
        setFlippingStatus(false);
        setGameActive(false);

        setCardClickedCheckFunction();
    }

    function setCardClickedCheckFunction() { //// For the timer bar. Checks when the card has been clicked and makes it false after it has been clicked. Done this way for re-rendering purposes and passing down the clicked check as a prop to the timer bar.
        setCardClickedCheck(false);
    }

    return (
        <>
            <div id="topRelativeBar"></div>
            <HeaderBar replayGame={replayGame} highScore={highScore} currentScore={currentScore} resetGame={resetGame}/>
            { gameOver && <EndingScreen gameResult={gameResult} replayGame={replayGame}/> }
                {/* this br is needed otherwise the whole card div uncenters vertically due to the one below. Both could be removed though. They're just for visual buffers */}
                <br />
            { 
                !currentlyFlipping ? 
                <GameDisplay currentGamePokemon={currentGamePokemon} cardClick={cardClick} finalCard={finalCard} holderWidth={holderWidth} gameResult={gameResult}/>
                : 
                <CardsInMotion currentGamePokemon={currentGamePokemon} cardClick={cardClick} holderWidth={holderWidth}/> 
            }
                {/* this br is needed otherwise the whole card div uncenters vertically due to the one above. Both could be removed though. They're just for visual buffers */}
                <br /> 
            <FooterBar timed={timed} gameOverFunction={gameOverFunction} gameActive={gameActive} cardClickedCheck={cardClickedCheck} setCardClickedCheckFunction={setCardClickedCheckFunction} gameOver={gameOver}/>
        </>
    );
}

function GameDisplay({ currentGamePokemon, cardClick, finalCard, holderWidth, gameResult }) {
    return (
        <div className="mainGameBodyDiv">
            <div className="cardHolder" style={{paddingLeft: `${holderWidth}px`, paddingRight: `${holderWidth}px`}}>
                {currentGamePokemon.map((element) => {
                    return (
                        <CardMap key={element.id} elementId={element.id} finalCard={finalCard} cardClick={cardClick} element={element} gameResult={gameResult}/>
                    );
                })}
            </div>
        </div>

    );
};

function CardsInMotion({ currentGamePokemon, cardClick, holderWidth }){
    return (
        <div className="mainGameBodyDiv">
            <div className="cardHolder" style={{paddingLeft: `${holderWidth}px`, paddingRight: `${holderWidth}px`}}>
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
        </div>
    )
};

function CardMap ({ keyValue, finalCard, cardClick, element, gameResult }){
    return (
        <div className="cardDiv" key={keyValue}>
            { finalCard === element.id ? (
                gameResult === "win" ? 
                <div onClick={(event) => cardClick(element.id, event.target)} className="pokemonCardFront" style={{ backgroundImage: `url(${element.imageUrl})`, backgroundColor: 'rgb(90, 218, 90)'}}>
                    <p className="pokemonNameOnCard">{element.name}</p> 
                </div>
                :
                <div onClick={(event) => cardClick(element.id, event.target)} className="pokemonCardFront" style={{ backgroundImage: `url(${element.imageUrl})`, backgroundColor: 'red'}}>
                    <p className="pokemonNameOnCard">{element.name}</p> 
                </div>
            )
            : 
                <div onClick={(event) => cardClick(element.id, event.target)} className="pokemonCardFront" style={{ backgroundImage: `url(${element.imageUrl})`}}>
                    <p className="pokemonNameOnCard">{element.name}</p> 
                </div>
            }   
            <div className="pokemonCardBack"></div>
        </div>
    );
};

function cardHolderWidth(numberOfPokemon, viewWidth, maxPokemonPerRow) {
    if (numberOfPokemon > maxPokemonPerRow){
        // setHolderWidth((viewWidth - 20 - (Math.ceil(numberOfPokemon / Math.ceil(numberOfPokemon / 7)) * 200 + 5)) / 2);
        return (viewWidth - 20 - (Math.ceil(numberOfPokemon / Math.ceil(numberOfPokemon / maxPokemonPerRow)) * 180 + 5)) / 2;
    } else {
        // setHolderWidth(0);
        return 0;
    }
};

export { InitializeGame };
