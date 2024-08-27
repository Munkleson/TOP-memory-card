export default function getAllPokemonNamesAndImages(arrayOfPokemonObjects){
    const pokemonArray = arrayOfPokemonObjects.map((element) => {
        return fetch(element.url);
    });
    return Promise.all(pokemonArray).then(response => Promise.all(response.map(response => response.json()))).then(data => {
        return data.map((pokemonData, index) => ({
            name: arrayOfPokemonObjects[index].name,
            imageUrl: pokemonData.sprites.front_default
        }));
    });
}