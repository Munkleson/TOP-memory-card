import { useEffect, useState } from "react";
import "../css_files/dropdownMenu.css";

function GenerationSelect({setPokemonGeneration, selectedGenForReturn, pokemonGenerations, howToPlayOpen }) {
    const [selectedGen, setSelectedGen] = useState(selectedGenForReturn);
    const [dropdownMenuActive, setDropdownMenuActive] = useState(false);
    
    function selectGeneration(event) {
        setSelectedGen(event.target.innerText); //// For changing the selected option in the menu
        setPokemonGeneration(event.target.innerText);  //// For changing the selected generation for the game
        setDropdownMenuActive(false);
    }

    function activateDropdownMenu() {
        //// howToPlayOpen is here because I don't want you to be able to select it while the menu is open, but can see it's there maybe
        !howToPlayOpen && (!dropdownMenuActive ? setDropdownMenuActive(true) : setDropdownMenuActive(false));
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

export { GenerationSelect };
