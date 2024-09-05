export default function setPokemonGenerationModule(selectedGeneration, pokemonGenerations, setPokemonGameData, setSelectedGenForReturn, allGenPokemon){
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