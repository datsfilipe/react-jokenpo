# React Jokenpo

It's a game of jokenpo made with ReactJS. It's a simple game, but it's a good way to see how React state works.

## Showcase


## Description

It have four main states and another one to control if the game is over or not. The states are:
- Guess: It's the player guess in which he choose rock, paper or scissors and it's a string.
- Scissors, Rocks and Papers: They are arrays of objects with the props:
  - Value: It's the value of the object, it can be rock, paper or scissor;
  - X: It's the x position of the object;
  - Y: It's the y position of the object;
  - Id: It's used for React to keep the reference of rendered objects in the DOM and the changes in the states.

## TODO

- Maybe check for performance issues?
- Refactor the code to make it more clean and readable?
- Add more features to the game (like a score system, a multiplayer mode, etc)?
