export default class Drawing {
    #rainbowColors = [
        "#FF0000",
        "#FF7F00",
        "#FFFF00",
        "#00FF00",
        "#0000FF",
        "#4B0082",
        "#8F00FF"
    ];
    #shadeColors = [
        "rgba(255, 0, 0, 0.5)",      // rosso
        "rgba(255, 128, 0, 0.5)",    // arancione
        "rgba(255, 255, 0, 0.5)",    // giallo
        "rgba(128, 255, 0, 0.5)",    // verde chiaro
        "rgba(0, 255, 0, 0.5)",      // verde
        "rgba(0, 255, 128, 0.5)",    // verde acqua
        "rgba(0, 255, 255, 0.5)",    // ciano
        "rgba(0, 128, 255, 0.5)",    // blu chiaro
        "rgba(0, 0, 255, 0.5)",      // blu
        "rgba(128, 0, 255, 0.5)",    // viola
        "rgba(255, 0, 255, 0.5)",    // magenta
        "rgba(255, 0, 128, 0.5)",    // rosa
        "rgba(255, 128, 128, 0.5)",  // rosa chiaro
        "rgba(255, 0, 192, 0.5)",    // rosa scuro
        "rgba(128, 128, 128, 0.5)"   // grigio
    ]

    constructor(ctx) {
        this.ctx = ctx;
    }

    /* Basic drawing methods */
    drawLine(p1, p2, colour = "lightgrey") {
        this.ctx.strokeStyle = colour;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawPoints(points, r, colour, fill) {
        points.forEach(p => this.drawPoint(p, r, colour, fill));
    }

    drawPoint(p, r = 3.5, colour = "black", fill = "transparent") {
        this.ctx.strokeStyle = colour;
        this.ctx.fillStyle = fill;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawCircle(circle, colour = "red", fill = "transparent") {
        this.ctx.strokeStyle = colour;
        this.ctx.fillStyle = fill;
        this.ctx.beginPath();
        this.ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawSkeleton(curve, colour) {
        var pts = curve.points;
        this.drawLine(pts[0], pts[1]);
        if (pts.length === 3) {
            this.drawLine(pts[1], pts[2]);
        } else if (pts.length === 4) {
            this.drawLine(pts[2], pts[3]);
        }
        this.drawPoints(pts, 3.5, colour);
    }

    drawCurve(curve, colour = "black", r = 0.1) {
        this.ctx.strokeStyle = colour;
        this.ctx.beginPath();
        var pts = curve.points;
        this.ctx.moveTo(pts[0].x, pts[0].y);
        if (curve.curvepoints.length == 0) {
            curve.computeCurvePoints();
        }
        this.drawPoints(curve.curvepoints, r, colour);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawText(text, offset) {
        offset = offset || { x: 0, y: 0 };
        this.ctx.fillText(text, offset.x, offset.y);
    }

    /* Additional drawing methods for library usage */
    drawLookupTable(curve, r = 3, colour = "black") {
        this.drawPoints(curve._lut, r, colour, "white");
    }

    drawLength(curve, colour = "red") {
        var offset = curve.offset(-10);
        var last = offset.length - 1;
        offset.forEach((c, idx) => {
            this.drawCurve(c, colour);
            if (idx === last) {
                let p1 = curve.offset(0.95, -15);
                let p2 = c.offset(1);
                let p3 = curve.offset(0.95, -5);
                this.drawLine(p1, p2, colour);
                this.drawLine(p2, p3, colour);
                let label = ((100 * curve.len) | 0) / 100 + "px";
                this.drawText(label, { x: p2.x + 7, y: p2.y - 3 });
            }
        });
    }

    drawCurvePoint(curve, r = 5, colour = "red") {
        this.drawPoint(curve.p, r, colour);
    }

    drawTangent(curve, colour = "red") {
        var pt = curve.get(curve.dv.t);
        var dv = curve.dv;
        this.drawPoint(pt, 2.5, colour, "white");
        this.drawLine(pt, { x: pt.x + dv.x, y: pt.y + dv.y }, colour);
    }

    drawNormal(curve, d = 40, colour = "red") {
        const n = curve.n, pt = curve.get(n.t);
        this.drawPoint(pt, 2.5, colour, "white");
        this.drawLine(pt, { x: pt.x + d * n.x, y: pt.y + d * n.y }, colour);
    }

    drawSplittedCurve(curve, colour = "red") {
        if (curve.subc.c) {
            this.drawCurve(curve.subc.c[0], colour);
            this.drawCurve(curve.subc.c[1], colour);
            this.drawPoint(curve.get(curve.subc.t), 3, colour);
        } else {
            this.drawCurve(curve.subc.v, colour);
            this.drawPoint(curve.get(curve.subc.t1), 3, colour);
            this.drawPoint(curve.get(curve.subc.t2), 3, colour);
        }
    }

    drawCurveExtremas(curve, r = 3, colour = "red") {
        this.ctx.strokeStyle = colour;
        curve.extrs.values.forEach(t => {
            let extremaPoint = curve.get(t);
            this.drawPoint(extremaPoint, r, colour);
        })
    }

    drawInflectionPoints(curve, r = 3, colour = "red") {
        this.ctx.strokeStyle = colour;
        curve.infl.forEach(t => {
            let inflectionPoint = curve.get(t);
            this.drawPoint(inflectionPoint, r, colour);
        })
    }

    drawCurvature(curve, colour = "red") {
        const t = curve.kr.t,
            r = curve.kr.r,
            p = curve.get(t),
            n = curve.normal(t);
        this.drawLine(p, { x: p.x + n.x * r, y: p.y + n.y * r }, colour);
    }

    drawBoundingBox(curve, colour = "red") {
        this.ctx.strokeStyle = colour;
        this.ctx.beginPath();
        this.ctx.moveTo(curve.bb.x.min, curve.bb.y.min);
        this.ctx.lineTo(curve.bb.x.min, curve.bb.y.max);
        this.ctx.lineTo(curve.bb.x.max, curve.bb.y.max);
        this.ctx.lineTo(curve.bb.x.max, curve.bb.y.min);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawHullPoints(curve, colour = "red") {
        const hull = curve.hullp;
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
        this.drawPoint(hull.slice(-1)[0], 4.5, colour);
    }

    drawProjection(curve, colour = "red") {
        this.drawLine(curve.projp, curve.projp.point, colour);
    }

    drawOffsetCurve(curve, colour) {
        curve.offst.forEach((c, i) => this.drawCurve(c, colour || this.#rainbowColors[i]));
    }

    drawOffsetPoint(curve, r = 4, colour = "red") {
        this.drawPoint(curve.offstcoords, r, colour, "white");
    }

    drawReducedCurve(curve, colour) {
        curve.redc.forEach((c, i) => {
            if (i > 0) this.drawPoint(c.points[0], 3);
            this.drawCurve(c, colour || this.#rainbowColors[i]);
        })
    }

    drawCircularArcs(curve, colour) {
        curve.carcs.forEach((arc, i) => this.drawArc(arc, colour || this.#shadeColors[i]));
    }

    drawArc(arc, colour) {
        this.ctx.fillStyle = colour;
        this.ctx.beginPath();
        this.ctx.moveTo(arc.x, arc.y);
        this.ctx.arc(arc.x, arc.y, arc.r, arc.s, arc.e);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawScaledCurve(curve, colour = "black") {
        this.drawReducedCurve(curve.redc, colour);
        for (var k = 0; k <= 6; k++) {
            this.drawCurve(curve.scaled[k], colour);
        }
    }

    drawOutline(curve, colour = "red") {
        curve.outl.curves.forEach(c => this.drawCurve(c, colour));
    }

    drawShapedOutline(curve, colour = "red", fill) {
        curve.shapeoutl.forEach((s, i) => this.drawShape(s, colour, fill || this.#shadeColors[i]));
    }

    drawShape(shape, colour, fill) {
        this.ctx.strokeStyle = colour;
        this.ctx.fillStyle = fill;
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

    drawSelfIntersection(curve, r = 4, colour = "red") {
        if (curve.order == 2) return
        curve.intersections.self.forEach(pair => {
            var t = pair.split("/").map(v => parseFloat(v));
            var point = curve.get(t[0]);
            this.drawPoint(point, r, colour, "white");
        })
    }

    drawLineIntersection(curve, r = 4, colour = "red") {
        curve.intersections.line.forEach(t => {
            var point = curve.get(t);
            this.drawPoint(point, r, colour, "white");
        })
    }

    drawCurvesIntersection(curve, r = 4, colour = "red") {
        curve.intersections.curve.forEach(pair => {
            var t = pair.split("/").map(v => parseFloat(v));
            var point = curve.get(t[0]);
            this.drawPoint(point, r, colour, "white");
        })
    }
}