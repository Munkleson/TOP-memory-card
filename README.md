# The Odin Project - Pokemon Memory Card Game - v0.1

This is my React single-page application for a memory game, where you have to not select the same card in the same game. Scores are currently saved in localStorage.

Link: https://munkleson.github.io/TOP-memory-card/

How to play:

-   Pick a game mode
-   If you clicked the timer mode, you have 5 seconds to select another card which resets the timer
    -   Selecting the same card in the same game or if the timer runs out, you lose
-   Aim to click as many unique cards as possible
    -   If you click all the cards, you win the game

The project is part of the learn React course from The Odin Project. The goal is to practice using hooks to manage and utilise state while using effects for tasks such as fetching data from an external API. The API I chose was the PokeAPI (https://pokeapi.co/).

This is my first project where I have committed to actually making a more finished product, and not only am I trying to make it edge-case and bug-free as much as possible, styling is also on the forefront of my mind. Usually, I focus on one or the other, depending on what I am practicing with a project.

Things this project helped me with learning/practicing:

-   How to code for scalability
    -   Initially the scope of the project was to just make it so you could choose a specific number of cards to play with, setting your own difficulty. However, this presented a problem when it came to scalability, as based on the original scope a lot of variables like max and min number of cards was hard-coded
    -   Learning how to keep scaling in mind was important, and completely new to me, so it is a learning process
-   Keeping code clean/code style
    -   While it is still a heavy mess, it was in a much worse state originally for a lot of it, and a lot less components were used compared to now
-   The most minor thing, but that I did not need to disable button pressing at a time when I did not want them to be pressed. An animation (or any element really) that has the highest z index covering everything will already disalbe them by default even if transparent

Future features planned:

-   Mobile support
    -   Currently as of v0.1 while it can work on mobile, it really doesn't, and a lot of elements are completely missing.
-   More settings
    -   Such as remove animations
    -   Custom animations
    -   Scoring algorithm
    -   Database integration for scores
    -   About section
    -   Contact
    -   Anything else that is normally in a menu section
-   Code refactoring
    -   Making it even more scalable and more importantly, readable (even for myself)
-   Game modes
-   You can select which Pokemon generation (or all) you wish to play with/customizable list
    -   I would have to change the way I fetch from the API. Retrieving so many at this time leads to massive lag, and crashes the browser, so limiting it to 151 or 251 at this time works.
    -   A lot of the pokemon data logic would need to be placed elsewhere. A drop down menu which when selected, would fetch a different generation each time might be the best option
    -   States for the url string of the API, or at least the end part, may need to be done.

Any suggestions for improvement or feedback you can send to me at munkleson@gmail.com

Credits:

-   The Odin Project for such a fantastic course and the basis of this project
-   PokeAPI for the Pokemon API
-   QuickCodingTuts on Youtube for a video on making a drop down menu and their code
-   All my friends who either helped me out with testing or with code https://munkleson.github.io/TOP-memory-card/
