import { useEffect, useRef, useState } from "react";
import "./App.css";
import getAllPokemonNamesAndImages from "./components/subcomponents/retrievePokemonDetails";
import { InitializeGame } from "./components/gameFunctions";
import "./components/css_files/miscStyling.css";
import { numberInput } from "./components/subcomponents/numberInputLogic";
import { gameSettings } from "./gameSettingsVariables";
import { GenerationSelect } from "./components/subcomponents/generationSelect";

function App() {
    const pokemonGenerations = ["Generation 1", "Generation 2", "Generation 3", "Generation 4", "Generation 5", "Generation 6", "Generation 7", "Generation 8", "Generation 9", "All Generations"];
    const [allGenPokemon, setFullPokemonData] = useState([]);
    const [pokemonData, setPokemonGameData] = useState([]);

    const [pokemonDataReady, setPokemonDataReadyState] = useState(false);
    const [selectedGenForReturn, setSelectedGenForReturn] = useState("Generation 1"); //// For when you start a game, and return to the home screen, your generation should still be selected

    const [gameActive, setGameActive] = useState(false);
    const [numberOfPokemon, setNumberOfPokemon] = useState(0);
    const [timedCheckBoxTicked, setTimeCheckBoxState] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const effectRan = useRef(false);

    // function localStorageVersionControl(){ //// deletes everything in localstorage if the version is not the same. Not really needed, but a just in case I want to update things like scoring algorithms. May edit this in future to just erase certain things
    //     localStorage.version !== currentVersion && localStorage.clear();
    // }
    // localStorageVersionControl();

    function setPokemonGeneration(generation) {
        switch (generation) {
            case pokemonGenerations[0]:
                setPokemonGameData(allGenPokemon.slice(0, 151));
                setSelectedGenForReturn(pokemonGenerations[0]);
                break;
            case pokemonGenerations[1]:
                setPokemonGameData(allGenPokemon.slice(151, 251));
                setSelectedGenForReturn(pokemonGenerations[1]);
                break;
            case pokemonGenerations[2]:
                setPokemonGameData(allGenPokemon.slice(251, 386));
                setSelectedGenForReturn(pokemonGenerations[2]);
                break;
            case pokemonGenerations[3]:
                setPokemonGameData(allGenPokemon.slice(386, 493));
                setSelectedGenForReturn(pokemonGenerations[3]);
                break;
            case pokemonGenerations[4]:
                setPokemonGameData(allGenPokemon.slice(493, 649));
                setSelectedGenForReturn(pokemonGenerations[4]);
                break;
            case pokemonGenerations[5]:
                setPokemonGameData(allGenPokemon.slice(649, 721));
                setSelectedGenForReturn(pokemonGenerations[5]);
                break;
            case pokemonGenerations[6]:
                setPokemonGameData(allGenPokemon.slice(721, 809));
                setSelectedGenForReturn(pokemonGenerations[6]);
                break;
            case pokemonGenerations[7]:
                setPokemonGameData(allGenPokemon.slice(809, 905));
                setSelectedGenForReturn(pokemonGenerations[7]);
                break;
            case pokemonGenerations[8]:
                setPokemonGameData(allGenPokemon.slice(905, 1025));
                setSelectedGenForReturn(pokemonGenerations[8]);
                break;
            case pokemonGenerations[9]: /// all generations
                setPokemonGameData(allGenPokemon);
                setSelectedGenForReturn(pokemonGenerations[9]);
                break;
        }
    }

    useEffect(() => {
        if (!effectRan.current) {
            let ignore = false;
            const fetchPokemonData = async () => {
                const fetchData = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025").then((response) => response.json());
                if (!ignore) {
                    getAllPokemonNamesAndImages(fetchData.results).then((pokemonData) => {
                        setFullPokemonData(pokemonData);
                        setPokemonGameData(pokemonData.slice(0, 152)); //// Initial setting for the pokemon
                        setTimeout(() => {
                            setPokemonDataReadyState(true);
                        }, 1000); //// Timeout to not make it so jarring for when the loading finishes too quickly. Can put in an animation at a later time
                    });
                }
            };
            fetchPokemonData();
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
    }

    return (
        <>
            {!gameActive ? (
                <>
                    <div id="wholeBodyDiv">
                    <div className="pokemonLogo"></div>
                        <div id="centerBallDiv">
                                {/* <div className="pokemonLogo"></div> */}
                        {!pokemonDataReady ? (
                            <HomePageLoadingAnimation />
                        ) : (
                            <>
                                <GenerationSelect pokemonData={pokemonData} setPokemonGeneration={setPokemonGeneration} selectedGenForReturn={selectedGenForReturn} pokemonGenerations={pokemonGenerations} />
                                <CustomGame minNumberOfPokemon={gameSettings.minNumberOfPokemon} maxNumberOfPokemon={gameSettings.maxNumberOfPokemon} gameStart={gameStart} setInputValue={setInputValue} inputValue={inputValue} timedOrNot={timedOrNot} timedCheckBoxTicked={timedCheckBoxTicked}/>
                            </>
                        )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div id="gameBodyDiv">
                        <InitializeGame numberOfPokemon={numberOfPokemon} pokemonData={pokemonData} currentVersion={gameSettings.currentVersion} resetGame={resetGame} timed={timedCheckBoxTicked} maxPokemonPerRow={gameSettings.maxPokemonPerRow}/>
                    </div>
                </>
            )}
        </>
    );
}

function CustomGame({ minNumberOfPokemon, maxNumberOfPokemon, gameStart, inputValue, timedOrNot, setInputValue, timedCheckBoxTicked }) {
    return (
        <>
                <br />
                <p className="ballInstructions">This is a memory game where the goal is to not click the same Pokémon twice in a round!</p>
                <p className="ballSecondaryInstructions">
                    You can choose between {minNumberOfPokemon} and {maxNumberOfPokemon} different Pokémon to play with
                </p>
                <form action="" onSubmit={gameStart} className="ballFormDiv">
                    <input type="number" className="gameLimitNumberInput" placeholder="#" onChange={(event) => numberInput(event.target, setInputValue, minNumberOfPokemon, maxNumberOfPokemon)} value={inputValue} />
                    <input type="submit" value={"Start game"} className="startGameButton"/>
                    <div className="timedModeDiv">
                        <input type="checkbox" className="timedModeInput" onChange={timedOrNot} checked={timedCheckBoxTicked}/>
                        <span className="timedModeText" onClick={timedOrNot}>Timed mode (Optional)</span>
                    </div>
                </form>
                <strong className="ballBottomStrongTag">How many will you be able to remember?</strong>
        </>
    );
}

function HomePageLoadingAnimation() {
    return (
        <>
        {/* <div id="centerBallDiv"> */}
            <div className="pokeBallLoading"></div>
            <p className="loadingText">Loading...</p>
        {/* </div> */}
        </>
    );
}

export default App;
