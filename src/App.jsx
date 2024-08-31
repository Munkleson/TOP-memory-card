import { useEffect, useRef, useState } from "react";
import "./App.css";
import getAllPokemonNamesAndImages from "./components/subcomponents/retrievePokemonDetails";
import { InitializeGame } from "./components/gameFunctions";
import "./components/css_files/miscStyling.css";
import { numberInput } from "./components/subcomponents/numberInputLogic";

function App() {
    const [pokemonData, setPokemonData] = useState([]);
    const [gameActive, setGameActive] = useState(false);
    const [numberOfPokemon, setNumberOfPokemon] = useState(0);
    const [timedCheckBoxTicked, setTimeCheckBoxState] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const currentVersion = "V0.1";
    const effectRan = useRef(false);

    const maxNumberOfPokemon = 27; /// Sets the max as a variable so it can changed easily and without having to keep manually editing variables later
    const minNumberOfPokemon = 6;
    const maxPokemonPerRow = maxNumberOfPokemon / 3;

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

        if (playerNumberInputValue > maxNumberOfPokemon || playerNumberInputValue < minNumberOfPokemon) {
            playerNumberInput.setCustomValidity(`You must enter a number between ${minNumberOfPokemon} and ${maxNumberOfPokemon}`);
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

    return (
        <>
            {!gameActive ? (
                <>
                    <CustomGame minNumberOfPokemon={minNumberOfPokemon} maxNumberOfPokemon={maxNumberOfPokemon} gameStart={gameStart} setInputValue={setInputValue} inputValue={inputValue} timedOrNot={timedOrNot}/>
                </>
            ) : (
                <>
                    <div id="gameBodyDiv">
                        <InitializeGame numberOfPokemon={numberOfPokemon} pokemonData={pokemonData} currentVersion={currentVersion} resetGame={resetGame} timed={timedCheckBoxTicked} maxPokemonPerRow={maxPokemonPerRow}/>
                    </div>
                </>
            )}
        </>
    );
}

function CustomGame({ minNumberOfPokemon, maxNumberOfPokemon, gameStart, inputValue, timedOrNot, setInputValue }){
    return (
        <div id="wholeBodyDiv">
            <div className="pokemonLogo"></div>
            <div id="centerBallDiv">
                <br />
                <p className="ballInstructions">This is a memory game where the goal is to not click the same Pokémon twice!</p>
                <p>You can choose between {minNumberOfPokemon} and {maxNumberOfPokemon} different Pokémon to play with.</p>
                <form action="" onSubmit={gameStart}>
                    <input type="number" className="gameLimitNumberInput" placeholder="#" style={{ width: "50px", height: "50px" }} onChange={(event) => numberInput(event.target, setInputValue, minNumberOfPokemon, maxNumberOfPokemon)} value={inputValue} />
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
    )
}

export default App;
