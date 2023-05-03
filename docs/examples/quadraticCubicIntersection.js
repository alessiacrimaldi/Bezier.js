import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const demo = new CodeArea(250, 200, "#cubicintersection", "Quadratic", () => {
    setup();
    demo.clear();
    draw();
});


/* User Code */
let curve1, curve2;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve1 = new Bezier(160, 50, 90, 40, 115, 160);
    curve2 = new Bezier(80, 30, 30, 140, 190, 60, 150, 170);
    curve1.intersects(curve2);
    // makes the curve interactive
    handleInteraction(demo.canvas, curve1, () => {
        curve1.intersects(curve2);
        draw();
    })
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve1);
    drawing.drawCurve(curve1);
    drawing.drawCurve(curve2, "red");
    drawing.drawCurvesIntersection(curve1);
}
draw();