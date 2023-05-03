import CodeArea from "../js/CodeArea.js";
import { Bezier } from "../dist/bezier.js";
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
            kr = curve.curvature(t = new_value);
            p = curve.get(t = new_value);
            n = curve.normal(t = new_value);
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
    kr = curve.curvature(t = 0.5);
    // on curve point
    p = curve.get(t = 0.5);
    // curve normal in that point
    n = curve.normal(t = 0.5);
    // center of the circumference 
    c = { x: p.x + n.x * kr.r, y: p.y + n.y * kr.r };
    // circumference along the curve
    circ = { x: c.x, y: c.y, r: Math.abs(kr.r) };

    // makes the curve interactive
    handleInteraction(demo.canvas, curve, () => {
        kr = curve.curvature(t);
        p = curve.get(t);
        n = curve.normal(t);
        c = { x: p.x + n.x * kr.r, y: p.y + n.y * kr.r };
        circ = { x: c.x, y: c.y, r: Math.abs(kr.r) };
        draw();
    })
}
setup();

const draw = () => {
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);
    drawing.drawCurvature(curve);
    drawing.drawCircle(circ);
    drawing.drawPoint(p, 3, "red", "white");
    drawing.drawPoint(c, 3, "red", "white");
}
draw();