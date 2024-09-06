import { gameSettings } from "../gameSettingsVariables";
import styles from "./ClassicGameCardFunctions.module.css";

///// The flip card logic doesn't work if they are placed here for some reason, even when passing down a prop that checks if the game is active. They will remain in the gameFunctions.jsx for now

function ClassicGame({ currentGamePokemon, cardClick, finalCard, gameResult, numberOfPokemon, currentlyFlipping }) {
    return (
        <div className={styles.mainGameBodyDiv}>
            <div className={styles.container}>
                {currentGamePokemon.map((element, index) => {
                    return <DisplayCards key={element.id} elementId={element.id} finalCard={finalCard} cardClick={cardClick} element={element} gameResult={gameResult} index={index} numberOfPokemon={numberOfPokemon} currentlyFlipping={currentlyFlipping} />;
                })}
            </div>
        </div>
    );
}

function DisplayCards({ finalCard, cardClick, element, gameResult, index, numberOfPokemon, currentlyFlipping }) {
    const indexToInsertSeparatorDiv = Math.ceil(numberOfPokemon / Math.ceil(numberOfPokemon / gameSettings.maxPokemonPerRow));
    return (
        <>
            <div className={styles.card}>
                <div
                    onClick={(event) => cardClick(element.id, event.target)}
                    className={currentlyFlipping ? `${styles.front} ${styles.frontFlipped}` : styles.front}
                    style={{
                        backgroundImage: `url(${element.imageUrl})`,
                        backgroundColor: finalCard === element.id && (gameResult === "win" ? "rgb(90, 218, 90)" : "red"),
                    }}
                >
                    <p className={styles.pokemonName}>{element.name}</p>
                </div>
                <div className={currentlyFlipping ? `${styles.back} ${styles.backFlipped}` : styles.back}></div>
            </div>
            { !gameSettings.mobileOrNot && //// Not mobile
                ((index === indexToInsertSeparatorDiv - 1 || index === indexToInsertSeparatorDiv * 2 - 1) && <div className={styles.separatorDiv}></div>)}
            { gameSettings.mobileOrNot && //// Mobile
                ((index === indexToInsertSeparatorDiv - 1 || index === indexToInsertSeparatorDiv * 2 - 1 || index === indexToInsertSeparatorDiv * 3 - 1 || index === indexToInsertSeparatorDiv * 4 - 1 || index === indexToInsertSeparatorDiv * 5 - 1) && <div className={styles.separatorDiv}></div>)}
        </>
    );
}

export { ClassicGame };
