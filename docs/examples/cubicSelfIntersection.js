import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import * as calculation from "../dist/calculation.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const demo = new CodeArea(250, 200, "#selfintersection", "Cubic", () => {
    setup();
    demo.clear();
    draw();
});


/* User Code */
let curve, intersection;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier(200, 150, 40, 90, 170, 20, 170, 180);
    intersection = calculation.calculateIntersection(curve);
    // makes the curve interactive
    handleInteraction(demo.canvas, curve, () => {
        intersection = calculation.calculateIntersection(curve);
        draw();
    })
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
    drawing.drawSelfIntersection(curve, intersection);
}
draw();