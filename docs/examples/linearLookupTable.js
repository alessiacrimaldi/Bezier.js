import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const params = [
    {
        name: "steps",
        min: 2,
        max: 40,
        value: 10,
        step: 1,
        handler: (new_value) => {
            curve.getLUT(steps = new_value);
            demo.clear();
            draw();
        }
    },
]
const demo = new CodeArea(250, 200, "#lut", "Linear", () => {
    setup();
    demo.clear();
    draw();
}, params);


/* User Code */
let curve, steps;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier({ x: 60, y: 60 }, { x: 190, y: 120 });
    curve.getLUT(steps = 10);
    // makes the curve interactive
    handleInteraction(demo.canvas, curve, () => {
        curve.getLUT(steps);
        draw();
    })
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
    drawing.drawLookupTable(curve, 2.5, "red");
}
draw();