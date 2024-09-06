import { gameSettings } from "../gameSettingsVariables";
import styles from "./HowToPlay.module.css";

export default function HowToPlay({ openAndCloseHowToPlay }){
    return (
        <>
            <div className={styles.container}>
                <div className={styles.subContainer}>
                    <div className={styles.titleDiv}>
                        <h2 className={styles.title}>How to play</h2>
                    </div>
                    <div className={styles.instructionsDiv}>
                        <h3 className={styles.subHeading}>Overview</h3>

                        <p className={styles.subText}>• This is a memory game where you have to remember which Pokémon you have already clicked.</p>
                        <p className={styles.subText}>• Each round will have a certain number of Pokémon based on your chosen game mode, and each time you click on a Pokémon their position will shuffle</p>
                        <p className={styles.subText}>• You win if you click on all the Pokémon without picking the same one twice</p>

                        <h3 className={styles.subHeading}>Timed mode</h3>

                        <p className={styles.subText}>• You have the option to play the game with a {gameSettings.timer / 1000} second timer. If it reaches 0, you also lose!</p>

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





