import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import * as calculation from "../dist/calculation.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const params = [
    {
        name: "error",
        min: 0.05,
        max: 1,
        value: 0.5,
        step: 0.05,
        handler: (new_value) => {
            arcs = calculation.calculateArcs(curve, error = new_value);
            demo.clear();
            draw();
        }
    },
]
const demo = new CodeArea(250, 200, "#arcs", "Cubic", () => {
    setup();
    demo.clear();
    draw();
}, params);


/* User Code */
let curve, arcs, error;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier(190, 180, 80, 150, 180, 35, 60, 25);
    arcs = calculation.calculateArcs(curve, error = 0.5);
    // makes the curve interactive
    handleInteraction(demo.canvas, curve, () => {
        arcs = calculation.calculateArcs(curve, error);
        draw();
    })
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
    drawing.drawCircularArcs(arcs);
}
draw();