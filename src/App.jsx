import { useEffect, useRef, useState } from "react";
import "./App.css";
import getAllPokemonNamesAndImages from "./components/subcomponents/retrievePokemonDetails";
import { InitializeGame } from "./components/gameInitialization.jsx";
import "./components/css_files/miscStyling.css";
import { gameSettings } from "./gameSettingsVariables";
import { GenerationSelect } from "./components/subcomponents/generationSelectDisplayComponents.jsx";
import setPokemonGenerationModule from "./components/subcomponents/generationSelectLogic.js";
import { SelectGameMode } from "./components/GameModes.jsx";
import GameModeSettings from "./components/GameModeSettings.js";
import HowToPlay from "./components/HowToPlay.jsx";
import "./components/css_files/gameSystems.css";
import ModeInstructions from "./components/ModeInstructions.jsx";

function App() {
    const [allGenPokemon, setFullPokemonData] = useState([]);
    const [pokemonData, setPokemonGameData] = useState([]);

    const [pokemonDataReady, setPokemonDataReadyState] = useState(false);
    const [selectedGenForReturn, setSelectedGenForReturn] = useState("Generation 1"); //// For when you start a game, and return to the home screen, your generation should still be selected

    const [gameStarted, setGameState] = useState(false);
    const [numberOfPokemon, setNumberOfPokemon] = useState(0);
    const [timedCheckBoxTicked, setTimeCheckBoxState] = useState(false);
    const [customInputValue, setcustomInputValue] = useState("");

    const [selectedMenuGameMode, setSelectedMenuGameMode] = useState("");
    const [gameMode, setGameMode] = useState("");

    const [enteredModeSelect, setEnteredModeSelectStatus] = useState(false);
    const [isMenuModeSelected, setIsMenuModeSelected] = useState(false);
    const [insideCustomGameMenu, setCustomGameMenuModeSelected] = useState(false); //// This is needed because if you start a game and go home, it doesn't go back to the custom game menu, but instead takes you back to the classic game mode selection screen

    //// This is here to stop the generation selector from being opened and looking really janky when you are in another menu. Just a little bit visually unpleasing, but if it doesn't open when you click it but you can see it it looks really weird too. Could consider just removing it when a menu is opened
    const [menuOpen, setMenuOpenState] = useState(false);
    function openAndCloseMenu() {
        setMenuOpenState(!menuOpen);
    }

    const [instructionsOpened, setInstructionsState] = useState(false);
    function openAndCloseInstructions() {
        setInstructionsState(!instructionsOpened)
    }

    useEffect(() => {
        const wholeBodyDiv = document.querySelector("#wholeBodyDiv");
        const touchMoveFunction = (event) => {
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
        wholeBodyDiv.addEventListener("touchmove", touchMoveFunction, { passive: false });
        return () => {
            wholeBodyDiv.removeEventListener("touchmove", touchMoveFunction);
        };
    }, []);

    function setGameModeFunction(selectedButton) {
        //// for the actual game mode to pass down to gameInitialization
        if (selectedButton.target.innerText === "Fifty-fifty"){
            //// Because of how it is displayed it wouldn't work otherwise how it is currently coded
            setGameMode(`fiftyFifty${selectedButton.target.innerText}`);
        } else {
            setGameMode(`${selectedMenuGameMode}${selectedButton.target.innerText}`);
        }
    }

    function setMenuGameModeFunction(selectedButton) {
        //// For menu navigation purposes
        if (selectedButton.target.innerText === "Fifty-fifty"){
            //// Because of how it is displayed it wouldn't work otherwise how it is currently coded
            setSelectedMenuGameMode("fiftyFifty");
        } else {
            setSelectedMenuGameMode(selectedButton.target.innerText.toLowerCase());
        }

        setIsMenuModeSelected(true);
    }
    function leaveSelectedMenuMode() {
        setIsMenuModeSelected(false);
    }

    function enterAndLeaveGameModeSelectScreen() {
        setEnteredModeSelectStatus(!enteredModeSelect);
    }

    function setInCustomGameMenuOrNot() {
        setCustomGameMenuModeSelected(!insideCustomGameMenu);
    }

    const effectRan = useRef(false);

    useEffect(() => {
        function localStorageVersionControl() {
            //// deletes everything in localstorage if the version is not the same. Not really needed, but a just in case I want to update things like scoring algorithms. May edit this in future to just erase certain things
            localStorage.version !== gameSettings.currentVersion && localStorage.clear();
            localStorage.version = gameSettings.currentVersion;
        }
        localStorageVersionControl();
    }, []);

    function setPokemonGeneration(selectedGeneration) {
        return setPokemonGenerationModule(selectedGeneration, gameSettings.pokemonGenerations, setPokemonGameData, setSelectedGenForReturn, allGenPokemon);
    }

    useEffect(() => {
        //// Fetches the data from the Pokemon API and sets the home screen when the loading is finished
        if (!effectRan.current) {
            let ignore = false;
            const fetchPokemonData = async () => {
                const fetchData = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025").then((response) => response.json());
                if (!ignore) {
                    getAllPokemonNamesAndImages(fetchData.results).then((pokemonData) => {
                        setFullPokemonData(pokemonData);
                        setPokemonGameData(pokemonData.slice(0, 151)); //// Initial setting for the pokemon
                        setTimeout(() => {
                            setPokemonDataReadyState(true);
                        }, 0); //// Timeout to not make it so jarring for when the loading finishes too quickly. Can put in an animation at a later time
                    });
                }
            };
            fetchPokemonData();
            return () => {
                ignore = true;
            };
        }
        effectRan.current = true;
    }, []);

    function customGameStart(event) {
        event.preventDefault();
        const playerCustomInput = document.querySelector(".gameLimitNumberInput");
        const playerCustomInputValue = playerCustomInput.value;

        if (playerCustomInputValue > gameSettings.maxNumberOfPokemon || playerCustomInputValue < gameSettings.minNumberOfPokemon) {
            //// Controlling the custom validity
            playerCustomInput.setCustomValidity(`You must enter a number between ${gameSettings.minNumberOfPokemon} and ${gameSettings.maxNumberOfPokemon}`);
            playerCustomInput.reportValidity();
        } else {
            setNumberOfPokemon(playerCustomInputValue * 1);
            setGameState(true);
        }
    }

    function gameStart(event) {
        //// For non-custom games
        setNumberOfPokemon(GameModeSettings[selectedMenuGameMode][event.target.innerText].numberOfCards);
        setGameState(true);
    }

    function timedOrNot() {
        !timedCheckBoxTicked ? setTimeCheckBoxState(true) : setTimeCheckBoxState(false);
    }

    function backToHomePage() {
        setGameState(false);
    }

    const selectGameModeProps = {
        timedOrNot: timedOrNot,
        customInputValue: customInputValue,
        gameStart: gameStart,
        customGameStart: customGameStart,
        setcustomInputValue: setcustomInputValue,
        timedCheckBoxTicked: timedCheckBoxTicked,
        setMenuGameModeFunction: setMenuGameModeFunction,
        isMenuModeSelected: isMenuModeSelected,
        selectedMenuGameMode: selectedMenuGameMode,
        leaveSelectedMenuMode: leaveSelectedMenuMode,
        enterAndLeaveGameModeSelectScreen: enterAndLeaveGameModeSelectScreen,
        setInCustomGameMenuOrNot: setInCustomGameMenuOrNot,
        insideCustomGameMenu: insideCustomGameMenu,
        setGameModeFunction: setGameModeFunction,
        openAndCloseMenu: openAndCloseMenu,
        openAndCloseInstructions: openAndCloseInstructions,
    };

    return (
        <>
            {!gameStarted ? (
                <>
                    <div className="topRelativeBar"></div>
                    {/* How to Play and Mode Instructions is set here so the touch move on mobile disabling scrolling doesn't affect it */}
                    {(menuOpen && !enteredModeSelect) && <HowToPlay openAndCloseMenu={openAndCloseMenu} />}
                    {instructionsOpened && <ModeInstructions openAndCloseInstructions={openAndCloseInstructions} openAndCloseMenu={openAndCloseMenu}/>}
                    <div id="wholeBodyDiv">
                        <div className="pokemonLogo"></div>
                        <div id="centerBallDiv">
                            {/* <div className="pokemonLogo"></div> */}
                            {!pokemonDataReady ? (
                                <HomePageLoadingAnimation />
                            ) : (
                                <>
                                    <GenerationSelect pokemonData={pokemonData} setPokemonGeneration={setPokemonGeneration} selectedGenForReturn={selectedGenForReturn} pokemonGenerations={gameSettings.pokemonGenerations} menuOpen={menuOpen} />
                                    {enteredModeSelect ? (
                                        <SelectGameMode props={selectGameModeProps} />
                                    ) : (
                                        <>
                                            <br />
                                            <p className="ballInstructions">This is a memory game where the goal is to click all the cards without selecting the same Pokémon twice!</p>
                                            <strong className="ballBottomStrongTag">How many will you be able to remember?</strong>
                                            <button onClick={enterAndLeaveGameModeSelectScreen} className="enterModeSelectButton">
                                                Select game mode
                                            </button>
                                            <button onClick={openAndCloseMenu} className="howToPlayButton">
                                                How to play
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div id="gameBodyDiv">
                    <InitializeGame numberOfPokemon={numberOfPokemon} pokemonData={pokemonData} backToHomePage={backToHomePage} timed={timedCheckBoxTicked} gameMode={gameMode} />
                </div>
            )}
        </>
    );
}

function HomePageLoadingAnimation() {
    return (
        <>
            <div className="pokeBallLoading"></div>
            <p className="loadingText">Loading...</p>
        </>
    );
}

export default App;
