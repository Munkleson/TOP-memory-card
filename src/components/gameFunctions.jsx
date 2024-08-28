import { useState } from "react";
import { whichPokemon, shuffleArray } from "./gameModeFunctions";
import "./pokemonCardStyles.css";

function InitializeGame({ numberOfPokemon, pokemonData }) {
    const [currentGamePokemon, setCurrentGamePokemon] = useState(whichPokemon(pokemonData, numberOfPokemon));

    function cardClick() {
        setCurrentGamePokemon(shuffleArray(currentGamePokemon)); 
    }

    function replayGame() {
        setCurrentGamePokemon(whichPokemon(pokemonData, numberOfPokemon));
    }

    return (
        <>
            <br />
            <button onClick={replayGame}>Replay</button>
            <GameDisplay currentGamePokemon={currentGamePokemon} cardClick={cardClick}/>
        </>
    );
}

function GameDisplay({ currentGamePokemon, cardClick }) {
    return (
        <div className="cardHolder">
            {currentGamePokemon.map((element) => {
                return (
                    <div onClick={cardClick} key={element.index} className="pokemonCard" style={{ backgroundImage: `url(${element.imageUrl})` }}>
                        {element.name}
                    </div>
                );
            })}
        </div>
    )
}

export { InitializeGame };
