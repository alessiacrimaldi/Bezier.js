import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const demo = new CodeArea(250, 200, "#lineintersection", "Cubic", () => {
    setup();
    demo.clear();
    draw();
});


/* User Code */
let curve, line;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier(80, 30, 30, 140, 190, 60, 170, 160);
    line = { p1: { x: 40, y: 25 }, p2: { x: 210, y: 170 } };
    curve.intersects(line);
    // makes the curve interactive
    handleInteraction(demo.canvas, curve, () => {
        curve.intersects(line);
        draw();
    })
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
    drawing.drawLine(line.p1, line.p2, "red");
    drawing.drawPoints([line.p1, line.p2], 2.5, "red");
    drawing.drawLineIntersection(curve);
}
draw();