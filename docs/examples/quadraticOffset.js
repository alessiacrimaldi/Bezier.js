import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import * as calculation from "../dist/calculation.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const params = [
    {
        name: "t",
        min: -30,
        max: 30,
        value: 15,
        step: 1,
        handler: (new_value) => {
            offcurve = calculation.calculateOffset(curve, t = new_value);
            demo.clear();
            draw();
        }
    },
]
const demo = new CodeArea(250, 200, "#offset", "Quadratic", () => {
    setup();
    demo.clear();
    draw();
}, params);


/* User Code */
let curve, offcurve, t;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier(160, 50, 90, 40, 115, 160);
    offcurve = calculation.calculateOffset(curve, t = 15);
    // makes the curve interactive
    handleInteraction(demo.canvas, curve, () => {
        offcurve = calculation.calculateOffset(curve, t = 15);
        draw();
    })
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
    drawing.drawOffsetCurve(offcurve);
}
draw();