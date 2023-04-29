import * as calculation from "./calculation.js";

export default class Drawing {
    #randomColors;
    #randomIndex;

    constructor(ctx) {
        this.ctx = ctx;
        this.#randomColors = [];
        this.#randomIndex = 0;
        /* FUNCTIONS FOR RANDOM CURVE COLOURS */
        for (var i = 0, j; i < 360; i++) {
            j = (i * 47) % 360;
            this.#randomColors.push("hsl(" + j + ",50%,50%)");
        }
    }

    #getRandomColor() {
        this.#randomIndex = (this.#randomIndex + 1) % this.#randomColors.length;
        return this.#randomColors[this.randomIndex];
    }

    #getRandomFill(a) {
        this.#randomIndex = (this.#randomIndex + 1) % this.#randomColors.length;
        a = typeof a === "undefined" ? 1 : a;
        var c = this.#randomColors[this.#randomIndex];
        c = c.replace("hsl(", "hsla(").replace(")", "," + a + ")");
        return c;
    }

    /* BASIC DRAWING METHODS */
    drawLine(p1, p2, colour = "lightgrey") {
        this.ctx.strokeStyle = colour;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawPoints(points, r, colour) {
        points.forEach(p => this.drawPoint(p.x, p.y, r, colour));
    }

    drawPoint(px, py, r = 3.5, colour = "black") {
        this.ctx.strokeStyle = colour;
        this.ctx.beginPath();
        this.ctx.arc(px, py, r, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawSkeleton(curve) {
        var pts = curve.points;
        this.drawLine(pts[0], pts[1]);
        if (pts.length === 3) {
            this.drawLine(pts[1], pts[2]);
        } else if (pts.length === 4) {
            this.drawLine(pts[2], pts[3]);
        }
        this.drawPoints(pts);
    }

    drawCurve(curve, colour = "black") {
        this.ctx.strokeStyle = colour;
        this.ctx.beginPath();
        var pts = curve.points;
        this.ctx.moveTo(pts[0].x, pts[0].y);
        if (curve._lut.length == 0) {
            calculation.calculateCurvePoints(curve);
        }
        this.drawPoints(curve._lut, 0.1, colour);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawText(text, offset) {
        offset = offset || { x: 0, y: 0 };
        this.ctx.fillText(text, offset.x, offset.y);
    }

    /* ADDITIONAL DRAWING METHODS FOR LIBRARY USAGE */
    drawLookUpTable(lut, r, colour) {
        this.drawPoints(lut, r, colour);
    }

    drawLength(curve, arclength, colour = "red") {
        var offset = calculation.getOffsetCurve(curve, -10);
        var last = offset.length - 1;
        offset.forEach((c, idx) => {
            this.drawCurve(c, colour);
            if (idx === last) {
                let p1 = calculation.getOffsetCurve(curve, 0.95, -15);
                let p2 = calculation.getCurvePoint(c, 1);
                let p3 = calculation.getOffsetCurve(curve, 0.95, -5);
                this.drawLine(p1, p2, colour);
                this.drawLine(p2, p3, colour);
                let label = ((100 * arclength) | 0) / 100 + "px";
                this.drawText(label, { x: p2.x + 7, y: p2.y - 3 });
            }
        });
    }

    drawCurvePoint(point, r = 5, colour = "red") {
        this.drawPoint(point.x, point.y, r, colour);
    }

    drawTangent(curve, colour = "red") {
        var pt = calculation.getCurvePoint(curve, curve._derivative.t);
        var dv = curve._derivative;
        this.drawPoint(pt.x, pt.y, 2, "red");
        this.drawLine(pt, { x: pt.x + dv.x, y: pt.y + dv.y }, colour);
    }

    drawTangents(curve, dvs, gap, colour = "red") {
        for (var t = 0, i = 0, pt; t <= 1; t += gap, i++) {
            pt = calculation.getCurvePoint(curve, t);
            this.drawLine(pt, { x: pt.x + dvs[i].x, y: pt.y + dvs[i].y }, colour);
        }
    }

    drawNormal(curve, normal, t, d = 20, colour = "red") {
        var pt = calculation.getCurvePoint(curve, t);
        this.drawLine(pt, { x: pt.x + d * normal.x, y: pt.y + d * normal.y }, colour);
    }

    drawNormals(curve, normals, gap, d = 20, colour = "red") {
        for (var t = 0, i = 0; t <= 1; t += gap, i++) {
            var pt = calculation.getCurvePoint(curve, t);
            this.drawLine(pt, { x: pt.x + d * normals[i].x, y: pt.y + d * normals[i].y }, colour);
        }
    }

    drawSplittedCurve(curve, split, colour = "red", t1, t2) {
        if (t2) {
            this.drawCurve(split, colour);
            this.drawPoint(calculation.getCurvePoint(curve, t1).x, calculation.getCurvePoint(curve, t1).y, 3, colour);
            this.drawPoint(calculation.getCurvePoint(curve, t2).x, calculation.getCurvePoint(curve, t2).y, 3, colour);
        } else {
            this.drawCurve(split[0], colour);
            this.drawCurve(split[1], colour);
            this.drawPoint(calculation.getCurvePoint(curve, t1).x, calculation.getCurvePoint(curve, t1).y, 3, colour);
        }
    }

    drawCurveExtremas(curve, extrema, r = 3, colour = "red") {
        this.ctx.strokeStyle = colour;
        extrema.values.forEach(t => {
            let extremaPoint = calculation.getCurvePoint(curve, t);
            this.drawPoint(extremaPoint.x, extremaPoint.y, r, colour);
        })
    }

    drawInflectionPoints(curve, inflectionPoints, r = 3, colour = "red") {
        this.ctx.strokeStyle = colour;
        inflectionPoints.forEach(t => {
            let inflectionPoint = calculation.getCurvePoint(curve, t);
            this.drawPoint(inflectionPoint.x, inflectionPoint.y, r, colour);
        })
    }

    drawCurvature(curve, kr, t, colour = "#ff7f33") {
        var p = calculation.getCurvePoint(curve, t);
        var n = calculation.calculateNormal(curve, t);
        this.drawLine(p, { x: p.x + n.x * kr.k * 5000, y: p.y + n.y * kr.k * 5000, }, colour);
    }

    drawCurvatures(curve, krs, gap = 2) {
        for (var s = 0, i = 0; s < 256; s += gap, i++) {
            let t = s / 255;
            let p = calculation.getCurvePoint(curve, t);
            let n = calculation.calculateNormal(curve, t, true);
            this.drawLine(p, { x: p.x + n.x * krs[i].k * 5000, y: p.y + n.y * krs[i].k * 5000, }, "rgba(255,127," + s + ",0.6)");
        }
    }

    drawBoundingBox(bbox, colour = "red") {
        this.ctx.strokeStyle = colour;
        this.ctx.beginPath();
        this.ctx.moveTo(bbox.x.min, bbox.y.min);
        this.ctx.lineTo(bbox.x.min, bbox.y.max);
        this.ctx.lineTo(bbox.x.max, bbox.y.max);
        this.ctx.lineTo(bbox.x.max, bbox.y.min);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawHullPoints(hull, colour = "red") {
        this.ctx.strokeStyle = colour;
        this.ctx.beginPath();
        if (hull.length === 6) {
            this.ctx.moveTo(hull[0].x, hull[0].y);
            this.ctx.lineTo(hull[1].x, hull[1].y);
            this.ctx.lineTo(hull[2].x, hull[2].y);
            this.ctx.moveTo(hull[3].x, hull[3].y);
            this.ctx.lineTo(hull[4].x, hull[4].y);
        } else {
            this.ctx.moveTo(hull[0].x, hull[0].y);
            this.ctx.lineTo(hull[1].x, hull[1].y);
            this.ctx.lineTo(hull[2].x, hull[2].y);
            this.ctx.lineTo(hull[3].x, hull[3].y);
            this.ctx.moveTo(hull[4].x, hull[4].y);
            this.ctx.lineTo(hull[5].x, hull[5].y);
            this.ctx.lineTo(hull[6].x, hull[6].y);
            this.ctx.moveTo(hull[7].x, hull[7].y);
            this.ctx.lineTo(hull[8].x, hull[8].y);
        }
        this.ctx.stroke();
        this.ctx.closePath();
        this.drawPoint(hull.slice(-1)[0].x, hull.slice(-1)[0].y, 4.5, colour);
    }

    drawProjection(proj, p, colour = "red") {
        this.drawLine(proj, p, colour);
    }

    drawOffsetCurve(offsetCurve, colour = "red") {
        offsetCurve.forEach(c => this.drawCurve(c, colour));
    }

    drawOffsetPoint(offsetCoords, colour = "red") {
        this.drawPoint(offsetCoords.x, offsetCoords.y, 4, colour);
    }

    drawReducedCurve(reduced, colour) {
        reduced.forEach((c, i) => {
            if (i > 0) this.drawPoint(c.points[0].x, c.points[0].y, 3);
            this.drawCurve(c, colour || this.#getRandomColor());
        })
    }

    drawCircularArcs(arcs, colour) {
        arcs.forEach(arc => this.drawArc(arc, colour));
    }

    drawArc(arc, colour = this.#getRandomFill(0.1)) {
        this.ctx.fillStyle = colour;
        this.ctx.beginPath();
        this.ctx.moveTo(arc.x, arc.y);
        this.ctx.arc(arc.x, arc.y, arc.r, arc.s, arc.e);
        this.ctx.lineTo(arc.x, arc.y);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawScaledCurve(reduced, scaled, colour) {
        this.drawReducedCurve(reduced, "black");
        for (var k = 0; k <= 6; k++) {
            this.drawCurve(scaled[k], colour);
        }
    }

    drawCurveOutline(outline, outColour = "red", offset, offColour = "rgba(0,0,255,0.2)") {
        outline.curves.forEach(c => this.drawCurve(c, outColour));
        if (offset) {
            offset.pos.curves.forEach(c => this.drawCurve(c, offColour));
            offset.neg.curves.forEach(c => this.drawCurve(c, offColour));
        }
    }

    drawCurveGradOutline(goutline, colour = "red") {
        goutline.curves.forEach(c => this.drawCurve(c, colour));
    }

    drawShapedOutline(soutline, colour, fillColour) {
        soutline.forEach(s => this.drawShape(s, colour, fillColour));
    }

    drawShape(shape, colour = "red", fillColour = this.#getRandomFill(0.2)) {
        this.ctx.strokeStyle = colour;
        this.ctx.fillStyle = fillColour;
        var order = shape.forward.points.length - 1;
        var scl = shape.startcap.points.length;
        var ecl = shape.endcap.points.length;
        this.ctx.beginPath();
        this.ctx.moveTo(
            shape.startcap.points[0].x,
            shape.startcap.points[0].y
        );
        this.ctx.lineTo(
            shape.startcap.points[scl - 1].x,
            shape.startcap.points[scl - 1].y
        );
        if (order === 3) {
            this.ctx.bezierCurveTo(
                shape.forward.points[1].x,
                shape.forward.points[1].y,
                shape.forward.points[2].x,
                shape.forward.points[2].y,
                shape.forward.points[3].x,
                shape.forward.points[3].y
            );
        } else {
            this.ctx.quadraticCurveTo(
                shape.forward.points[1].x,
                shape.forward.points[1].y,
                shape.forward.points[2].x,
                shape.forward.points[2].y
            );
        }
        this.ctx.lineTo(
            shape.endcap.points[ecl - 1].x,
            shape.endcap.points[ecl - 1].y
        );
        if (order === 3) {
            this.ctx.bezierCurveTo(
                shape.back.points[1].x,
                shape.back.points[1].y,
                shape.back.points[2].x,
                shape.back.points[2].y,
                shape.back.points[3].x,
                shape.back.points[3].y
            );
        } else {
            this.ctx.quadraticCurveTo(
                shape.back.points[1].x,
                shape.back.points[1].y,
                shape.back.points[2].x,
                shape.back.points[2].y
            );
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawSelfIntersection(curve, intersection, r = 4.5, colour = "black") {
        if (curve.order == 2) return
        intersection.forEach(pair => {
            var t = pair.split("/").map(v => parseFloat(v));
            var point = calculation.getCurvePoint(curve, t[0]);
            this.drawPoint(point.x, point.y, r, colour);
        })
    }

    drawLineIntersection(curve, intersection, r = 4.5, colour = "black") {
        intersection.forEach(t => {
            var point = calculation.getCurvePoint(curve, t);
            this.drawPoint(point.x, point.y, r, colour);
        })
    }

    drawCurvesIntersection(curve, intersection, r = 4.5, colour = "black") {
        intersection.forEach(pair => {
            var t = pair.split("/").map(v => parseFloat(v));
            var point = calculation.getCurvePoint(curve, t[0]);
            this.drawPoint(point.x, point.y, r, colour);
        })
    }
}