import { useState } from "react";
import styles from "./ModeInstructions.module.css";
import { gameModeData } from "./GameModeData";
import { useEffect } from "react";

export default function ModeInstructions({ openAndCloseInstructions, openAndCloseMenu }){
    const [selectedMode, setSelectedMode] = useState("");
    function selectMode(event){
        setSelectedMode(event.target.innerText.toLowerCase());
    }
    useEffect(() => {
        const sideBar = document.querySelector(`.${styles.sideBar}`);
        const touchMoveFunction = (event) => {
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
        sideBar.addEventListener("touchmove", touchMoveFunction, { passive: false });
        return () => {
            sideBar.removeEventListener("touchmove", touchMoveFunction);
        };
    }, []);
    //// Stop possibility of touch move if there is no need for scrolling anyway
    useEffect(() => {
        const contentDiv = document.querySelector(`.${styles.contentDiv}`);
        const touchMoveFunction = (event) => {
            if (contentDiv.scrollHeight < contentDiv.clientHeight){
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        };
        contentDiv.addEventListener("touchmove", touchMoveFunction, { passive: false });
        return () => {
            contentDiv.removeEventListener("touchmove", touchMoveFunction);
        };
    }, []);
    return (
        <>
            <div className={styles.container}>
                <div className={styles.sideBar}>
                    {Object.keys(gameModeData).map((element, index) => {
                        return (
                        <>
                            <DisplayModes element={element} selectMode={selectMode} selectedMode={selectedMode} index={index}/>
                        </>)
                    })}
                    <button onClick={() => {
                        openAndCloseInstructions();
                        openAndCloseMenu();
                        }} className={styles.closeButton}>Close</button>
                </div>
                <div className={styles.contentDiv}>
                    {selectedMode ?
                        <DisplayInstructions selectedMode={selectedMode}/>  
                    : 
                        <>
                            <p className={styles.defaultText}>Select a mode to view its rules</p>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

function DisplayModes({ element, selectMode, selectedMode, index}){
    if (selectedMode === "fifty-fifty"){
        selectedMode = "fiftyFifty";
    }
    return (
        <div key={index} onClick={selectMode} className={
            element === selectedMode ? styles.modeDivSelected : styles.modeDiv
            }>{gameModeData[element].name}
            {/* <span className={styles.modeText}>{gameModeData[element].name}</span> */}
        </div>
    )
}

function DisplayInstructions({ selectedMode }){
    if (selectedMode === "fifty-fifty"){
        selectedMode = "fiftyFifty";
    }
    return (
        <>              
            {gameModeData[selectedMode].instructions.map((element, index) => {
                return <>
                    <p className={styles.instructionsText} key={index} style={{color: (selectedMode === "standard" && index === gameModeData[selectedMode].instructions.length - 1) && "#FFCC01", fontWeight: "bold"}}>{element}</p>
                </>
            })}
        </>
    )
}

