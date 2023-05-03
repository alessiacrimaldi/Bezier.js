import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const demo = new CodeArea(250, 200, "#pointprojection", "Linear", () => {
    setup();
    demo.clear();
    draw();
});


/* User Code */
let curve, mousep;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier({ x: 60, y: 60 }, { x: 190, y: 120 });
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