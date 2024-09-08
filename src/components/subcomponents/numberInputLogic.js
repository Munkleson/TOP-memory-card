function numberInput(target, setcustomInputValue, minNumberOfPokemon, maxNumberOfPokemon) {
    //// This whole place is a mess. The logic probably doesn't need to be this complicated for what I wanted to do, but it works, so *shrug*. Some definitely feel redundant though
    const value = Number(target.value); //// I'll need to refactor this whole section later maybe. Having to switch between several types is a mess and maybe not needed
    const input = document.querySelector(".gameLimitNumberInput");
    const valueToString = target.value;
    input.setCustomValidity("");
    const invalidMessage = `You must enter a number between ${minNumberOfPokemon} and ${maxNumberOfPokemon}`;

    if ((value < minNumberOfPokemon)){
        input.setCustomValidity(invalidMessage);
        input.reportValidity();
        if ((value > maxNumberOfPokemon)){
            setcustomInputValue(valueToString.slice(0, maxNumberOfPokemon.toString().length))
        } else if (value !== 0){
            setcustomInputValue(value)
        } else {
            setcustomInputValue("");
        }
    } else if (value !== 0 && !(value > maxNumberOfPokemon)){
        setcustomInputValue(value);
    };
}

export { numberInput };
