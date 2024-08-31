function numberInput(target, setInputValue) { //// This whole place is a mess. The logic probably doesn't need to be this complicated for what I wanted to do, but it works, so *shrug*. Some definitely feel redundant though
    const value = Number(target.value); //// I'll need to refactor this whole section later maybe. Having to switch between several types is a mess and maybe not needed
    const input = document.querySelector(".gameLimitNumberInput");
    const valueToString = target.value;
    input.setCustomValidity("");

    if (valueToString.length > 3 && valueToString[0] === "0" && valueToString[1] === "0" && valueToString[2] === "0" && value < 6) {
        input.setCustomValidity("The number must be between 6 and 21");
        input.reportValidity();
        setInputValue(valueToString.slice(1));
    } else if ((value > 21 || value < 6) && valueToString.length === 3) {
        input.setCustomValidity("You must enter a number between 6 and 21");
        input.reportValidity();
        setInputValue(value);
    } else if (valueToString.length > 3 && valueToString[0] === "0" && valueToString[1] === "0") {
        if ((value > 21 || value < 6)){
            input.setCustomValidity("You must enter a number between 6 and 21");
            input.reportValidity(); 
        }
        setInputValue(valueToString.slice(1));
    } else if (valueToString.length > 3 && valueToString[1] === "0" && value > 21) {
        input.setCustomValidity("The number must be between 6 and 21");
        input.reportValidity();
        setInputValue(valueToString.slice(1));
    } else if (valueToString.length > 3 && valueToString[0] === "0" && value > 21) {
        input.setCustomValidity("The number must be between 6 and 21");
        input.reportValidity();
        setInputValue(valueToString.slice(1));
    } else if (valueToString.length >= 3 && (value > 21 || value < 6)) {
        input.setCustomValidity("You must enter a number between 6 and 21");
        input.reportValidity();
        setInputValue(valueToString.slice(0, 3));
    } else if (valueToString.length === 2 && (value > 21 || value < 6) && valueToString[0] !== "0"){
        input.setCustomValidity("You must enter a number between 6 and 21");
        input.reportValidity();
        setInputValue(value);
    } else {
        setInputValue(value);
    }
}

export { numberInput };