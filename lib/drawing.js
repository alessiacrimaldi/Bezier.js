import * as calculation from "./calculation.js";


var ctx,
    randomIndex = 0,
    randomColors = [];

/* FUNCTIONS FOR RANDOM CURVE COLOURS */
for (var i = 0, j; i < 360; i++) {
    j = (i * 47) % 360;
    randomColors.push("hsl(" + j + ",50%,50%)");
}

function getRandomColor() {
    randomIndex = (randomIndex + 1) % randomColors.length;
    var c = randomColors[randomIndex];
    return c;
}

function getRandomFill(a) {
    randomIndex = (randomIndex + 1) % randomColors.length;
    a = typeof a === "undefined" ? 1 : a;
    var c = randomColors[randomIndex];
    c = c.replace("hsl(", "hsla(").replace(")", "," + a + ")");
    return c;
}

/* BASIC DRAWING FUNCTIONS */
export function setContext(context) {
    ctx = context;
}

export function drawLine(p1, p2, colour = "lightgrey") {
    ctx.strokeStyle = colour;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.closePath();
}

export function drawPoints(points, r, colour) {
    points.forEach(p => drawPoint(p.x, p.y, r, colour));
}

export function drawPoint(px, py, r = 3.5, colour = "black") {
    ctx.strokeStyle = colour;
    ctx.beginPath();
    ctx.arc(px, py, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
}

export function drawSkeleton(curve) {
    var pts = curve.points;
    drawLine(pts[0], pts[1]);
    if (pts.length === 3) {
        drawLine(pts[1], pts[2]);
    } else if (pts.length === 4) {
        drawLine(pts[2], pts[3]);
    }
    drawPoints(pts);
}

export function drawCurve(curve, colour = "black") {
    ctx.strokeStyle = colour;
    ctx.beginPath();
    var pts = curve.points;
    ctx.moveTo(pts[0].x, pts[0].y);
    if (curve._lut.length == 0) {
        calculation.calculateCurvePoints(curve);
    }
    drawPoints(curve._lut, 0.1, colour);
    ctx.stroke();
    ctx.closePath();
}

export function drawText(text, offset) {
    offset = offset || { x: 0, y: 0 };
    ctx.fillText(text, offset.x, offset.y);
}

/* ADDITIONAL DRAWING FUNCTIONS FOR LIBRARY USAGE */
export function drawLookUpTable(lut, r, colour) {
    drawPoints(lut, r, colour);
}

export function drawLength(curve, arclength, colour = "red") {
    var offset = calculation.getOffsetCurve(curve, -10);
    var last = offset.length - 1;
    offset.forEach((c, idx) => {
        drawCurve(c, colour);
        if (idx === last) {
            let p1 = calculation.getOffsetCurve(curve, 0.95, -15);
            let p2 = calculation.getCurvePoint(c, 1);
            let p3 = calculation.getOffsetCurve(curve, 0.95, -5);
            drawLine(p1, p2, colour);
            drawLine(p2, p3, colour);
            let label = ((100 * arclength) | 0) / 100 + "px";
            drawText(label, { x: p2.x + 7, y: p2.y - 3 });
        }
    });
}

export function drawCurvePoint(point, r = 5, colour = "red") {
    drawPoint(point.x, point.y, r, colour);
}

export function drawTangent(curve, dv, t, colour = "red") {
    var pt = calculation.getCurvePoint(curve, t);
    drawLine(pt, { x: pt.x + dv.x, y: pt.y + dv.y }, colour);
}

export function drawTangents(curve, dvs, gap, colour = "red") {
    for (var t = 0, i = 0, pt; t <= 1; t += gap, i++) {
        pt = calculation.getCurvePoint(curve, t);
        drawLine(pt, { x: pt.x + dvs[i].x, y: pt.y + dvs[i].y }, colour);
    }
}

export function drawNormal(curve, normal, t, d = 20, colour = "red") {
    var pt = calculation.getCurvePoint(curve, t);
    drawLine(pt, { x: pt.x + d * normal.x, y: pt.y + d * normal.y }, colour);
}

export function drawNormals(curve, normals, gap, d = 20, colour = "red") {
    for (var t = 0, i = 0; t <= 1; t += gap, i++) {
        var pt = calculation.getCurvePoint(curve, t);
        drawLine(pt, { x: pt.x + d * normals[i].x, y: pt.y + d * normals[i].y }, colour);
    }
}

export function drawSplittedCurve(curve, split, colour = "red", t1, t2) {
    if (t2) {
        drawCurve(split, colour);
        drawPoint(calculation.getCurvePoint(curve, t1).x, calculation.getCurvePoint(curve, t1).y, 3, colour);
        drawPoint(calculation.getCurvePoint(curve, t2).x, calculation.getCurvePoint(curve, t2).y, 3, colour);
    } else {
        drawCurve(split[0], colour);
        drawCurve(split[1], colour);
        drawPoint(calculation.getCurvePoint(curve, t1).x, calculation.getCurvePoint(curve, t1).y, 3, colour);
    }
}

export function drawCurveExtremas(curve, extrema, r = 3, colour = "red") {
    ctx.strokeStyle = colour;
    extrema.values.forEach(t => {
        let extremaPoint = calculation.getCurvePoint(curve, t);
        drawPoint(extremaPoint.x, extremaPoint.y, r, colour);
    })
}

export function drawInflectionPoints(curve, inflectionPoints, r = 3, colour = "red") {
    ctx.strokeStyle = colour;
    inflectionPoints.forEach(t => {
        let inflectionPoint = calculation.getCurvePoint(curve, t);
        drawPoint(inflectionPoint.x, inflectionPoint.y, r, colour);
    })
}

export function drawCurvature(curve, kr, t, colour = "#ff7f33") {
    var p = calculation.getCurvePoint(curve, t);
    var n = calculation.calculateNormal(curve, t);
    drawLine(p, { x: p.x + n.x * kr.k * 5000, y: p.y + n.y * kr.k * 5000, }, colour);
}

export function drawCurvatures(curve, krs, gap = 2) {
    for (var s = 0, i = 0; s < 256; s += gap, i++) {
        let t = s / 255;
        let p = calculation.getCurvePoint(curve, t);
        let n = calculation.calculateNormal(curve, t, true);
        drawLine(p, { x: p.x + n.x * krs[i].k * 5000, y: p.y + n.y * krs[i].k * 5000, }, "rgba(255,127," + s + ",0.6)");
    }
}

export function drawBoundingBox(bbox, colour = "red") {
    ctx.strokeStyle = colour;
    ctx.beginPath();
    ctx.moveTo(bbox.x.min, bbox.y.min);
    ctx.lineTo(bbox.x.min, bbox.y.max);
    ctx.lineTo(bbox.x.max, bbox.y.max);
    ctx.lineTo(bbox.x.max, bbox.y.min);
    ctx.closePath();
    ctx.stroke();
}

export function drawHullPoints(hull, colour = "red") {
    ctx.strokeStyle = colour;
    ctx.beginPath();
    if (hull.length === 6) {
        ctx.moveTo(hull[0].x, hull[0].y);
        ctx.lineTo(hull[1].x, hull[1].y);
        ctx.lineTo(hull[2].x, hull[2].y);
        ctx.moveTo(hull[3].x, hull[3].y);
        ctx.lineTo(hull[4].x, hull[4].y);
    } else {
        ctx.moveTo(hull[0].x, hull[0].y);
        ctx.lineTo(hull[1].x, hull[1].y);
        ctx.lineTo(hull[2].x, hull[2].y);
        ctx.lineTo(hull[3].x, hull[3].y);
        ctx.moveTo(hull[4].x, hull[4].y);
        ctx.lineTo(hull[5].x, hull[5].y);
        ctx.lineTo(hull[6].x, hull[6].y);
        ctx.moveTo(hull[7].x, hull[7].y);
        ctx.lineTo(hull[8].x, hull[8].y);
    }
    ctx.stroke();
    ctx.closePath();
    drawPoint(hull.slice(-1)[0].x, hull.slice(-1)[0].y, 4.5, colour);
}

export function drawProjection(proj, p, colour = "red") {
    drawLine(proj, p, colour);
}

export function drawOffsetCurve(offsetCurve, colour = "red") {
    offsetCurve.forEach(c => drawCurve(c, colour));
}

export function drawOffsetPoint(offsetCoords, colour = "red") {
    drawPoint(offsetCoords.x, offsetCoords.y, 4, colour);
}

export function drawReducedCurve(reduced, colour) {
    reduced.forEach((c, i) => {
        if (i > 0) drawPoint(c.points[0].x, c.points[0].y, 3);
        drawCurve(c, colour || getRandomColor());
    })
}

export function drawCircularArcs(arcs, colour) {
    arcs.forEach(arc => drawArc(arc, colour));
}

export function drawArc(arc, colour = getRandomFill(0.1)) {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.moveTo(arc.x, arc.y);
    ctx.arc(arc.x, arc.y, arc.r, arc.s, arc.e);
    ctx.lineTo(arc.x, arc.y);
    ctx.fill();
    ctx.stroke();
}

export function drawScaledCurve(reduced, scaled, colour) {
    drawReducedCurve(reduced, "black");
    for (var k = 0; k <= 6; k++) {
        drawCurve(scaled[k], colour);
    }
}

export function drawCurveOutline(outline, outColour = "red", offset, offColour = "rgba(0,0,255,0.2)") {
    outline.curves.forEach(c => drawCurve(c, outColour));
    if (offset) {
        offset.pos.curves.forEach(c => drawCurve(c, offColour));
        offset.neg.curves.forEach(c => drawCurve(c, offColour));
    console.log(offset)
    }
}

export function drawCurveGradOutline(goutline, colour = "red") {
    goutline.curves.forEach(c => drawCurve(c, colour));
}

export function drawShapedOutline(soutline, colour, fillColour) {
    soutline.forEach(s => drawShape(s, colour, fillColour));
}

export function drawShape(shape, colour = "red", fillColour = getRandomFill(0.2)) {
    ctx.strokeStyle = colour;
    ctx.fillStyle = fillColour;
    var order = shape.forward.points.length - 1;
    var scl = shape.startcap.points.length;
    var ecl = shape.endcap.points.length;
    ctx.beginPath();
    ctx.moveTo(
        shape.startcap.points[0].x,
        shape.startcap.points[0].y
    );
    ctx.lineTo(
        shape.startcap.points[scl - 1].x,
        shape.startcap.points[scl - 1].y
    );
    if (order === 3) {
        ctx.bezierCurveTo(
            shape.forward.points[1].x,
            shape.forward.points[1].y,
            shape.forward.points[2].x,
            shape.forward.points[2].y,
            shape.forward.points[3].x,
            shape.forward.points[3].y
        );
    } else {
        ctx.quadraticCurveTo(
            shape.forward.points[1].x,
            shape.forward.points[1].y,
            shape.forward.points[2].x,
            shape.forward.points[2].y
        );
    }
    ctx.lineTo(
        shape.endcap.points[ecl - 1].x,
        shape.endcap.points[ecl - 1].y
    );
    if (order === 3) {
        ctx.bezierCurveTo(
            shape.back.points[1].x,
            shape.back.points[1].y,
            shape.back.points[2].x,
            shape.back.points[2].y,
            shape.back.points[3].x,
            shape.back.points[3].y
        );
    } else {
        ctx.quadraticCurveTo(
            shape.back.points[1].x,
            shape.back.points[1].y,
            shape.back.points[2].x,
            shape.back.points[2].y
        );
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

export function drawSelfIntersection(curve, intersection, r = 4.5, colour = "black") {
    if (curve.order == 2) return
    intersection.forEach(pair => {
        var t = pair.split("/").map(v => parseFloat(v));
        var point = calculation.getCurvePoint(curve, t[0]);
        drawPoint(point.x, point.y, r, colour);
    })
}

export function drawLineIntersection(curve, intersection, r = 4.5, colour = "black") {
    intersection.forEach(t => {
        var point = calculation.getCurvePoint(curve, t);
        drawPoint(point.x, point.y, r, colour);
    })
}

export function drawCurvesIntersection(curve, intersection, r = 4.5, colour = "black") {
    intersection.forEach(pair => {
        var t = pair.split("/").map(v => parseFloat(v));
        var point = calculation.getCurvePoint(curve, t[0]);
        drawPoint(point.x, point.y, r, colour);
    })
}