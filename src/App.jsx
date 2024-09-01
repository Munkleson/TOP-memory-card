import { useEffect, useRef, useState } from "react";
import "./App.css";
import getAllPokemonNamesAndImages from "./components/subcomponents/retrievePokemonDetails";
import { InitializeGame } from "./components/gameFunctions";
import "./components/css_files/miscStyling.css";
import { numberInput } from "./components/subcomponents/numberInputLogic";
import { gameSettings } from "./gameSettingsVariables";
import { GenerationSelect } from "./components/subcomponents/generationSelect";

function App() {
    const [genOnePokemon, setGenOnePokemon] = useState([]);
    const [genOneReady, setGenOneReady] = useState(false);
    const [genTwoPokemon, setGenTwoPokemon] = useState([]);
    const [genTwoReady, setGenTwoReady] = useState(false);
    const [genThreePokemon, setGenThreePokemon] = useState([]);
    const [genThreeReady, setGenThreeReady] = useState(false);
    const [pokemonData, setPokemonData] = useState([]);

    const [gameActive, setGameActive] = useState(false);
    const [numberOfPokemon, setNumberOfPokemon] = useState(0);
    const [timedCheckBoxTicked, setTimeCheckBoxState] = useState(false);
    const [inputValue, setInputValue] = useState("");
    // "api/v2/pokemon?limit=251&offset=151"
    // "api/v2/pokemon?limit=251"
    //// Pokemon api works like this. Offset is the pokemon id you start at, and the limit goes from there. I.e. gen 2 of pokemon 152-251 would be limit=100&offset=151

    const effectRan = useRef(false);

    // const validityTimeoutLength = 5000; //// Don't use this for now. It functions weird with overlapping validities. Validity is only cleared by normal means i.e. clicking anywhere, inputting another number. Would likely need to use states and maybe effects to make it look ok for very minor gain

    // function localStorageVersionControl(){ //// deletes everything in localstorage if the version is not the same. Not really needed, but a just in case I want to update things like scoring algorithms. May edit this in future to just erase certain things
    //     localStorage.version !== currentVersion && localStorage.clear();
    // }
    // localStorageVersionControl();

    function setPokemonGeneration(generation) {
        switch(generation) {
            case "Generation 1":
                setPokemonData(genOnePokemon);
                break;
            case "Generation 2":
                setPokemonData(genTwoPokemon);
                break;
            case "Generation 3":
                setPokemonData(genThreePokemon);
                break;
        }
    }

    useEffect(() => {
        if (!effectRan.current) {
            let ignore = false;
            const fetchGenOneDataFunction = async () => {
                const fetchData = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then((response) => response.json());
                if (!ignore) {
                    getAllPokemonNamesAndImages(fetchData.results).then((pokemonData) => {
                        setGenOnePokemon(pokemonData);
                        setPokemonData(pokemonData); //// Initial setting for the pokemon
                    });
                    setGenOneReady(true);
                }
            };
            fetchGenOneDataFunction();

            const fetchGenTwoFunction = async () => {
                const fetchData = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=152").then((response) => response.json());
                if (!ignore) {
                    getAllPokemonNamesAndImages(fetchData.results).then((pokemonData) => setGenTwoPokemon(pokemonData));
                    setGenTwoReady(true);
                }
            };
            fetchGenTwoFunction();

            const fetchGenThreeFunction = async () => {
                const fetchData = await fetch("https://pokeapi.co/api/v2/pokemon?limit=135&offset=252").then((response) => response.json());
                if (!ignore) {
                    getAllPokemonNamesAndImages(fetchData.results).then((pokemonData) => setGenThreePokemon(pokemonData));
                    setGenThreeReady(true);
                }
            };
            fetchGenThreeFunction();

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

        if (playerNumberInputValue > gameSettings.maxNumberOfPokemon || playerNumberInputValue < gameSettings.minNumberOfPokemon) {
            playerNumberInput.setCustomValidity(`You must enter a number between ${gameSettings.minNumberOfPokemon} and ${gameSettings.maxNumberOfPokemon}`);
            playerNumberInput.reportValidity();
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
                    <GenerationSelect pokemonData={pokemonData} setPokemonGeneration={setPokemonGeneration} allGens={{genOnePokemon, genTwoPokemon, genThreePokemon}} genReady={{genOneReady,   genTwoReady, genThreeReady}}/>
                    <CustomGame minNumberOfPokemon={gameSettings.minNumberOfPokemon} maxNumberOfPokemon={gameSettings.maxNumberOfPokemon} gameStart={gameStart} setInputValue={setInputValue} inputValue={inputValue} timedOrNot={timedOrNot}/>
                </>
            ) : (
                <>
                    <div id="gameBodyDiv">
                        <InitializeGame numberOfPokemon={numberOfPokemon} pokemonData={pokemonData} currentVersion={gameSettings.currentVersion} resetGame={resetGame} timed={timedCheckBoxTicked} maxPokemonPerRow={gameSettings.maxPokemonPerRow} />
                    </div>
                </>
            )}
        </>
    );
}

function CustomGame({ minNumberOfPokemon, maxNumberOfPokemon, gameStart, inputValue, timedOrNot, setInputValue }) {
    return (
        <div id="wholeBodyDiv">
            <div className="pokemonLogo"></div>
            <div id="centerBallDiv">
                <br />
                <p className="ballInstructions">This is a memory game where the goal is to not click the same Pokémon twice in a round!</p>
                <p>
                    You can choose between {minNumberOfPokemon} and {maxNumberOfPokemon} different Pokémon to play with.
                </p>
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
    );
}

export default App;
