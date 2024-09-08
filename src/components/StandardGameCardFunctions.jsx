import { gameSettings } from "../gameSettingsVariables";
import styles from "./StandardGameCardFunctions.module.css";

///// The flip card logic doesn't work if they are placed here for some reason, even when passing down a prop that checks if the game is active. They will remain in the gameFunctions.jsx for now

function StandardGame({ cardClick, finalCard, gameResult, numberOfPokemon, currentlyFlipping, currentlyDisplayedCards, gameMode, maxNumberOfPokemonShown, cardsRemaining, cardsRemainingInitialValue }) {
    const counterColor = cardsRemainingColorSetter(cardsRemaining, cardsRemainingInitialValue);
    return (
        <div className={styles.mainGameBodyDiv}>
            <div className={styles.container}>        
                <p className={styles.cardsRemainingText}>Cards remaining: <span className={styles.counterText} style={{color: counterColor}}>{cardsRemaining}</span></p>
                {currentlyDisplayedCards.map((element, index) => {
                    return <DisplayCards key={element.id} elementId={element.id} finalCard={finalCard} cardClick={cardClick} element={element} gameResult={gameResult} index={index} numberOfPokemon={numberOfPokemon} currentlyFlipping={currentlyFlipping} gameMode={gameMode} maxNumberOfPokemonShown={maxNumberOfPokemonShown}/>;
                })}
            </div>
        </div>
    );
}

function DisplayCards({ finalCard, cardClick, element, gameResult, index, currentlyFlipping, gameMode, maxNumberOfPokemonShown }) {
    const indexToInsertSeparatorDiv = Math.ceil(maxNumberOfPokemonShown / Math.ceil(maxNumberOfPokemonShown / 3)); //// Hard coded here because it'll never be needed anywhere else realistically
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
                > {element.name}
                </div>
                <div className={currentlyFlipping ? `${styles.back} ${styles.backFlipped}` : styles.back}></div>
            </div>
            { !gameSettings.mobileOrNot && ( //// Not mobile line separators
                difficulty === "Easy" ? null
                :
                    (difficulty === "Medium" ?  
                        ((index === 2) && <div className={styles.separatorDiv}></div>)
                    :
                        difficulty !== "Custom" ? ((index === 2 || index === 5) && <div className={styles.separatorDiv}></div>) 
                        :
                            ((index === indexToInsertSeparatorDiv - 1 || index === (indexToInsertSeparatorDiv * 2 - 1)) && <div className={styles.separatorDiv}></div>)
                    )
                ) 
            }
            { gameSettings.mobileOrNot && ( //// Mobile line separators
                difficulty === "Easy" ? null
                :
                    (difficulty === "Medium" ?  
                        ((index === 1 || index === 3)  && <div className={styles.separatorDiv}></div>)
                    :
                        (difficulty !== "Custom" ? (index === 2 || index === 5) && <div className={styles.separatorDiv}></div> 
                        :
                            ((index === indexToInsertSeparatorDiv - 1) && <div className={styles.separatorDiv}></div>)
                        )
                    )
                ) 
            }
        </>
    );
}

function cardsRemainingColorSetter(){ //// Function is here if I ever want to change the color of the text based on how many cards are left. Will need to set parameters here
    return '#FFCC01';
};

export { StandardGame };