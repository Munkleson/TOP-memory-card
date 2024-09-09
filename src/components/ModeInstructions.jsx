import { useState } from "react";
import styles from "./ModeInstructions.module.css";
import { gameModeData } from "./GameModeData";
import { useEffect } from "react";

export default function ModeInstructions({ openAndCloseInstructions }){
    const [selectedMode, setSelectedMode] = useState("");
    function selectMode(event){
        if (event.target.innerText === "Fifty-fifty"){
            setSelectedMode("fiftyFifty")
        } else {
            setSelectedMode(event.target.innerText.toLowerCase());
        }

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
                            <DisplayModes key={element} element={element} selectMode={selectMode} selectedMode={selectedMode} index={index}/>
                        </>)
                    })}
                    <button onClick={() => {
                        openAndCloseInstructions();
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

    return (
        <div key={index} onClick={selectMode} className={
            element === selectedMode ? styles.modeDivSelected : styles.modeDiv
            }>{gameModeData[element].name}
            {/* <span className={styles.modeText}>{gameModeData[element].name}</span> */}
        </div>
    )
}

function DisplayInstructions({ selectedMode }){

    return (
        <>              
            {gameModeData[selectedMode].instructions.map((element) => {
                return <>
                    <p className={styles.instructionsText} key={element} style={{color: (selectedMode === "standard" && element.includes("There will always be at least one valid")) && "#FFCC01", fontWeight: "bold"}}>{element}</p>
                </>
            })}
        </>
    )
}

