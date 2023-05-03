import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const params = [
    {
        name: "t",
        min: 0,
        max: 1,
        value: 0.5,
        step: 0.01,
        handler: (new_value) => {
            curve.derivative(t = new_value);
            demo.clear();
            draw();
        }
    },
]
const demo = new CodeArea(250, 200, "#tangent", "Cubic", () => {
    setup();
    demo.clear();
    draw();
}, params);


/* User Code */
let curve, t;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier(120, 25, 60, 90, 140, 90, 180, 180);
    curve.derivative(t = 0.5);
    // makes the curve interactive
    handleInteraction(demo.canvas, curve, () => {
        curve.derivative(t);
        draw();
    })
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
    drawing.drawTangent(curve);
}
draw();