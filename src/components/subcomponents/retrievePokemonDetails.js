export default function getAllPokemonNamesAndImages(arrayOfPokemonObjects){
    arrayOfPokemonObjects.map(element => {
        return element.name = element.name.charAt(0).toUpperCase() + element.name.slice(1);
    });
    const pokemonArray = arrayOfPokemonObjects.map((element) => {
        return fetch(element.url);
    });
    return Promise.all(pokemonArray).then(response => Promise.all(response.map(response => response.json()))).then(data => {
        return data.map((pokemonData, index) => ({
            name: arrayOfPokemonObjects[index].name,
            imageUrl: pokemonData.sprites.front_default,
            id: index
        }));
    });
}