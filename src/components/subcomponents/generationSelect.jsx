import { useEffect, useState } from "react";
import "../css_files/dropdownMenu.css";

function GenerationSelect({setPokemonGeneration, selectedGenForReturn, pokemonGenerations }) {
    const [selectedGen, setSelectedGen] = useState(selectedGenForReturn);
    const [dropdownMenuActive, setDropdownMenuActive] = useState(false);
    
    function selectGeneration(event) {
        setSelectedGen(event.target.innerText); //// For changing the selected option in the menu
        setPokemonGeneration(event.target.innerText);  //// For changing the selected generation for the game
        setDropdownMenuActive(false);
    }

    function activateDropdownMenu() {
        !dropdownMenuActive ? setDropdownMenuActive(true) : setDropdownMenuActive(false);
    }

    useEffect(() => {
        const handleClickOutsideMenu = (event) => {
            const dropdownMenu = document.querySelector('.generationMenu');
            const selectedGeneration = document.querySelector('.selectedGeneration');
            if (dropdownMenu && !dropdownMenu.contains(event.target) && !selectedGeneration.contains(event.target)) {
                setDropdownMenuActive(false);
            }
        }
        document.addEventListener('click', handleClickOutsideMenu);
        return () => {
            document.removeEventListener('click', handleClickOutsideMenu);
        }
    }, []);

    return (
        <> 
            <div className="generationSelectDropdown">
                <div className="selectedGeneration" onClick={activateDropdownMenu}>
                    <span className="selected">{selectedGen}</span>
                    { dropdownMenuActive ? <div className="caret caret-rotate"></div> : <div className="caret"></div> }
                </div>
                { dropdownMenuActive && 
                <ul className="generationMenu generationMenu-open">
                    <DropDownList pokemonGenerations={pokemonGenerations} selectedGen={selectedGen} selectGeneration={selectGeneration}/>
                </ul>
                }
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
                    return <li onClick={selectGeneration} key={element} className="activeSelection">{element}</li>
                }
            })}
        </>
    )
}

function setPokemonGenerationModule(selectedGeneration, pokemonGenerations, setPokemonGameData, setSelectedGenForReturn, allGenPokemon){
    switch (selectedGeneration) {
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

export { GenerationSelect, setPokemonGenerationModule };
