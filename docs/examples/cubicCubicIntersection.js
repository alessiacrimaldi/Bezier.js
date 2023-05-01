import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import * as calculation from "../dist/calculation.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const demo = new CodeArea(250, 200, "#cubicintersection", "Cubic", () => {
    setup();
    demo.clear();
    draw();
});


/* User Code */
let curve1, curve2, intersection;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve1 = new Bezier(120, 25, 60, 90, 140, 90, 180, 180);
    curve2 = new Bezier(80, 30, 30, 140, 190, 60, 150, 170);
    intersection = calculation.calculateIntersection(curve1, curve2);
    // makes the curve interactive
    handleInteraction(demo.canvas, curve1, () => {
        intersection = calculation.calculateIntersection(curve1, curve2);
        draw();
    })
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve1);
    drawing.drawCurve(curve1);
    drawing.drawCurve(curve2, "red");
    drawing.drawCurvesIntersection(curve1, intersection);
}
draw();