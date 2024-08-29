import { useEffect, useRef, useState } from "react";
import "./App.css";
import getAllPokemonNamesAndImages from "./components/retrievePokemonDetails";
import { InitializeGame } from "./components/gameFunctions";

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
        setNumberOfPokemon(playerNumberInput * 1);
        setGameActive(true);
    }

    function resetGame() {
        setGameActive(false);
    }

    return (
        <div id="wholeBodyDiv">
            {!gameActive ? (
                <>
                    <div id="centerBallDiv">
                        <p>How many different Pokémon would you like to play with?</p>
                        <p>Enter a number between 6 and 20</p>
                        <form action="" onSubmit={gameStart}>
                            <input type="number" min={6} max={151} className="gameLimitNumberInput" style={{ width: "50px", height: "50px" }} />
                            <input type="submit" value={"Start game"} />
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <button onClick={resetGame}>Reset game</button>
                    <InitializeGame numberOfPokemon={numberOfPokemon} pokemonData={pokemonData} currentVersion={currentVersion}/>
                </>
            )}
        </div>
    );
}

export default App;
