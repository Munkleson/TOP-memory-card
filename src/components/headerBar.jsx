import "./css_files/headerBar.css";

export default function HeaderBar({ resetGame, replayGame, highScore, currentScore }) {
    return (
        <header id="headerBar">
            <button onClick={resetGame} className="headerButtons">Back to home</button>
            <button onClick={replayGame} className="headerButtons">Restart game</button>
            <div className="headerPokemonLogo"></div>
            <p>Current score: {currentScore}</p>
            <p>High score for current mode: {highScore}</p>
        </header>
    );
}
 