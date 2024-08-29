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

function EndingScreen({ gameResult }){
    const [endScreenActive, setEndScreenActive] = useState(false);
    const timeoutTime = (gameResult === "win") ? 2500 : 1000;
    if (!endScreenActive){
        setTimeout(() => {
            setEndScreenActive(true);
        }, timeoutTime);
    }
    return (
        <>
            { gameResult === "win" && <ConfettiComponent /> };
            { endScreenActive && ((gameResult === "win") ?
                <VictoryScreen />
                :
                <LosingScreen />)
            }
        </>
    )
}

function VictoryScreen(){
    return (
        <div className="endingScreen">
            You win
        </div>
    )
}

function LosingScreen(){
    return (
        <div className="endingScreen">
            You lose
        </div>
    )
}

export { EndingScreen }