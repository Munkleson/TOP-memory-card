import { gameSettings } from "../gameSettingsVariables";
import styles from "./HowToPlay.module.css";
import { useEffect } from "react";

export default function HowToPlay({ openAndCloseHowToPlay }){
    useEffect(() => {
        const titleDiv = document.querySelector(`.${styles.titleDiv}`);
        const footerDiv = document.querySelector(`.${styles.footer}`)
        const touchMoveFunction = (event) => {
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
        titleDiv.addEventListener("touchmove", touchMoveFunction, { passive: false });
        footerDiv.addEventListener("touchmove", touchMoveFunction, { passive: false });
        return () => {
            titleDiv.removeEventListener("touchmove", touchMoveFunction);
            footerDiv.removeEventListener("touchmove", touchMoveFunction);
        };
    }, []);
    return (
        <>
            <div className={styles.container}>
                <div className={styles.subContainer}>
                    <div className={styles.titleDiv}>
                        <h2 className={styles.title}>How to play</h2>
                    </div>
                    <div className={styles.instructionsDiv}>
                        <h3 className={styles.subHeading}>Overview</h3>
                        <p className={styles.subText}>• This is a memory game where you have to remember which Pokémon you have already {gameSettings.mobileOrNot ? "tapped" : "clicked"} on, and avoid choosing them again</p>
                        <p className={styles.subText}>• Each round will have a certain number of Pokémon based on your chosen game mode, and each time you {gameSettings.mobileOrNot ? "tap on" : "click"} a Pokémon their position will shuffle</p>
                        <p className={styles.subText}>• You win if you {gameSettings.mobileOrNot ? "tap" : "click"} on all the Pokémon without choosing the same one twice</p>

                        <h3 className={styles.subHeading}>Timed mode</h3>
                        <p className={styles.subText}>• You have the option to play the game with a {gameSettings.timer / 1000} second timer. If it reaches 0, you also lose!</p>

                        <h3 className={styles.subHeading}>Scoring</h3>
                        <p className={styles.subText}>• Scoring is dependent on the game mode you are currently playing. Playing timed will also result in a different scoring system</p>

                        <h3 className={styles.subHeading}>Misc.</h3>
                        <p className={styles.subText}>• Are there secrets to discover in this game? Hmmm, who knows.....</p>
                    </div>
                </div>
                <div className={styles.footer}>
                    <button onClick={openAndCloseHowToPlay} className={styles.closeButton}>Close</button>
                </div>
            </div>
        </>
    )
}





