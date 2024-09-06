import { gameSettings } from "../gameSettingsVariables";
import styles from "./StandardGameCardFunctions.module.css";

///// The flip card logic doesn't work if they are placed here for some reason, even when passing down a prop that checks if the game is active. They will remain in the gameFunctions.jsx for now

function StandardGame({ cardClick, finalCard, gameResult, numberOfPokemon, currentlyFlipping, currentlyDisplayedCards, gameMode }) {
    return (
        <div className={styles.mainGameBodyDiv}>
            <div className={styles.container}>
                {currentlyDisplayedCards.map((element, index) => {
                    return <DisplayCards key={element.id} elementId={element.id} finalCard={finalCard} cardClick={cardClick} element={element} gameResult={gameResult} index={index} numberOfPokemon={numberOfPokemon} currentlyFlipping={currentlyFlipping} gameMode={gameMode}/>;
                })}
            </div>
        </div>
    );
}

function DisplayCards({ finalCard, cardClick, element, gameResult, index, currentlyFlipping, gameMode }) {
    const difficulty = gameMode.slice(8);
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
            { !gameSettings.mobileOrNot && ( //// Not mobile line separators
                difficulty === "Easy" ? null
                :
                    (difficulty === "Medium" ?  
                        ((index === 2) && <div className={styles.separatorDiv}></div>)
                        :
                        ((index === 2 || index === 5) && <div className={styles.separatorDiv}></div>)
                    )
                ) 
            }
            { gameSettings.mobileOrNot && ( //// Mobile line separators
                difficulty === "Easy" ? null
                :
                    (difficulty === "Medium" ?  
                        ((index === 1 || index === 3)  && <div className={styles.separatorDiv}></div>)
                        :
                        ((index === 2 || index === 5) && <div className={styles.separatorDiv}></div>)
                    )
                ) 
            }
        </>
    );
}

export { StandardGame };
