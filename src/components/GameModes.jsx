import { gameSettings } from "../gameSettingsVariables";
import { numberInput } from "./subcomponents/numberInputLogic";
import styles from "./GameModes.module.css";
import { gameModeData } from "./GameModeData";

///// For reference
//selectGameModeProps = {
//     timedOrNot,
//     classicCustomInputValue,
//     gameStart,
//     setClassicCustomInputValue,
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
                    {props.selectedMenuGameMode === gameModeData.classic.name && <ClassicGame props={props}/>}
                </>
            )}
        </>
    );
}

function ModeSelectDisplay({ props }) {
    return (
        <>
            <p>Which game mode would you like to play?</p>
            <button className={styles.buttons} onClick={props.setMenuGameModeFunction}>
                {gameModeData.classic.name}
            </button>
            <button className={styles.buttons} onClick={props.enterAndLeaveGameModeSelectScreen}>
                Back
            </button>
        </>
    );
}

function ClassicGame({ props }) {

    return (
        <>
        {
            !props.insideCustomGameMenu ? <ClassicGameModeSelectDisplay props={props} /> : <CustomGame props={props}/>
        }
        </>
    );
}

function ClassicGameModeSelectDisplay({ props }){
    return (
        <>
            <br />
            <p>Select your difficulty level</p>
            <div className={styles.classicModesContainer}>
                <button className={`${styles.buttons} ${styles.classicDifficultyButtons}`} onClick={(event) => {
                    props.setGameModeFunction(event);
                    props.gameStart(event);
                    }}>Easy</button>
                <button className={`${styles.buttons} ${styles.classicDifficultyButtons}`} onClick={(event) => {
                    props.setGameModeFunction(event);
                    props.gameStart(event);
                    }}>Medium</button>
                <button className={`${styles.buttons} ${styles.classicDifficultyButtons}`} onClick={(event) => {
                    props.setGameModeFunction(event);
                    props.gameStart(event);
                    }}>Hard</button>
                <button className={`${styles.buttons} ${styles.classicDifficultyButtons}`} onClick={(event) => {
                    props.setGameModeFunction(event);
                    props.gameStart(event);
                    }}>Insane</button>
                <button className={`${styles.buttons} ${styles.classicDifficultyButtons}`} onClick={(event) => {
                    props.setInCustomGameMenuOrNot();
                    props.setGameModeFunction(event);
                }}>Custom</button>
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
    return (
        <>
            <br />
            <br />
            <p className="ballSecondaryInstructions">
                You can choose between {gameSettings.minNumberOfPokemon} and {gameSettings.maxNumberOfPokemon} different Pokémon to play with
            </p>
            <form action="" onSubmit={props.customGameStart} className="ballFormDiv">
                <input type="number" className="gameLimitNumberInput" placeholder="#" onChange={(event) => numberInput(event.target, props.setClassicCustomInputValue, gameSettings.minNumberOfPokemon, gameSettings.maxNumberOfPokemon)} value={props.classicCustomInputValue} />
                <input type="submit" value={"Start game"} className="startGameButton" />
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
