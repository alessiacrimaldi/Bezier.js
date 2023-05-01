var T = (o, t, i) => {
  if (!t.has(o))
    throw TypeError("Cannot " + i);
};
var h = (o, t, i) => (T(o, t, "read from private field"), i ? i.call(o) : t.get(o)), y = (o, t, i) => {
  if (t.has(o))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(o) : t.set(o, i);
}, v = (o, t, i, r) => (T(o, t, "write to private field"), r ? r.call(o, i) : t.set(o, i), i);
var l = (o, t, i) => (T(o, t, "access private method"), i);
import { getOffsetCurve as C, getCurvePoint as d, calculateNormal as g } from "./calculation.js";
import "./bezier.js";
var c, w, p, k, f, m;
class I {
  constructor(t) {
    y(this, p);
    y(this, f);
    y(this, c, void 0);
    y(this, w, void 0);
    this.ctx = t, v(this, c, []), v(this, w, 0);
    for (var i = 0, r; i < 360; i++)
      r = i * 47 % 360, h(this, c).push("hsl(" + r + ",50%,50%)");
  }
  /* BASIC DRAWING METHODS */
  drawLine(t, i, r = "lightgrey") {
    this.ctx.strokeStyle = r, this.ctx.beginPath(), this.ctx.moveTo(t.x, t.y), this.ctx.lineTo(i.x, i.y), this.ctx.stroke(), this.ctx.closePath();
  }
  drawPoints(t, i, r) {
    t.forEach((e) => this.drawPoint(e, i, r));
  }
  drawPoint(t, i = 3.5, r = "black", e = "transparent") {
    this.ctx.strokeStyle = r, this.ctx.fillStyle = e, this.ctx.beginPath(), this.ctx.arc(t.x, t.y, i, 0, 2 * Math.PI), this.ctx.fill(), this.ctx.stroke(), this.ctx.closePath();
  }
  drawSkeleton(t, i) {
    var r = t.points;
    this.drawLine(r[0], r[1]), r.length === 3 ? this.drawLine(r[1], r[2]) : r.length === 4 && this.drawLine(r[2], r[3]), this.drawPoints(r, 3.5, i);
  }
  drawCurve(t, i = "black", r = 0.1) {
    this.ctx.strokeStyle = i, this.ctx.beginPath();
    var e = t.points;
    this.ctx.moveTo(e[0].x, e[0].y), t.curvepoints.length == 0 && t.computeCurvePoints(), this.drawPoints(t.curvepoints, r, i), this.ctx.stroke(), this.ctx.closePath();
  }
  drawText(t, i) {
    i = i || { x: 0, y: 0 }, this.ctx.fillText(t, i.x, i.y);
  }
  /* ADDITIONAL DRAWING METHODS FOR LIBRARY USAGE */
  drawLookUpTable(t, i = 3, r) {
    this.drawPoints(t, i, r);
  }
  drawLength(t, i, r = "red") {
    var e = C(t, -10), s = e.length - 1;
    e.forEach((a, n) => {
      if (this.drawCurve(a, r), n === s) {
        let x = C(t, 0.95, -15), P = d(a, 1), S = C(t, 0.95, -5);
        this.drawLine(x, P, r), this.drawLine(P, S, r);
        let E = (100 * i | 0) / 100 + "px";
        this.drawText(E, { x: P.x + 7, y: P.y - 3 });
      }
    });
  }
  drawCurvePoint(t, i = 5, r = "red") {
    this.drawPoint(t, i, r);
  }
  drawTangent(t, i = "red") {
    var r = d(t, t._derivative.t), e = t._derivative;
    this.drawPoint(r, 2, "red"), this.drawLine(r, { x: r.x + e.x, y: r.y + e.y }, i);
  }
  drawTangents(t, i, r, e = "red") {
    for (var s = 0, a = 0, n; s <= 1; s += r, a++)
      n = d(t, s), this.drawLine(n, { x: n.x + i[a].x, y: n.y + i[a].y }, e);
  }
  drawNormal(t, i, r, e = 20, s = "red") {
    var a = d(t, r);
    this.drawLine(a, { x: a.x + e * i.x, y: a.y + e * i.y }, s);
  }
  drawNormals(t, i, r, e = 20, s = "red") {
    for (var a = 0, n = 0; a <= 1; a += r, n++) {
      var x = d(t, a);
      this.drawLine(x, { x: x.x + e * i[n].x, y: x.y + e * i[n].y }, s);
    }
  }
  drawSplittedCurve(t, i, r = "red", e, s) {
    s ? (this.drawCurve(i, r), this.drawPoint(d(t, e), 3, r), this.drawPoint(d(t, s), 3, r)) : (this.drawCurve(i[0], r), this.drawCurve(i[1], r), this.drawPoint(d(t, e), 3, r));
  }
  drawCurveExtremas(t, i, r = 3, e = "red") {
    this.ctx.strokeStyle = e, i.values.forEach((s) => {
      let a = d(t, s);
      this.drawPoint(a, r, e);
    });
  }
  drawInflectionPoints(t, i, r = 3, e = "red") {
    this.ctx.strokeStyle = e, i.forEach((s) => {
      let a = d(t, s);
      this.drawPoint(a, r, e);
    });
  }
  drawCurvature(t, i, r, e = "#ff7f33") {
    var s = d(t, r), a = g(t, r);
    this.drawLine(s, { x: s.x + a.x * i.k * 5e3, y: s.y + a.y * i.k * 5e3 }, e);
  }
  drawCurvatures(t, i, r = 2) {
    for (var e = 0, s = 0; e < 256; e += r, s++) {
      let a = e / 255, n = d(t, a), x = g(t, a, !0);
      this.drawLine(n, { x: n.x + x.x * i[s].k * 5e3, y: n.y + x.y * i[s].k * 5e3 }, "rgba(255,127," + e + ",0.6)");
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
  drawOffsetCurve(t, i = "red") {
    t.forEach((r) => this.drawCurve(r, i));
  }
  drawOffsetPoint(t, i = "red") {
    this.drawPoint(t, 4, i);
  }
  drawReducedCurve(t, i) {
    t.forEach((r, e) => {
      e > 0 && this.drawPoint(r.points[0], 3), this.drawCurve(r, i || l(this, p, k).call(this));
    });
  }
  drawCircularArcs(t, i) {
    t.forEach((r) => this.drawArc(r, i));
  }
  drawArc(t, i = l(this, f, m).call(this, 0.1)) {
    this.ctx.fillStyle = i, this.ctx.beginPath(), this.ctx.moveTo(t.x, t.y), this.ctx.arc(t.x, t.y, t.r, t.s, t.e), this.ctx.lineTo(t.x, t.y), this.ctx.fill(), this.ctx.stroke(), this.ctx.closePath();
  }
  drawScaledCurve(t, i, r) {
    this.drawReducedCurve(t, "black");
    for (var e = 0; e <= 6; e++)
      this.drawCurve(i[e], r);
  }
  drawCurveOutline(t, i = "red", r, e = "rgba(0,0,255,0.2)") {
    t.curves.forEach((s) => this.drawCurve(s, i)), r && (r.pos.curves.forEach((s) => this.drawCurve(s, e)), r.neg.curves.forEach((s) => this.drawCurve(s, e)));
  }
  drawCurveGradOutline(t, i = "red") {
    t.curves.forEach((r) => this.drawCurve(r, i));
  }
  drawShapedOutline(t, i, r) {
    t.forEach((e) => this.drawShape(e, i, r));
  }
  drawShape(t, i = "red", r = l(this, f, m).call(this, 0.2)) {
    this.ctx.strokeStyle = i, this.ctx.fillStyle = r;
    var e = t.forward.points.length - 1, s = t.startcap.points.length, a = t.endcap.points.length;
    this.ctx.beginPath(), this.ctx.moveTo(
      t.startcap.points[0].x,
      t.startcap.points[0].y
    ), this.ctx.lineTo(
      t.startcap.points[s - 1].x,
      t.startcap.points[s - 1].y
    ), e === 3 ? this.ctx.bezierCurveTo(
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
      t.endcap.points[a - 1].x,
      t.endcap.points[a - 1].y
    ), e === 3 ? this.ctx.bezierCurveTo(
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
  drawSelfIntersection(t, i, r = 4, e = "red") {
    t.order != 2 && i.forEach((s) => {
      var a = s.split("/").map((x) => parseFloat(x)), n = d(t, a[0]);
      this.drawPoint(n, r, e, "white");
    });
  }
  drawLineIntersection(t, i, r = 4, e = "red") {
    i.forEach((s) => {
      var a = d(t, s);
      this.drawPoint(a, r, e, "white");
    });
  }
  drawCurvesIntersection(t, i, r = 4, e = "red") {
    i.forEach((s) => {
      var a = s.split("/").map((x) => parseFloat(x)), n = d(t, a[0]);
      this.drawPoint(n, r, e, "white");
    });
  }
}
c = new WeakMap(), w = new WeakMap(), p = new WeakSet(), k = function() {
  return v(this, w, (h(this, w) + 1) % h(this, c).length), h(this, c)[this.randomIndex];
}, f = new WeakSet(), m = function(t) {
  v(this, w, (h(this, w) + 1) % h(this, c).length), t = typeof t > "u" ? 1 : t;
  var i = h(this, c)[h(this, w)];
  return i = i.replace("hsl(", "hsla(").replace(")", "," + t + ")"), i;
};
export {
  I as default
};
//# sourceMappingURL=drawing.js.map
