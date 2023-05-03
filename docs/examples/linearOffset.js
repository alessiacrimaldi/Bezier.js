import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const params = [
    {
        name: "distance",
        min: -30,
        max: 30,
        value: 15,
        step: 1,
        handler: (new_value) => {
            curve.offset(d = new_value);
            demo.clear();
            draw();
        }
    },
]
const demo = new CodeArea(250, 200, "#offset", "Linear", () => {
    setup();
    demo.clear();
    draw();
}, params);


/* User Code */
let curve, d;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier({ x: 60, y: 60 }, { x: 190, y: 120 });
    curve.offset(d = 15);
    // makes the curve interactive
    handleInteraction(demo.canvas, curve, () => {
        curve.offset(d);
        draw();
    })
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
    drawing.drawOffsetCurve(curve);
}
draw();