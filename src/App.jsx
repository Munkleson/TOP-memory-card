import { useEffect, useRef, useState } from "react";
import "./App.css";
import getAllPokemonNamesAndImages from "./components/subcomponents/retrievePokemonDetails";
import { InitializeGame } from "./components/gameFunctions";
import "./components/css_files/miscStyling.css";

function App() {
    const [pokemonData, setPokemonData] = useState([]);
    const [gameActive, setGameActive] = useState(false);
    const [numberOfPokemon, setNumberOfPokemon] = useState(0);
    const [timedCheckBoxTicked, setTimeCheckBoxState] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const currentVersion = "V0.1";
    const effectRan = useRef(false);

    // const validityTimeoutLength = 5000; //// Don't use this for now. It functions weird with overlapping validities. Validity is only cleared by normal means i.e. clicking anywhere, inputting another number. Would likely need to use states and maybe effects to make it look ok for very minor gain

    // function localStorageVersionControl(){ //// deletes everything in localstorage if the version is not the same. Not really needed, but a just in case I want to update things like scoring algorithms. May edit this in future to just erase certain things
    //     localStorage.version !== currentVersion && localStorage.clear();
    // }
    // localStorageVersionControl();

    useEffect(() => {
        if (!effectRan.current) {
            let ignore = false;
            const fetchDataFunction = async () => {
                const fetchData = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then((response) => response.json());
                if (!ignore) {
                    getAllPokemonNamesAndImages(fetchData.results).then((pokemonData) => setPokemonData(pokemonData));
                }
            };
            fetchDataFunction();
            return () => {
                ignore = true;
            };
        }
        effectRan.current = true;
    }, []);

    function gameStart(event) {
        event.preventDefault();
        const playerNumberInput = document.querySelector(".gameLimitNumberInput");
        const playerNumberInputValue = playerNumberInput.value;

        if (playerNumberInputValue > 21 || playerNumberInputValue < 6) {
            playerNumberInput.setCustomValidity("You must enter a number between 6 and 21");
            playerNumberInput.reportValidity();
            // setTimeout(() => {
            //     playerNumberInput.setCustomValidity("");
            // }, validityTimeoutLength)
        } else {
            setNumberOfPokemon(playerNumberInputValue * 1);
            setGameActive(true);
        }
    }

    function timedOrNot() {
        !timedCheckBoxTicked ? setTimeCheckBoxState(true) : setTimeCheckBoxState(false);
    }

    function resetGame() {
        setGameActive(false);
        setTimeCheckBoxState(false);
    }

    function numberInput(target) { //// This whole place is a mess. The logic probably doesn't need to be this complicated for what I wanted to do, but it works, so *shrug*
        const value = Number(target.value); //// I'll need to refactor this whole section later maybe. Having to switch between several types is a mess and maybe not needed
        const input = document.querySelector(".gameLimitNumberInput");
        const valueToString = target.value;
        input.setCustomValidity("");

        if (valueToString.length > 3 && valueToString[0] === "0" && valueToString[1] === "0" && valueToString[2] === "0" && value < 6) {
            input.setCustomValidity("The number must be between 6 and 21");
            input.reportValidity();
            setInputValue(valueToString.slice(1));
        } else if ((value > 21 || value < 6) && valueToString.length === 3) {
            input.setCustomValidity("You must enter a number between 6 and 21");
            input.reportValidity();
            setInputValue(value);
        } else if (valueToString.length > 3 && valueToString[0] === "0" && valueToString[1] === "0") {
            if ((value > 21 || value < 6)){
                input.setCustomValidity("You must enter a number between 6 and 21");
                input.reportValidity(); 
            }
            setInputValue(valueToString.slice(1));
        } else if (valueToString.length > 3 && valueToString[1] === "0" && value > 21) {
            input.setCustomValidity("The number must be between 6 and 21");
            input.reportValidity();
            setInputValue(valueToString.slice(1));
        } else if (valueToString.length > 3 && valueToString[0] === "0" && value > 21) {
            input.setCustomValidity("The number must be between 6 and 21");
            input.reportValidity();
            setInputValue(valueToString.slice(1));
        } else if (valueToString.length >= 3 && (value > 21 || value < 6)) {
            input.setCustomValidity("You must enter a number between 6 and 21");
            input.reportValidity();
            setInputValue(valueToString.slice(0, 3));
        } else {
            setInputValue(value);
        }
    }

    return (
        <>
            {!gameActive ? (
                <>
                    <div id="wholeBodyDiv">
                        <div className="pokemonLogo"></div>
                        <div id="centerBallDiv">
                            <br />
                            <p className="ballInstructions">This is a memory game where the goal is to not click the same Pokémon twice!</p>
                            <p>You can choose between 6 and 21 different Pokémon to play with.</p>
                            <form action="" onSubmit={gameStart}>
                                <input type="number" className="gameLimitNumberInput" placeholder="#" style={{ width: "50px", height: "50px" }} onChange={(event) => numberInput(event.target)} value={inputValue} />
                                <input type="submit" value={"Start game"} />
                                <div className="timedModeDiv">
                                    <input type="checkbox" className="timedModeInput" onChange={timedOrNot} />
                                    <span className="timedModeText">Timed mode (Optional)</span>
                                </div>
                            </form>
                            <br />
                            <strong>How many will you be able to remember?</strong>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div id="gameBodyDiv">
                        <InitializeGame numberOfPokemon={numberOfPokemon} pokemonData={pokemonData} currentVersion={currentVersion} resetGame={resetGame} timed={timedCheckBoxTicked} />
                    </div>
                </>
            )}
        </>
    );
}

export default App;
