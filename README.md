# Bezier.js

Bezier.js is a JavaScript library which provides an API for Bézier quadratic and cubic curves, useful in the context of 2D Web graphics.

It is inspired by *[Bezier.js](https://pomax.github.io/bezierjs/)* and *[A Primer on Bézier Curves](https://pomax.github.io/bezierinfo/)* by Pomax.

## Installation
There is a rolled-up version of the library files `bezier.js`, `drawing.js` and `interaction.js` in the dist directory. Just download those files and drop them into your JS asset dir. Then import them to use the libary functionalities.
````
import { Bezier } from "bezierjs/calculation";
import Drawing from "bezierjs/drawing";
import handleInteraction from "bezierjs/interaction";
````

## Working on the code
For the documentation and the API see `index.html` into the `docs` directory, while all the working library code is into the `lib` directory.
