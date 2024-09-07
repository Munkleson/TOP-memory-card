import { useState } from "react";
import styles from "./ModeInstructions.module.css";
import { gameModeData } from "./GameModeData";

export default function ModeInstructions({ openAndCloseInstructions, openAndCloseMenu }){
    const [selectedMode, setSelectedMode] = useState("");
    console.log(selectedMode)
    function selectMode(event){
        setSelectedMode(event.target.innerText.toLowerCase());
        console.log(event.target.innerText.toLowerCase())
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.sideBar}>
                    {Object.keys(gameModeData).map((element, index) => {
                        return (
                        <>
                            <DisplayModes element={element} selectMode={selectMode} selectedMode={selectedMode} key={index}/>
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

function DisplayModes({ element, selectMode, selectedMode, }){
    return (
        <div onClick={selectMode} className={
            element === selectedMode ? styles.modeDivSelected : styles.modeDiv
            }>
            <div className={styles.modeText}>{gameModeData[element].name}</div>
        </div>
    )
}

function DisplayInstructions({ selectedMode }){
    console.log(selectedMode);
    console.log(gameModeData);
    console.log(gameModeData[selectedMode]);
    console.log(gameModeData[selectedMode].instructions)
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



