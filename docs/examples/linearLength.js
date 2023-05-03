import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const demo = new CodeArea(250, 200, "#length", "Linear", () => {
    setup();
    demo.clear();
    draw();
});


/* User Code */
let curve, label;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier({ x: 60, y: 60 }, { x: 190, y: 120 });
    curve.length();
    // makes the curve interactive
    handleInteraction(demo.canvas, curve, () => {
        curve.length();
        draw();
    })
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
    label = ((100 * curve.len) | 0) / 100 + " px";
    drawing.drawText(`Length: ${label}`, { x: 5, y: demo.canvas.height - 5 });
}
draw();