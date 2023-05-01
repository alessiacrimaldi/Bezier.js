import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const demo = new CodeArea(250, 200, "#path-constructor", "Closed PolyBezier", () => {
    setup();
    demo.clear();
    draw();
});


/* User Code */
let curves, path;
const drawing = new Drawing(demo.context);

const setup = () => {
    curves = [
        new Bezier({ x: 90, y: 40 }, { x: 160, y: 40 }),
        new Bezier({ x: 160, y: 40 }, { x: 125, y: 40 }, { x: 125, y: 90 }, { x: 160, y: 90 }),
        new Bezier({ x: 160, y: 90 }, { x: 190, y: 90 }, { x: 210, y: 110 }, { x: 155, y: 180 }),
        new Bezier({ x: 155, y: 180 }, { x: 95, y: 180 }),
        new Bezier({ x: 95, y: 180 }, { x: 40, y: 110 }, { x: 60, y: 90 }, { x: 90, y: 90 }),
        new Bezier({ x: 90, y: 90 }, { x: 125, y: 90 }, { x: 125, y: 40 }, { x: 90, y: 40 })
    ];
    path = new Bezier.PolyBezier(curves);
    // makes the curves interactive
    path.curves.forEach(curve => {
        handleInteraction(demo.canvas, curve, () => {
            draw();
        })
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