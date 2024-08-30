import { useEffect, useRef, useState } from "react";
import "./App.css";
import getAllPokemonNamesAndImages from "./components/subcomponents/retrievePokemonDetails";
import { InitializeGame } from "./components/gameFunctions";
import "./components/css_files/miscStyling.css";

function App() {
    const [pokemonData, setPokemonData] = useState([]);
    const [gameActive, setGameActive] = useState(false);
    const [numberOfPokemon, setNumberOfPokemon] = useState(0);
    const currentVersion = "0.1";
    const effectRan = useRef(false);

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
        if (playerNumberInput){
            setNumberOfPokemon(playerNumberInput * 1);
            setGameActive(true);
        }
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
                            <br />
                            <p className="ballInstructions">This is a memory game where the goal is to not click the same Pokémon twice!</p>
                            <p>You can choose between 6 and 21 different Pokémon to play with.</p>
                            <form action="" onSubmit={gameStart}>
                                <input type="number" min={6} max={21} className="gameLimitNumberInput" placeholder="#" style={{ width: "50px", height: "50px" }} />
                                <input type="submit" value={"Start game"}/>
                            </form>
                            <p>How many will you be able to remember?</p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div id="gameBodyDiv">
                        <InitializeGame numberOfPokemon={numberOfPokemon} pokemonData={pokemonData} currentVersion={currentVersion} resetGame={resetGame} />
                    </div>
                </>
            )}
        </>
    );
}

export default App;
