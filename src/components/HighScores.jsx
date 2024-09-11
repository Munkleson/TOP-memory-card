import { useEffect, useState } from "react";
import styles from "./HighScores.module.css";
import { gameModeData } from "./GameModeData";

export default function DisplayHighScores({ openAndCloseHighScores }) {
    const [selected, setSelected] = useState("classic");
    function setSelection(event) {
        let text = event.target.innerText;
        if (text === "Fifty-fifty") {
            setSelected("fifty-fifty");
        } else {
            text = text.split("");
            text[0] = text[0].toLowerCase();
            text = text.join("");
            setSelected(text);
        }
    }
    return (
        <div className={styles.overallContainer}>
            <HighScoreHeader openAndCloseHighScores={openAndCloseHighScores} setSelection={setSelection} selected={selected} />
            <HighScoreContent selected={selected} />
        </div>
    );
}

function HighScoreHeader({ openAndCloseHighScores, setSelection, selected }) {
    return (
        <div className={styles.header}>
            <h2 className={styles.highScoreText}>High scores</h2>
            {/* <div className={styles.otherHeaderDiv}> */}
            <button className={styles.closeButton} onClick={openAndCloseHighScores}>
                Close
            </button>
            <DropdownMenu setSelection={setSelection} selected={selected} />
            {/* </div>     */}
        </div>
    );
}

function HighScoreContent({ selected }) {
    const scores = JSON.parse(localStorage.getItem("scores"));
    const gameMode = scores[selected];
    const arrayOfDifficulties = Object.keys(gameMode);
    return (
        <div className={styles.contentContainer}>
            {selected === "fifty-fifty mix" ?
                <FiftyFiftyMixTimed arrayOfDifficulties={arrayOfDifficulties} gameMode={gameMode} />
            :
            <>
              <NotTimed arrayOfDifficulties={arrayOfDifficulties} gameMode={gameMode} />
              <Timed arrayOfDifficulties={arrayOfDifficulties} gameMode={gameMode} />          
            </>
            }
        </div>
    );
}

//// in scoring, whether it is timed or not is categorized by false and true
function NotTimed({ arrayOfDifficulties, gameMode }) {
    return (
        <div className={styles.normalDiv}>
            <h3 className={styles.normalText}>Normal</h3>
            <div className={styles.innerNormalDiv}>
                <DifficultyText arrayOfDifficulties={arrayOfDifficulties} gameMode={gameMode} />
                <Scores arrayOfDifficulties={arrayOfDifficulties} gameMode={gameMode} timed={false} />
            </div>
        </div>
    );
}

function Timed({ arrayOfDifficulties, gameMode }) {
    return (
        <div className={styles.timedDiv}>
            <h3 className={styles.timedText}>Timed</h3>
            <div className={styles.innerTimedDiv}>
                <DifficultyText arrayOfDifficulties={arrayOfDifficulties} gameMode={gameMode} />
                <Scores arrayOfDifficulties={arrayOfDifficulties} gameMode={gameMode} timed={true} />
            </div>
        </div>
    );
}
function FiftyFiftyMixTimed({ arrayOfDifficulties, gameMode }) {
    return (
        <div className={styles.timedDiv}>
            <h3 className={styles.fiftyFiftyMixTimedText}>Timed</h3>
            <div className={styles.innerTimedDiv}>
                <DifficultyText arrayOfDifficulties={arrayOfDifficulties} gameMode={gameMode} />
                <Scores arrayOfDifficulties={arrayOfDifficulties} gameMode={gameMode} timed={true} />
            </div>
        </div>
    );
}

function DifficultyText({ arrayOfDifficulties }) {
    return (
        <ul className={styles.difficultyDiv}>
            {arrayOfDifficulties.map((element) => {
                return <>{element !== "Custom" && <li className={styles.difficultyText}>{element}</li>}</>;
            })}
        </ul>
    );
}

function Scores({ arrayOfDifficulties, gameMode, timed }) {
    return (
        <ul className={styles.scoreDiv}>
            {arrayOfDifficulties.map((element) => {
                return <>{element !== "Custom" && <li className={styles.scoreText}>{gameMode[element][timed]}</li>}</>;
            })}
        </ul>
    );
}

function DropdownMenu({ setSelection, selected }) {
    const [dropdownMenuActive, setDropdownMenuActive] = useState(false);
    function activateDropdownMenu() {
        setDropdownMenuActive(!dropdownMenuActive);
    }
    useEffect(() => {
        const clickHandler = (event) => {
            const dropdownMenu = document.querySelector(`.${styles.modeMenu}`);
            const selectedMode = document.querySelector(`.${styles.selectedHolder}`);
            if (dropdownMenu && !dropdownMenu.contains(event.target) && !selectedMode.contains(event.target)) {
                setDropdownMenuActive(false);
            }
        };
        document.addEventListener("click", clickHandler);
        return () => {
            document.removeEventListener("click", clickHandler);
        };
    }, []);

    return (
        <>
            <div className={styles.selectedHolder} onClick={activateDropdownMenu}>
                <div className={styles.selectedMode}>
                    <span className={styles.selected}>{gameModeData[selected].name}</span>
                    {dropdownMenuActive ? <div className={`${styles.caret} ${styles["caret-rotate"]}`}></div> : <div className={styles.caret}></div>}
                    {dropdownMenuActive && (
                        <ul className={`${styles.modeMenu} ${styles.modeMenuOpen}`}>
                            <DropdownList setSelection={setSelection} selected={selected} />
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

function DropdownList({ setSelection, selected }) {
    return (
        <>
            {Object.keys(gameModeData).map((element) => {
                return (
                    <>
                        <li onClick={setSelection} className={selected === element && styles.activeSelection}>
                            {gameModeData[element].name}
                        </li>
                    </>
                );
            })}
        </>
    );
}
