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
    const currentVersion = "V0.1";
    const effectRan = useRef(false);

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
        const playerNumberInput = document.querySelector(".gameLimitNumberInput").value;
        if (playerNumberInput) {
            setNumberOfPokemon(playerNumberInput * 1);
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
                    <div id="wholeBodyDiv">
                        <div className="pokemonLogo"></div>
                        <div id="centerBallDiv">
                            <br />
                            <p className="ballInstructions">This is a memory game where the goal is to not click the same Pokémon twice!</p>
                            <p>You can choose between 6 and 21 different Pokémon to play with.</p>
                            <form action="" onSubmit={gameStart}>
                                <input type="number" min={6} max={21} className="gameLimitNumberInput" placeholder="#" style={{ width: "50px", height: "50px" }} />
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
