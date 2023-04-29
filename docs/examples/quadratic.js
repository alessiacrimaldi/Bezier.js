import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const demo = new CodeArea(250, 200, "#constructor", "Quadratic", () => {
    setup();
    draw();
});


/* User Code */
let curve;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier(160, 40, 90, 30, 115, 150);

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