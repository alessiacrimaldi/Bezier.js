# Bezier.js

Bezier.js is an ES Module based library for Node.js and browsers which provides an API for Bézier quadratic and cubic curves useful in the context of 2D Web graphics.

It is inspired by *[Bezier.js](https://pomax.github.io/bezierjs/)* and *[A Primer on Bézier Curves](https://pomax.github.io/bezierinfo/)* by Pomax.

## Installation
`npm install bezierjs` will add bezierjs to your dependencies.

### Without using a package manager
There is a rolled-up version of the library files `calculation.js`, `drawing.js` and `interaction.js` in the dist directory. Just download those files and drop them into your JS asset dir.

## In Node, as dependency
````
import calculation from "bezierjs/calculation";
import drawing from "bezierjs/drawing";
import handleInteraction from "bezierjs/interaction";
````

## Working on the code
For playing a demo and the API see `index.html` (in the `docs` directory), while the library code is in the `lib` directory.
