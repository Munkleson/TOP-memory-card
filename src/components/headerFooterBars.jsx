import { useEffect, useState } from "react";
import "./css_files/headerFooterBar.css";
import { gameSettings } from "../gameSettingsVariables";
import GameModeSettings from "./GameModeSettings";

let timeWhenTimerStarted; //// global object for checking 

function HeaderBar({ backToHomePage, replayGame, highScore, currentScore}) {

    return (
        <>
            <header id="headerBar">
                <button onClick={backToHomePage} className="headerButtons">
                    Back
                </button>
                <button onClick={replayGame} className="headerButtons">
                    Restart game
                </button>
                {!gameSettings.mobileOrNot && <div className="headerPokemonLogo"></div>}
                <p className="currentScoreTextHolder">
                    Current score: <span className="currentScoreText">{currentScore}</span>
                </p>
                <p className="highScoreTextHolder">
                    High score for current mode: <span className="highScoreText">{highScore}</span>
                </p>
            </header>
        </>
    );
}

function FooterBar({ timed, gameOverFunction, gameActive, cardClickedCheck, setCardClickedCheckFunction, gameOver, gameModeAndDifficultyProps, fiftyFiftyMixProps }) {
    return (
        <>
            {timed && (
                <div className="footerBar" style={{ backgroundColor: "rgb(255, 255, 255, 0)" }}>
                    <TimerBar gameOverFunction={gameOverFunction} gameActive={gameActive} cardClickedCheck={cardClickedCheck} setCardClickedCheckFunction={setCardClickedCheckFunction} gameOver={gameOver} gameModeAndDifficultyProps={gameModeAndDifficultyProps} ffProps={fiftyFiftyMixProps}/>
                </div>
            )}
        </>
    );
}

function TimerBar({ gameOverFunction, gameActive, cardClickedCheck, setCardClickedCheckFunction, gameOver, gameModeAndDifficultyProps, ffProps }) {
    const [timerBarSizeElement, setTimerBarSizeElement] = useState(0);
    const [timerBarActive, setTimerBarState] = useState(false);
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    // const viewWidth = window.innerWidth;
    const [isGameActive, setGameActiveState] = useState(gameActive);
    
    //// Timer retrieved and set below
    const marginAmount = (timerBarSizeElement / GameModeSettings[gameModeAndDifficultyProps.gameMode].timer) * viewWidth;

    if (gameActive && !isGameActive) {
        setTimerBarState(true);
        setGameActiveState(true);
    }
    
    //// Resets the timer whenever a card is clicked
    useEffect(() => {
        //// Why does this need to be an effect and not a state update like above? Getting an error with the above one where it causes an error because it re-renders too many times
        if (cardClickedCheck) {
            setCardClickedCheckFunction();
            setTimerBarSizeElement(0);
            timeWhenTimerStarted = Date.now();
        }
        !gameActive && setTimerBarSizeElement(0);
    }, [cardClickedCheck, setCardClickedCheckFunction, gameActive]);

    if (!gameActive && isGameActive) {
        //// Victory function
        setTimerBarState(false);
        setGameActiveState(false);
        setTimerBarSizeElement(0);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (timerBarActive && !(marginAmount >= viewWidth)) {
                // setTimerBarSizeElement((timerBarSizeElement) => timerBarSizeElement + 10);
                setTimerBarSizeElement(Date.now() - timeWhenTimerStarted);
            } else if (marginAmount >= viewWidth) {
                if (!ffProps.fiftyFiftyMixBothFalse){ //// checks if it is a fifty fifty mix both cards already clicked scenario
                    setTimerBarState(false);
                    setGameActiveState(false);
                    setTimerBarSizeElement(0);
                    gameOverFunction();
                } else {
                    setCardClickedCheckFunction();
                    setTimerBarSizeElement(0);
                    timeWhenTimerStarted = Date.now();
                    ffProps.setCurrentlyDisplayedCards(ffProps.fiftyFiftyMixShuffle(ffProps.currentGamePokemon, ffProps.maxNumberOfPokemonShown, [...ffProps.clickedArray], ffProps.fiftyFiftyMixRngCounter, ffProps.setFiftyFiftyMixRngCounter, ffProps.setFiftyFiftyMixBothFalse));
                    ffProps.setFiftyFiftyMixBothFalse(false);
                }
            }
        }, 10);
        return () => clearInterval(interval);
    }, [timerBarActive, marginAmount, viewWidth, gameOverFunction, ffProps, setCardClickedCheckFunction]);

    useEffect(() => {
        //// edge case for if someone makes the window smaller. There is a potential issue in that it would trigger another setTimeout though
        const windowSizeHandler = () => {
            setViewWidth(window.innerWidth);
        };
        window.addEventListener("resize", windowSizeHandler);
        return () => {
            window.removeEventListener("resize", windowSizeHandler);
        };
    }, []);

    return <>{!gameOver && (timerBarActive ? <div className="timerBar" style={{ marginRight: `${marginAmount}px`, borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }}></div> : <div className="timerBar" style={{ marginRight: marginAmount }}></div>)}</>;
}

export { HeaderBar, FooterBar };

