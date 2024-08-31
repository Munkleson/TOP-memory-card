import { useEffect, useState } from "react";
import "./css_files/headerFooterBar.css";

function HeaderBar({ resetGame, replayGame, highScore, currentScore }) {
    return (
        <header id="headerBar">
            <button onClick={resetGame} className="headerButtons">
                Back to home
            </button>
            <button onClick={replayGame} className="headerButtons">
                Restart game
            </button>
            <div className="headerPokemonLogo"></div>
            <p>Current score: <span className="currentScoreText">{currentScore}</span></p>
            <p>High score for current mode: <span className="highScoreText">{highScore}</span></p>
        </header>
    );
}

function FooterBar({ timed, gameOverFunction, gameActive, cardClickedCheck, setCardClickedCheckFunction, gameOver }) {
    return (
        <>
            {timed && 
                    <div className="footerBar" style={{ backgroundColor: "white" }}>
                        {timed && <TimerBar gameOverFunction={gameOverFunction} gameActive={gameActive} cardClickedCheck={cardClickedCheck} setCardClickedCheckFunction={setCardClickedCheckFunction} gameOver={gameOver}/>}
                    </div>
            }

        </>
    );
}

function TimerBar({ gameOverFunction, gameActive, cardClickedCheck, setCardClickedCheckFunction, gameOver }) {
    const [timerBarSizeElement, setTimerBarSizeElement] = useState(0);
    const [timerBarActive, setTimerBarState] = useState(false);
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    const [isGameActive, setGameActiveState] = useState(gameActive);

    const timerLength = 5000; //// How long the timer is in milliseconds
    const marginAmount = (timerBarSizeElement / timerLength) * viewWidth;

    if (gameActive && !isGameActive) {
        setTimerBarState(true);
        setGameActiveState(true);
    }

    if (cardClickedCheck) {
        //// reset the bar on a card being clicked
        setCardClickedCheckFunction();
        setTimerBarSizeElement(0);
    }

    if (!gameActive && isGameActive) {
        //// Victory function
        setTimerBarState(false);
        setGameActiveState(false);
        setTimerBarSizeElement(0);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (timerBarActive && !(marginAmount >= viewWidth)) {
                setTimerBarSizeElement((timerBarSizeElement) => timerBarSizeElement + 10);
            } else if (marginAmount >= viewWidth) {
                setTimerBarState(false);
                setGameActiveState(false);
                setTimerBarSizeElement(0);
                gameOverFunction();
            }
        }, 10);
        return () => clearInterval(interval);
    }, [timerBarActive, marginAmount, viewWidth, gameOverFunction]);

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

    return (
        <>
        { !gameOver && (
            timerBarActive ? 
            <div className="timerBar" style={{ marginRight: marginAmount, borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }}></div>
            :
            <div className="timerBar" style={{ marginRight: marginAmount }}></div>
        )} 
        </>
    );
}

export { HeaderBar, FooterBar };
