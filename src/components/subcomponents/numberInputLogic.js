function numberInput(target, setcustomInputValue, minNumberOfPokemon, maxNumberOfPokemon) {
    //// This whole place is a mess. The logic probably doesn't need to be this complicated for what I wanted to do, but it works, so *shrug*. Some definitely feel redundant though
    const value = Number(target.value); //// I'll need to refactor this whole section later maybe. Having to switch between several types is a mess and maybe not needed
    const input = document.querySelector(".gameLimitNumberInput");
    const valueToString = target.value;
    input.setCustomValidity("");
    const invalidMessage = `You must enter a number between ${minNumberOfPokemon} and ${maxNumberOfPokemon}`;

    if (valueToString.length > 3 && valueToString[0] === "0" && valueToString[1] === "0" && valueToString[2] === "0" && value < minNumberOfPokemon) {
        input.setCustomValidity(invalidMessage);
        input.reportValidity();
        setcustomInputValue(valueToString.slice(1));
    } else if ((value > maxNumberOfPokemon || value < minNumberOfPokemon) && valueToString.length === 3) {
        input.setCustomValidity(invalidMessage);
        input.reportValidity();
        setcustomInputValue(value);
    } else if (valueToString.length > 3 && valueToString[0] === "0" && valueToString[1] === "0") {
        if (value > maxNumberOfPokemon || value < minNumberOfPokemon) {
            input.setCustomValidity(invalidMessage);
            input.reportValidity();
        }
        setcustomInputValue(valueToString.slice(1));
    } else if (valueToString.length > 3 && valueToString[1] === "0" && value > maxNumberOfPokemon) {
        input.setCustomValidity(invalidMessage);
        input.reportValidity();
        setcustomInputValue(valueToString.slice(1));
    } else if (valueToString.length > 3 && valueToString[0] === "0" && value > maxNumberOfPokemon) {
        input.setCustomValidity(invalidMessage);
        input.reportValidity();
        setcustomInputValue(valueToString.slice(1));
    } else if (valueToString.length >= 3 && (value > maxNumberOfPokemon || value < minNumberOfPokemon)) {
        input.setCustomValidity(invalidMessage);
        input.reportValidity();
        setcustomInputValue(valueToString.slice(0, 3));
    } else if (valueToString.length === 2 && (value > maxNumberOfPokemon || value < minNumberOfPokemon) && valueToString[0] !== "0") {
        input.setCustomValidity(invalidMessage);
        input.reportValidity();
        setcustomInputValue(value);
    } else if (valueToString.length === 2 && (value > maxNumberOfPokemon || value < minNumberOfPokemon) && valueToString[0] === "0") {
        input.setCustomValidity(invalidMessage);
        input.reportValidity();
        setcustomInputValue(value);
    } else if (valueToString.length === 1 && (value > maxNumberOfPokemon || value < minNumberOfPokemon)) {
        input.setCustomValidity(invalidMessage);
        input.reportValidity();
        setcustomInputValue(value);
    } else {
        setcustomInputValue(value);
    }
}

export { numberInput };
