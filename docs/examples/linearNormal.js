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
            curve.normal(t = new_value);
            demo.clear();
            draw();
        }
    },
]
const demo = new CodeArea(250, 200, "#normal", "Linear", () => {
    setup();
    demo.clear();
    draw();
}, params);


/* User Code */
let curve, t;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier({ x: 60, y: 60 }, { x: 190, y: 120 });
    curve.normal(t = 0.5);
    // makes the curve interactive
    handleInteraction(demo.canvas, curve, () => {
        curve.normal(t);
        draw();
    })
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
    drawing.drawNormal(curve);
}
draw();