# The Odin Project - Pokemon Memory Card Game - v0.1

This is my React single-page application for a memory game, where you have to not select the same card in the same game. Scores are currently saved in localStorage.

Link: https://munkleson.github.io/TOP-memory-card/

How to play:
- Pick a game mode
- If you clicked the timer mode, you have 5 seconds to select another card which resets the timer
    - Selecting the same card in the same game or if the timer runs out, you lose
- Aim to click as many unique cards as possible
    - If you click all the cards, you win the game

The project is part of the learn React course from The Odin Project. The goal is to practice using hooks to manage and utilise state while using effects for tasks such as fetching data from an external API. The API I chose was the PokeAPI (https://pokeapi.co/).

This is my first project where I have committed to actually making a more releasable app, and not only am I trying to make it edge-case and bug-free as much as possible, styling is on the forefront of my mind. Usually, I focus on one or the other.

Things this project helped me with learning/practicing:

-   How to code for scalability
    -   Initially the scope of the project was to just make it so you could choose a specific number of cards to play with, setting your own difficulty. However, this presented a problem when it came to scalability, as based on the original scope a lot of variables like max and min number of cards was hard-coded
    -   Learning how to keep scaling in mind was important, and completely new to me, so it is a learning process
-   


Future features planned:
- Mobile support
    - Currently as of v0.1 while it can work on mobile, it really doesn't, and a lot of elements are completely missing.
- More settings
    - Such as remove animations
    - Custom animations
    - Scoring algorithm
    - Database integration for scores

Any suggestions for improvement or feedback you can send to me at munkleson@gmail.com

Credits:
- The Odin Project for such a fantastic course and the basis of this project
- PokeAPI for the Pokemon API
- All my friends who either helped me out with testing or with code