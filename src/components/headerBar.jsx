import "./css_files/headerBar.css";

export default function HeaderBar({ resetGame, replayGame, highScore, currentScore }) {
    return (
        <header id="headerBar">
            <button onClick={resetGame} className="headerButtons">Back to home</button>
            <button onClick={replayGame} className="headerButtons">Play again</button>
            <div className="headerPokemonLogo"></div>
            <p>High score for current mode: {highScore}</p>
            <p>Current score: {currentScore}</p>
        </header>
    );
}
