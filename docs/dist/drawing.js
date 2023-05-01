var T = (d, t, i) => {
  if (!t.has(d))
    throw TypeError("Cannot " + i);
};
var h = (d, t, i) => (T(d, t, "read from private field"), i ? i.call(d) : t.get(d)), v = (d, t, i) => {
  if (t.has(d))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(d) : t.set(d, i);
};
import { getOffsetCurve as f, getCurvePoint as o, calculateNormal as P } from "./calculation.js";
import "./bezier.js";
var c, w;
class k {
  constructor(t) {
    v(this, c, [
      "#FF0000",
      "#FF7F00",
      "#FFFF00",
      "#00FF00",
      "#0000FF",
      "#4B0082",
      "#8F00FF"
    ]);
    v(this, w, [
      "rgba(255, 0, 0, 0.5)",
      // rosso
      "rgba(255, 128, 0, 0.5)",
      // arancione
      "rgba(255, 255, 0, 0.5)",
      // giallo
      "rgba(128, 255, 0, 0.5)",
      // verde chiaro
      "rgba(0, 255, 0, 0.5)",
      // verde
      "rgba(0, 255, 128, 0.5)",
      // verde acqua
      "rgba(0, 255, 255, 0.5)",
      // ciano
      "rgba(0, 128, 255, 0.5)",
      // blu chiaro
      "rgba(0, 0, 255, 0.5)",
      // blu
      "rgba(128, 0, 255, 0.5)",
      // viola
      "rgba(255, 0, 255, 0.5)",
      // magenta
      "rgba(255, 0, 128, 0.5)",
      // rosa
      "rgba(255, 128, 128, 0.5)",
      // rosa chiaro
      "rgba(255, 0, 192, 0.5)",
      // rosa scuro
      "rgba(128, 128, 128, 0.5)"
      // grigio
    ]);
    this.ctx = t;
  }
  /* BASIC DRAWING METHODS */
  drawLine(t, i, r = "lightgrey") {
    this.ctx.strokeStyle = r, this.ctx.beginPath(), this.ctx.moveTo(t.x, t.y), this.ctx.lineTo(i.x, i.y), this.ctx.stroke(), this.ctx.closePath();
  }
  drawPoints(t, i, r) {
    t.forEach((a) => this.drawPoint(a, i, r));
  }
  drawPoint(t, i = 3.5, r = "black", a = "transparent") {
    this.ctx.strokeStyle = r, this.ctx.fillStyle = a, this.ctx.beginPath(), this.ctx.arc(t.x, t.y, i, 0, 2 * Math.PI), this.ctx.fill(), this.ctx.stroke(), this.ctx.closePath();
  }
  drawCircle(t, i = "red", r = "transparent") {
    this.ctx.strokeStyle = i, this.ctx.fillStyle = r, this.ctx.beginPath(), this.ctx.arc(t.x, t.y, t.r, 0, 2 * Math.PI), this.ctx.fill(), this.ctx.stroke(), this.ctx.closePath();
  }
  drawSkeleton(t, i) {
    var r = t.points;
    this.drawLine(r[0], r[1]), r.length === 3 ? this.drawLine(r[1], r[2]) : r.length === 4 && this.drawLine(r[2], r[3]), this.drawPoints(r, 3.5, i);
  }
  drawCurve(t, i = "black", r = 0.1) {
    this.ctx.strokeStyle = i, this.ctx.beginPath();
    var a = t.points;
    this.ctx.moveTo(a[0].x, a[0].y), t.curvepoints.length == 0 && t.computeCurvePoints(), this.drawPoints(t.curvepoints, r, i), this.ctx.stroke(), this.ctx.closePath();
  }
  drawText(t, i) {
    i = i || { x: 0, y: 0 }, this.ctx.fillText(t, i.x, i.y);
  }
  /* ADDITIONAL DRAWING METHODS FOR LIBRARY USAGE */
  drawLookUpTable(t, i = 3, r) {
    this.drawPoints(t, i, r);
  }
  drawLength(t, i, r = "red") {
    var a = f(t, -10), e = a.length - 1;
    a.forEach((s, n) => {
      if (this.drawCurve(s, r), n === e) {
        let x = f(t, 0.95, -15), y = o(s, 1), g = f(t, 0.95, -5);
        this.drawLine(x, y, r), this.drawLine(y, g, r);
        let p = (100 * i | 0) / 100 + "px";
        this.drawText(p, { x: y.x + 7, y: y.y - 3 });
      }
    });
  }
  drawCurvePoint(t, i = 5, r = "red") {
    this.drawPoint(t, i, r);
  }
  drawTangent(t, i = "red") {
    var r = o(t, t._derivative.t), a = t._derivative;
    this.drawPoint(r, 2, i, i), this.drawLine(r, { x: r.x + a.x, y: r.y + a.y }, i);
  }
  drawTangents(t, i, r, a = "red") {
    for (var e = 0, s = 0, n; e <= 1; e += r, s++)
      n = o(t, e), this.drawLine(n, { x: n.x + i[s].x, y: n.y + i[s].y }, a);
  }
  drawNormal(t, i, r, a = 20, e = "red") {
    var s = o(t, r);
    this.drawPoint(s, 2, e, e), this.drawLine(s, { x: s.x + a * i.x, y: s.y + a * i.y }, e);
  }
  drawNormals(t, i, r, a = 20, e = "red") {
    for (var s = 0, n = 0; s <= 1; s += r, n++) {
      var x = o(t, s);
      this.drawLine(x, { x: x.x + a * i[n].x, y: x.y + a * i[n].y }, e);
    }
  }
  drawSplittedCurve(t, i, r = "red", a, e) {
    e ? (this.drawCurve(i, r), this.drawPoint(o(t, a), 3, r), this.drawPoint(o(t, e), 3, r)) : (this.drawCurve(i[0], r), this.drawCurve(i[1], r), this.drawPoint(o(t, a), 3, r));
  }
  drawCurveExtremas(t, i, r = 3, a = "red") {
    this.ctx.strokeStyle = a, i.values.forEach((e) => {
      let s = o(t, e);
      this.drawPoint(s, r, a);
    });
  }
  drawInflectionPoints(t, i, r = 3, a = "red") {
    this.ctx.strokeStyle = a, i.forEach((e) => {
      let s = o(t, e);
      this.drawPoint(s, r, a);
    });
  }
  drawCurvature(t, i, r, a = "red") {
    var e = o(t, r), s = P(t, r);
    this.drawLine(e, { x: e.x + s.x * i.r, y: e.y + s.y * i.r }, a);
  }
  drawCurvatures(t, i, r = 2) {
    for (var a = 0, e = 0; a < 256; a += r, e++) {
      let s = a / 255, n = o(t, s), x = P(t, s, !0);
      this.drawLine(n, { x: n.x + x.x * i[e].k * 5e3, y: n.y + x.y * i[e].k * 5e3 }, "rgba(255,127," + a + ",0.6)");
    }
  }
  drawBoundingBox(t, i = "red") {
    this.ctx.strokeStyle = i, this.ctx.beginPath(), this.ctx.moveTo(t.x.min, t.y.min), this.ctx.lineTo(t.x.min, t.y.max), this.ctx.lineTo(t.x.max, t.y.max), this.ctx.lineTo(t.x.max, t.y.min), this.ctx.closePath(), this.ctx.stroke();
  }
  drawHullPoints(t, i = "red") {
    this.ctx.strokeStyle = i, this.ctx.beginPath(), t.length === 6 ? (this.ctx.moveTo(t[0].x, t[0].y), this.ctx.lineTo(t[1].x, t[1].y), this.ctx.lineTo(t[2].x, t[2].y), this.ctx.moveTo(t[3].x, t[3].y), this.ctx.lineTo(t[4].x, t[4].y)) : (this.ctx.moveTo(t[0].x, t[0].y), this.ctx.lineTo(t[1].x, t[1].y), this.ctx.lineTo(t[2].x, t[2].y), this.ctx.lineTo(t[3].x, t[3].y), this.ctx.moveTo(t[4].x, t[4].y), this.ctx.lineTo(t[5].x, t[5].y), this.ctx.lineTo(t[6].x, t[6].y), this.ctx.moveTo(t[7].x, t[7].y), this.ctx.lineTo(t[8].x, t[8].y)), this.ctx.stroke(), this.ctx.closePath(), this.drawPoint(t.slice(-1)[0], 4.5, i);
  }
  drawProjection(t, i, r = "red") {
    this.drawLine(t, i, r);
  }
  drawOffsetCurve(t, i) {
    t.forEach((r, a) => this.drawCurve(r, i || h(this, c)[a]));
  }
  drawOffsetPoint(t, i = "red") {
    this.drawPoint(t, 4, i);
  }
  drawReducedCurve(t, i) {
    t.forEach((r, a) => {
      a > 0 && this.drawPoint(r.points[0], 3), this.drawCurve(r, i || h(this, c)[a]);
    });
  }
  drawCircularArcs(t, i) {
    t.forEach((r, a) => this.drawArc(r, i || h(this, w)[a]));
  }
  drawArc(t, i) {
    this.ctx.fillStyle = i, this.ctx.beginPath(), this.ctx.moveTo(t.x, t.y), this.ctx.arc(t.x, t.y, t.r, t.s, t.e), this.ctx.fill(), this.ctx.closePath();
  }
  drawScaledCurve(t, i, r) {
    this.drawReducedCurve(t, "black");
    for (var a = 0; a <= 6; a++)
      this.drawCurve(i[a], r);
  }
  drawCurveOutline(t, i = "red", r, a = "rgba(0,0,255,0.2)") {
    t.curves.forEach((e) => this.drawCurve(e, i)), r && (r.pos.curves.forEach((e) => this.drawCurve(e, a)), r.neg.curves.forEach((e) => this.drawCurve(e, a)));
  }
  drawCurveGradOutline(t, i = "red") {
    t.curves.forEach((r) => this.drawCurve(r, i));
  }
  drawShapedOutline(t, i, r) {
    t.forEach((a, e) => this.drawShape(a, i, r || h(this, w)[e]));
  }
  drawShape(t, i = "red", r) {
    this.ctx.strokeStyle = i, this.ctx.fillStyle = r;
    var a = t.forward.points.length - 1, e = t.startcap.points.length, s = t.endcap.points.length;
    this.ctx.beginPath(), this.ctx.moveTo(
      t.startcap.points[0].x,
      t.startcap.points[0].y
    ), this.ctx.lineTo(
      t.startcap.points[e - 1].x,
      t.startcap.points[e - 1].y
    ), a === 3 ? this.ctx.bezierCurveTo(
      t.forward.points[1].x,
      t.forward.points[1].y,
      t.forward.points[2].x,
      t.forward.points[2].y,
      t.forward.points[3].x,
      t.forward.points[3].y
    ) : this.ctx.quadraticCurveTo(
      t.forward.points[1].x,
      t.forward.points[1].y,
      t.forward.points[2].x,
      t.forward.points[2].y
    ), this.ctx.lineTo(
      t.endcap.points[s - 1].x,
      t.endcap.points[s - 1].y
    ), a === 3 ? this.ctx.bezierCurveTo(
      t.back.points[1].x,
      t.back.points[1].y,
      t.back.points[2].x,
      t.back.points[2].y,
      t.back.points[3].x,
      t.back.points[3].y
    ) : this.ctx.quadraticCurveTo(
      t.back.points[1].x,
      t.back.points[1].y,
      t.back.points[2].x,
      t.back.points[2].y
    ), this.ctx.closePath(), this.ctx.fill(), this.ctx.stroke();
  }
  drawSelfIntersection(t, i, r = 4, a = "red") {
    t.order != 2 && i.forEach((e) => {
      var s = e.split("/").map((x) => parseFloat(x)), n = o(t, s[0]);
      this.drawPoint(n, r, a, "white");
    });
  }
  drawLineIntersection(t, i, r = 4, a = "red") {
    i.forEach((e) => {
      var s = o(t, e);
      this.drawPoint(s, r, a, "white");
    });
  }
  drawCurvesIntersection(t, i, r = 4, a = "red") {
    i.forEach((e) => {
      var s = e.split("/").map((x) => parseFloat(x)), n = o(t, s[0]);
      this.drawPoint(n, r, a, "white");
    });
  }
}
c = new WeakMap(), w = new WeakMap();
export {
  k as default
};
//# sourceMappingURL=drawing.js.map
