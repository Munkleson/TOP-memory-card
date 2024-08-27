import { useEffect, useRef, useState } from "react";
import "./App.css";
import getAllPokemonNamesAndImages from "./components/retrievePokemonDetails";

function App() {
    const [pokemonData, setPokemonData] = useState([]);
    const [gameActive, setGameActive] = useState(false);
    const [numberOfCards, setNumberOfCards] = useState(0);
    const effectRan = useRef(false);

    useEffect(() => {
        if (!effectRan.current){
            let ignore = false;
            const fetchDataFunction = async () => {
                const fetchData = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
                    .then((response) => response.json());
                if (!ignore) {
                    getAllPokemonNamesAndImages(fetchData.results).then(pokemonData => setPokemonData(pokemonData));
                }
            };
            fetchDataFunction();
            return () => {
                ignore = true;
            }
        }
        effectRan.current = true;
    }, []);

    function gameStart(){

    }

    return (
        <>
            <input type="text" />
            <button>Prss me</button>
        </>
    );
}

export default App;
