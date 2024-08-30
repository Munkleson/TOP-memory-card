import { useState } from "react";
import Confetti from "react-confetti";
import "./css_files/gameSystems.css"

function ConfettiComponent() {
    const width = "1800";
    const height = "900";
    const gravity = 0.2;
    return (
        <Confetti width={width} height={height} gravity={gravity}/>
    )
};

function EndingScreen({ gameResult, replayGame }){
    const [endScreenActive, setEndScreenActive] = useState(false);
    const timeoutTime = (gameResult === "win") ? 1500 : 1000;
    let result = "";
    switch (gameResult) {
        case "win":
            result = "You win";
            break;
        case "loss":
            result = "You lose";
            break
    }
    if (!endScreenActive){
        setTimeout(() => {
            setEndScreenActive(true);
        }, timeoutTime);
    }
    return (
        <>
            { gameResult === "win" && <ConfettiComponent /> };
            { endScreenActive && <EndScreen gameResult={result} replayGame={replayGame} />}
        </>
    )
}

function EndScreen({ gameResult, replayGame }) {
    return (
        <div className="endingScreen">
            <div className="endBoxTop"></div>
            <div className="endBoxMiddle"></div>
            <div className="endBoxBottom">
                <button onClick={replayGame} className="playAgainButton">Play again</button>
            </div>
            <div className="endBoxMiddleBall">
                <p className="resultDiv">{gameResult}</p>
            </div>
        </div>
    );
};

export { EndingScreen }