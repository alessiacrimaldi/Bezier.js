import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const demo = new CodeArea(250, 200, "#boundingbox", "Quadratic", () => {
    setup();
    demo.clear();
    draw();
});


/* User Code */
let curve;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier(160, 50, 90, 40, 115, 160);
    curve.bbox();
    // makes the curve interactive
    handleInteraction(demo.canvas, curve, () => {
        curve.bbox();
        draw();
    })
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
    drawing.drawBoundingBox(curve);
}
draw();