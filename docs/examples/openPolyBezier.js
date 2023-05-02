import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const demo = new CodeArea(250, 200, "#path-constructor", "Open PolyBezier", () => {
    setup();
    demo.clear();
    draw();
});


/* User Code */
let curves, path;
const drawing = new Drawing(demo.context);

const setup = () => {
    curves = [
        new Bezier({ x: 50, y: 30 }, { x: 150, y: 50 }),
        new Bezier({ x: 150, y: 50 }, { x: 220, y: 140 }, { x: 150, y: 150 }),
        new Bezier({ x: 150, y: 150 }, { x: 50, y: 160 }, { x: 50, y: 60 }, { x: 100, y: 100 })
    ];
    path = new Bezier.PolyBezier(curves);
    // makes the curves interactive
    handleInteraction(demo.canvas, path.curves, () => {
        draw();
    })
}
setup();

const draw = () => {
    path.curves.forEach(curve => {
        drawing.drawSkeleton(curve);
        drawing.drawCurve(curve);
    })
}
draw();