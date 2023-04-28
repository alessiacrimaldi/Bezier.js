import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../../lib/bezier.js";
import Drawing from "../../lib/drawing.js";
import handleInteraction from "../../dist/interaction.js";


/* Documentation Example */
const demo = new CodeArea(250, 200, "#constructor", "Cubic", () => {
    setup();
    draw();
});


/* User Code */
let curve;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier(120, 25, 60, 90, 140, 90, 180, 180);

    handleInteraction(demo.canvas, curve, () => {
        draw();
    })
}
setup();

const draw = () => {
    demo.clear();
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
}
draw();