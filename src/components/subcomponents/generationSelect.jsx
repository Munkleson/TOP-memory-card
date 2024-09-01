import { useState } from "react";
import "../css_files/dropdownMenu.css";

function GenerationSelect({setPokemonGeneration, selectedGenForReturn, pokemonGenerations }) {
    const [selectedGen, setSelectedGen] = useState(selectedGenForReturn);

    function selectGeneration(event) {
        setSelectedGen(event.target.innerText); //// For changing the selected option in the menu
        setPokemonGeneration(event.target.innerText);  //// For changing the selected generation for the game
    }

    return (
        <>
            <div className="generationSelectDiv">
                <div className="selectedGeneration">
                    <span>{selectedGen}</span>
                </div>
                <ul className="generationMenu">
                    <DropDownList pokemonGenerations={pokemonGenerations} selectedGen={selectedGen} selectGeneration={selectGeneration}/>
                </ul>
            </div>
        </>
    );
}

function DropDownList({ pokemonGenerations, selectedGen, selectGeneration }) {
    return (
        <>
            { pokemonGenerations.map((element) => {
                if (element !== selectedGen) {
                    return <li onClick={selectGeneration} key={element}>{element}</li>;
                } else {
                    return <li onClick={selectGeneration} key={element}>{element}</li>
                }
            })}
        </>
    )
}

export { GenerationSelect };
