import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
import * as calculation from "../dist/calculation.js";
import Drawing from "../dist/drawing.js";
import handleInteraction from "../dist/interaction.js";


/* Documentation Example */
const params = [
    {
        name: "t",
        min: 0,
        max: 1,
        value: 0.5,
        step: 0.01,
        handler: (new_value) => {
            kr = calculation.calculateCurvature(curve, t = new_value);
            p = calculation.getCurvePoint(curve, t = new_value);
            n = calculation.calculateNormal(curve, t = new_value);
            c = { x: p.x + n.x * kr.r, y: p.y + n.y * kr.r };
            circ = { x: c.x, y: c.y, r: Math.abs(kr.r) };
            demo.clear();
            draw();
        }
    },
]
const demo = new CodeArea(250, 200, "#curvature", "Quadratic", () => {
    setup();
    demo.clear();
    draw();
}, params);


/* User Code */
let curve, t, kr, p, n, c, circ;
const drawing = new Drawing(demo.context)

const setup = () => {
    curve = new Bezier(60, 40, 180, 30, 160, 160);
    // curve curvature in t parameter
    kr = calculation.calculateCurvature(curve, t = 0.5);
    // on curve point
    p = calculation.getCurvePoint(curve, t = 0.5);
    // curve normal in that point
    n = calculation.calculateNormal(curve, t = 0.5);
    // center of the circumference 
    c = { x: p.x + n.x * kr.r, y: p.y + n.y * kr.r };
    // circumference along the curve
    circ = { x: c.x, y: c.y, r: Math.abs(kr.r) };

    // makes the curve interactive
    handleInteraction(demo.canvas, curve, () => {
        kr = calculation.calculateCurvature(curve, t);
        p = calculation.getCurvePoint(curve, t);
        n = calculation.calculateNormal(curve, t);
        c = { x: p.x + n.x * kr.r, y: p.y + n.y * kr.r };
        circ = { x: c.x, y: c.y, r: Math.abs(kr.r) };
        draw();
    })
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
    drawing.drawCurvature(curve, kr, t);
    drawing.drawCircle(circ);
    drawing.drawPoint(p, 3, "red", "white");
    drawing.drawPoint(c, 3, "red", "white");
}
draw();