import { useEffect, useRef, useState } from "react";
import "./App.css";
import getAllPokemonNamesAndImages from "./components/retrievePokemonDetails";
import { whichPokemon } from "./components/gameModeFunctions";

function App() {
    const [pokemonData, setPokemonData] = useState([]);
    const [gameActive, setGameActive] = useState(false);
    const [numberOfPokemon, setNumberOfPokemon] = useState(0);
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
        const pokemonSelection = whichCards(pokemonData, playerNumberInput);

        setNumberOfPokemon(playerNumberInput);
        setGameActive(true);
    }

    return (
        <div>
            {/* {!gameActive && ( */}
            <>
            <p>Enter a number between 6 and 20</p>
                <form action="" onSubmit={gameStart}>
                    <input type="number" min={6} max={20} className="gameLimitNumberInput" style={{width: "50px", height: "50px"}}/>
                    <input type="submit" value={"Submit"} />
                </form>
            </>
            {/* )} */}
        </div>
    );
}

export default App;
