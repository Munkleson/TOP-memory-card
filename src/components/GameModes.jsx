import { numberInput } from "./subcomponents/numberInputLogic";
import styles from "./GameModes.module.css";
import { gameModeData } from "./GameModeData";
import GameModeSettings from "./GameModeSettings";

///// For reference
//selectGameModeProps = {
//     timedOrNot,
//     customInputValue,
//     gameStart,
//     setcustomInputValue,
//     timedCheckBoxTicked,
//     setGameModeFunction,
//     isMenuModeSelected,
//     gameMode,
//     leaveSelectedMenuMode,
//     enterAndLeaveGameModeSelectScreen,
//     setInCustomGameMenuOrNot,
//     insideCustomGameMenu
// };

function SelectGameMode({ props }) {
    return (
        <>
            {!props.isMenuModeSelected ? (
                <ModeSelectDisplay props={props} />
            ) : (
                <>
                    <InsideCustomGameCheck props={props}/>
                </>
            )}
        </>
    );
}

function ModeSelectDisplay({ props }) {
    return (
        <>
            <p className={styles.whichGameModeText}>Which game mode would you like to play?</p>
            <div className={styles.modesContainer}>
                {Object.keys(gameModeData).map((element, index) => {
                    return <button className={styles.buttons} onClick={props.setGameModeFunction} key={index} style={{padding: element === "fifty-fifty mix" && "0px"}}>
                        {gameModeData[element].name}
                    </button> 
                })}
            </div>
            <button className={`${styles.buttons} ${styles.backButton}`} onClick={props.enterAndLeaveGameModeSelectScreen}>
                Back
            </button>
            <button className={styles.instructionsButton} onClick={() => {
                props.openAndCloseInstructions();
            }} title="Instructions">?</button>
        </>
    );
}

function InsideCustomGameCheck({ props }){
    return (
        <>
            {
                !props.insideCustomGameMenu ? <DifficultySelect props={props} /> : <CustomGame props={props}/>
            }
        </>
    )
}

function DifficultySelect({ props }){
    return (
        <>
            <p className={styles.titleText}>{gameModeData[props.gameMode].name}</p>
            <p className={styles.difficultyText}>Select difficulty</p>
            <div className={styles.modesContainer}>
                {gameModeData[props.gameMode].difficulties.map((element, index) => {
                    return (
                        <>
                            <button key={index} className={`${styles.buttons} ${styles.modeButtons}`} onClick={(event) => {
                                if (element === "Custom"){
                                    props.setInCustomGameMenuOrNot();
                                    props.setGameModeAndDifficultyFunction(event);
                                } else {
                                    props.setGameModeAndDifficultyFunction(event);
                                    props.gameStart(event);
                                }
                            }}>
                                {gameModeData[props.gameMode].difficulties[index]}
                            </button>
                        </>
                    )
                })}
            </div>
            {props.gameMode !== "fifty-fifty mix" ? 
                <div className="timedModeDiv">
                    <input type="checkbox" className="timedModeInput" onChange={props.timedOrNot} checked={props.timedCheckBoxTicked} />
                    <span className="timedModeText" onClick={props.timedOrNot}>Timed mode (Optional)</span>
                </div>
            :
                <p className="timedModeText">Timed mode only</p>
            }
            <button onClick={props.leaveSelectedMenuMode} className={`${styles.buttons} ${styles.backButton}`}>Back</button>
        </>
    )
}
//// should be stored in an object, not here
function CustomGame({ props }) {
    return (
        <>
            <br />
            <br />
            <p className="ballSecondaryInstructions">
                You can choose between {GameModeSettings[props.gameMode].Custom.minCards} and {GameModeSettings[props.gameMode].Custom.maxCards} different Pokémon to play with
            </p>
            <form action="" onSubmit={props.customGameStart} className="ballFormDiv">
                <div className={styles.inputAndButtonHolder}>
                    <input type="number" className="gameLimitNumberInput" placeholder="#" onChange={(event) => numberInput(event.target, props.setcustomInputValue, GameModeSettings[props.gameMode].Custom.minCards, GameModeSettings[props.gameMode].Custom.maxCards)} value={props.customInputValue} 
                    onKeyDown={event => {
                        if (event.key === "."){
                            event.preventDefault();
                        }
                    }}/>
                    <input type="submit" value={"Start game"} className="startGameButton" />
                </div>
                {props.gameMode !== "fifty-fifty mix" ? 
                    <div className="timedModeDiv">
                        <input type="checkbox" className="timedModeInput" onChange={props.timedOrNot} checked={props.timedCheckBoxTicked} />
                        <span className="timedModeText" onClick={props.timedOrNot}>
                            Timed mode (Optional)
                        </span>
                    </div>
                :
                    <p className="timedModeText">Timed mode only</p>
                }
                <button onClick={props.setInCustomGameMenuOrNot} className={styles.buttons}>Back</button>
            </form>
        </>
    );
}

export { SelectGameMode };
