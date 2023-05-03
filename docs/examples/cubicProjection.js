import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const demo = new CodeArea(250, 200, "#pointprojection", "Cubic", () => {
    setup();
    demo.clear();
    draw();
});


/* User Code */
let curve, mousep;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier(120, 25, 60, 90, 140, 90, 180, 180);
    // makes the curve interactive
    handleInteraction(demo.canvas, curve, () => {
        draw();
    });
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
}
draw();

demo.canvas.addEventListener("mousemove", (evt) => {
    mousep = { x: evt.offsetX, y: evt.offsetY };
    curve.project(mousep);
    demo.clear();
    draw();
    drawing.drawProjection(curve, "orange");
});