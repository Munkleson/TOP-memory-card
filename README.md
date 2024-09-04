# The Odin Project - Pokemon Memory Card Game - v0.1

This is my React single-page application for a memory game, where you have to not select the same card in the same game. Scores are currently saved in localStorage.

Link: https://munkleson.github.io/TOP-memory-card/

How to play:

-   Pick a game mode
-   Aim to click as many unique cards as possible
    -   If you click all the cards without a repeat, you win the game
-   If you clicked the timed mode, you have 5 seconds to select another card which resets the timer
    -   Selecting the same card in the same game or if the timer runs out, you lose
-   You are able to select the Generation of Pokemon you wish to play with

The project is part of the learn React course from The Odin Project. The goal is to practice using hooks to manage and utilise state while using effects for tasks such as fetching data from an external API. The API I chose was the PokeAPI (https://pokeapi.co/).

This is my first project where I have committed to actually making a more finished product, and not only am I trying to make it edge-case and bug-free as much as possible, styling is also on the forefront of my mind. Usually, I focus on one or the other, depending on what I am practicing with a project.

Things this project helped me with learning/practicing:

-   How to code for scalability
    -   Initially the scope of the project was to just make it so you could choose a specific number of cards to play with, setting your own difficulty. However, this presented a problem when it came to scalability, as based on the original scope a lot of variables like max and min number of cards was hard-coded
    -   Learning how to keep scaling in mind was important, and completely new to me, so it is a learning process
-   Refactoring for cleaner code style
    -   A lot of logic was initially bundled up where they could have been in the components they affected. Components also being bundled up in the same file was an issue, and managing to condense code while moving them around and not breaking the app was a challenge in a lot of areas
    -   There were initialy duplications of code, until I learnt that even conditionals can be placed within a style attribute in a jsx component
    -   Initially I was more concerned with making the app work first, and then worry about readability later, but it got to points where I was having trouble locating things instantly, so refactoring became a focus at one point until it got to a much better state
-   The most minor thing, but that I did not need to disable button pressing at a time when I did not want them to be pressed. An animation (or any element really) that has the highest z index covering everything will already disalbe them by default even if transparent
-   Responsive design
    -   Previously I hardcoded most css properties in usually px. Changing to a vh/vw/em style was initially difficult, but was necessary when testing it on a PC with a different resolution, it had copious amounts of overlapping elements, elements missing, etc.
    -   Getting my head around using media queries with aspect ratios was difficult at first
    -   Design for mobile first

Future features planned:

-   Mobile support - Completed
    -   Currently as of v0.1 while it can work on mobile, it really doesn't well, and things do not scale properly. Currently there are no real @media queries used for this purpose
-   More settings
    -   Such as removing animations
    -   Custom animations
    -   Scoring algorithm
    -   Database integration for scores
    -   About section
    -   Contact
    -   Anything else that is normally in a menu section
-   Code refactoring
    -   A ever-continuing process
    -   Making it even more scalable and more importantly, readable (even for myself)
-   Game modes
-   Achievements/generations being unlocked bit by bit

Any suggestions for improvement or feedback you can send to me at munkleson@gmail.com

Credits:

-   The Odin Project for such a fantastic course and the basis of this project
-   PokeAPI for the Pokemon API
-   QuickCodingTuts on Youtube for a video on making a drop down menu and their code
-   All my friends who either helped me out with testing or with code https://munkleson.github.io/TOP-memory-card/
