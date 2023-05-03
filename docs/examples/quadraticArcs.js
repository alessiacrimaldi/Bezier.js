import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
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
            curve.arcs(error = new_value);
            demo.clear();
            draw();
        }
    },
]
const demo = new CodeArea(250, 200, "#arcs", "Quadratic", () => {
    setup();
    demo.clear();
    draw();
}, params);


/* User Code */
let curve, error;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier(80, 35, 180, 50, 180, 160);
    curve.arcs(error = 0.5);
    // makes the curve interactive
    handleInteraction(demo.canvas, curve, () => {
        curve.arcs(error);
        draw();
    })
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
    drawing.drawCircularArcs(curve);
}
draw();