import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./css_files/gameSystems.css"

function ConfettiComponent() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const gravity = 0.2;
    return (
        <Confetti width={width} height={height} gravity={gravity}/>
    )
};

function EndingScreen({ gameResult, replayGame }){
    const [endScreenActive, setEndScreenActive] = useState(false);
    const [lossFlashActive, setLossFlashActiveState] = useState(false);
    const [dummyCheck, setDummyCheck] = useState(false);

    const timeoutTime = (gameResult === "win") ? 1500 : 2500;
    let result = "";
    switch (gameResult) {
        case "win":
            result = "You win";
            break;
        case "loss":
            result = "Try again!";
            break
    }
    if (!endScreenActive){
        setTimeout(() => {
            setEndScreenActive(true);
        }, timeoutTime);
    }

    useEffect(() => {
        if (gameResult === "loss" && !lossFlashActive && !dummyCheck){
            setLossFlashActiveState(true);
            setDummyCheck(true);
            setTimeout(() => {
                setLossFlashActiveState(false);
            }, 3000);
        }
    }, [gameResult, lossFlashActive, dummyCheck]); //// I believe a dependency array and effect is absolutely needed here, because if I don't have it, the setTimeout is going to go haywire and not work as intended?

    return (
        <>
            { gameResult === "win" && <ConfettiComponent /> }
            { (gameResult === "loss" && lossFlashActive) && <div className="redFlashScreen"></div>}
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