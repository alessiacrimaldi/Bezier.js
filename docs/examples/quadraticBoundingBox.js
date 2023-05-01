import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import * as calculation from "../dist/calculation.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const demo = new CodeArea(250, 200, "#boundingbox", "Quadratic", () => {
    setup();
    demo.clear();
    draw();
});


/* User Code */
let curve, bbox;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier(160, 50, 90, 40, 115, 160);
    bbox = calculation.calculateBoundingBox(curve);
    // makes the curve interactive
    handleInteraction(demo.canvas, curve, () => {
        bbox = calculation.calculateBoundingBox(curve);
        draw();
    })
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
    drawing.drawBoundingBox(bbox);
}
draw();