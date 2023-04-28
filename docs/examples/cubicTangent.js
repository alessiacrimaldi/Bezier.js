import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../../lib/bezier.js";
import * as calculation from "../../dist/calculation.js";
import Drawing from "../../lib/drawing.js";
import handleInteraction from "../../dist/interaction.js";


/* Documentation Example */
const params = [
    {
        name: "t",
        min: 0,
        max: 1,
        value: 0.5,
        step: 0.01,
        handler: (new_t) => {
            calculation.calculateTangent(curve, t = new_t);
            draw();
        }
    },
]
const demo = new CodeArea(250, 200, "#tangent", "Cubic", () => {
    setup();
    draw();
}, params);


/* User Code */
let curve, t;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier(120, 25, 60, 90, 140, 90, 180, 180);
    calculation.calculateTangent(curve, t = 0.5);

    handleInteraction(demo.canvas, curve, () => {
        calculation.calculateTangent(curve, t);
        draw();
    })
}
setup();

const draw = () => {
    demo.clear();
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
    drawing.drawTangent(curve);
}
draw();
