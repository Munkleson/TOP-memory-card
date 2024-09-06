import { gameSettings } from "../gameSettingsVariables";
import { numberInput } from "./subcomponents/numberInputLogic";
import styles from "./GameModes.module.css";
import { gameModeData } from "./GameModeData";

///// For reference
//selectGameModeProps = {
//     timedOrNot,
//     customInputValue,
//     gameStart,
//     setcustomInputValue,
//     timedCheckBoxTicked,
//     setMenuGameModeFunction,
//     isMenuModeSelected,
//     selectedMenuGameMode,
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
                    {/* {props.selectedMenuGameMode === gameModeData.standard.name && <StandardGame props={props}/>}
                    {props.selectedMenuGameMode === gameModeData.classic.name && <ClassicGame props={props}/>} */}
                    <InsideCustomGameCheck props={props}/>
                </>
            )}
        </>
    );
}

function ModeSelectDisplay({ props }) {
    return (
        <>
            <p>Which game mode would you like to play?</p>
            <div className={styles.modesContainer}>
                <button className={styles.buttons} onClick={props.setMenuGameModeFunction}>
                    {gameModeData.classic.name}
                </button>
                <button className={styles.buttons} onClick={props.setMenuGameModeFunction}>
                    {gameModeData.standard.name}
                </button>
            </div>

            <button className={styles.buttons} onClick={props.enterAndLeaveGameModeSelectScreen}>
                Back
            </button>
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
            <br />
            <p className={styles.difficultyText}>Select your {gameModeData[props.selectedMenuGameMode].name} difficulty level</p>
            <div className={styles.modesContainer}>
                {gameModeData[props.selectedMenuGameMode].difficulties.map((element, index) => {
                    return (
                        <>
                            <button className={`${styles.buttons} ${styles.modeButtons}`} onClick={(event) => {
                                if (element === "Custom"){
                                    props.setInCustomGameMenuOrNot();
                                    props.setGameModeFunction(event);
                                } else {
                                    props.setGameModeFunction(event);
                                    props.gameStart(event);
                                }
                            }}>
                                {gameModeData[props.selectedMenuGameMode].difficulties[index]}
                            </button>
                        </>
                    )
                })}
            </div>
            <div className="timedModeDiv">
                <input type="checkbox" className="timedModeInput" onChange={props.timedOrNot} checked={props.timedCheckBoxTicked} />
                <span className="timedModeText" onClick={props.timedOrNot}>Timed mode (Optional)</span>
            </div>
            <button onClick={props.leaveSelectedMenuMode} className={styles.buttons}>Back</button>
        </>
    )
}

function CustomGame({ props }) {
    switch(props.selectedMenuGameMode){
        case "classic": 
            gameSettings.maxNumberOfPokemon = 30;
            break;
        case "standard":
            gameSettings.maxNumberOfPokemon = 99;
    }

    return (
        <>
            <br />
            <br />
            <p className="ballSecondaryInstructions">
                You can choose between {gameSettings.minNumberOfPokemon} and {gameSettings.maxNumberOfPokemon} different Pokémon to play with
            </p>
            <form action="" onSubmit={props.customGameStart} className="ballFormDiv">
                <div className={styles.inputAndButtonHolder}>
                    <input type="number" className="gameLimitNumberInput" placeholder="#" onChange={(event) => numberInput(event.target, props.setcustomInputValue, gameSettings.minNumberOfPokemon, gameSettings.maxNumberOfPokemon)} value={props.customInputValue} />
                    <input type="submit" value={"Start game"} className="startGameButton" />
                </div>
                <div className="timedModeDiv">
                    <input type="checkbox" className="timedModeInput" onChange={props.timedOrNot} checked={props.timedCheckBoxTicked} />
                    <span className="timedModeText" onClick={props.timedOrNot}>
                        Timed mode (Optional)
                    </span>
                </div>
                <button onClick={props.setInCustomGameMenuOrNot} className={styles.buttons}>Back</button>
            </form>
        </>
    );
}

export { SelectGameMode };
