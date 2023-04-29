var k = (x, t, i) => {
  if (!t.has(x))
    throw TypeError("Cannot " + i);
};
var h = (x, t, i) => (k(x, t, "read from private field"), i ? i.call(x) : t.get(x)), y = (x, t, i) => {
  if (t.has(x))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(x) : t.set(x, i);
}, v = (x, t, i, r) => (k(x, t, "write to private field"), r ? r.call(x, i) : t.set(x, i), i);
var P = (x, t, i) => (k(x, t, "access private method"), i);
import { calculateCurvePoints as L, getOffsetCurve as p, getCurvePoint as o, calculateNormal as g } from "./calculation.js";
var c, w, T, m, f, C;
class O {
  constructor(t) {
    y(this, T);
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
    t.forEach((e) => this.drawPoint(e.x, e.y, i, r));
  }
  drawPoint(t, i, r = 3.5, e = "black") {
    this.ctx.strokeStyle = e, this.ctx.beginPath(), this.ctx.arc(t, i, r, 0, 2 * Math.PI), this.ctx.stroke(), this.ctx.closePath();
  }
  drawSkeleton(t) {
    var i = t.points;
    this.drawLine(i[0], i[1]), i.length === 3 ? this.drawLine(i[1], i[2]) : i.length === 4 && this.drawLine(i[2], i[3]), this.drawPoints(i);
  }
  drawCurve(t, i = "black") {
    this.ctx.strokeStyle = i, this.ctx.beginPath();
    var r = t.points;
    this.ctx.moveTo(r[0].x, r[0].y), t._lut.length == 0 && L(t), this.drawPoints(t._lut, 0.1, i), this.ctx.stroke(), this.ctx.closePath();
  }
  drawText(t, i) {
    i = i || { x: 0, y: 0 }, this.ctx.fillText(t, i.x, i.y);
  }
  /* ADDITIONAL DRAWING METHODS FOR LIBRARY USAGE */
  drawLookUpTable(t, i, r) {
    this.drawPoints(t, i, r);
  }
  drawLength(t, i, r = "red") {
    var e = p(t, -10), s = e.length - 1;
    e.forEach((a, n) => {
      if (this.drawCurve(a, r), n === s) {
        let d = p(t, 0.95, -15), l = o(a, 1), S = p(t, 0.95, -5);
        this.drawLine(d, l, r), this.drawLine(l, S, r);
        let E = (100 * i | 0) / 100 + "px";
        this.drawText(E, { x: l.x + 7, y: l.y - 3 });
      }
    });
  }
  drawCurvePoint(t, i = 5, r = "red") {
    this.drawPoint(t.x, t.y, i, r);
  }
  drawTangent(t, i = "red") {
    var r = o(t, t._derivative.t), e = t._derivative;
    this.drawPoint(r.x, r.y, 2, "red"), this.drawLine(r, { x: r.x + e.x, y: r.y + e.y }, i);
  }
  drawTangents(t, i, r, e = "red") {
    for (var s = 0, a = 0, n; s <= 1; s += r, a++)
      n = o(t, s), this.drawLine(n, { x: n.x + i[a].x, y: n.y + i[a].y }, e);
  }
  drawNormal(t, i, r, e = 20, s = "red") {
    var a = o(t, r);
    this.drawLine(a, { x: a.x + e * i.x, y: a.y + e * i.y }, s);
  }
  drawNormals(t, i, r, e = 20, s = "red") {
    for (var a = 0, n = 0; a <= 1; a += r, n++) {
      var d = o(t, a);
      this.drawLine(d, { x: d.x + e * i[n].x, y: d.y + e * i[n].y }, s);
    }
  }
  drawSplittedCurve(t, i, r = "red", e, s) {
    s ? (this.drawCurve(i, r), this.drawPoint(o(t, e).x, o(t, e).y, 3, r), this.drawPoint(o(t, s).x, o(t, s).y, 3, r)) : (this.drawCurve(i[0], r), this.drawCurve(i[1], r), this.drawPoint(o(t, e).x, o(t, e).y, 3, r));
  }
  drawCurveExtremas(t, i, r = 3, e = "red") {
    this.ctx.strokeStyle = e, i.values.forEach((s) => {
      let a = o(t, s);
      this.drawPoint(a.x, a.y, r, e);
    });
  }
  drawInflectionPoints(t, i, r = 3, e = "red") {
    this.ctx.strokeStyle = e, i.forEach((s) => {
      let a = o(t, s);
      this.drawPoint(a.x, a.y, r, e);
    });
  }
  drawCurvature(t, i, r, e = "#ff7f33") {
    var s = o(t, r), a = g(t, r);
    this.drawLine(s, { x: s.x + a.x * i.k * 5e3, y: s.y + a.y * i.k * 5e3 }, e);
  }
  drawCurvatures(t, i, r = 2) {
    for (var e = 0, s = 0; e < 256; e += r, s++) {
      let a = e / 255, n = o(t, a), d = g(t, a, !0);
      this.drawLine(n, { x: n.x + d.x * i[s].k * 5e3, y: n.y + d.y * i[s].k * 5e3 }, "rgba(255,127," + e + ",0.6)");
    }
  }
  drawBoundingBox(t, i = "red") {
    this.ctx.strokeStyle = i, this.ctx.beginPath(), this.ctx.moveTo(t.x.min, t.y.min), this.ctx.lineTo(t.x.min, t.y.max), this.ctx.lineTo(t.x.max, t.y.max), this.ctx.lineTo(t.x.max, t.y.min), this.ctx.closePath(), this.ctx.stroke();
  }
  drawHullPoints(t, i = "red") {
    this.ctx.strokeStyle = i, this.ctx.beginPath(), t.length === 6 ? (this.ctx.moveTo(t[0].x, t[0].y), this.ctx.lineTo(t[1].x, t[1].y), this.ctx.lineTo(t[2].x, t[2].y), this.ctx.moveTo(t[3].x, t[3].y), this.ctx.lineTo(t[4].x, t[4].y)) : (this.ctx.moveTo(t[0].x, t[0].y), this.ctx.lineTo(t[1].x, t[1].y), this.ctx.lineTo(t[2].x, t[2].y), this.ctx.lineTo(t[3].x, t[3].y), this.ctx.moveTo(t[4].x, t[4].y), this.ctx.lineTo(t[5].x, t[5].y), this.ctx.lineTo(t[6].x, t[6].y), this.ctx.moveTo(t[7].x, t[7].y), this.ctx.lineTo(t[8].x, t[8].y)), this.ctx.stroke(), this.ctx.closePath(), this.drawPoint(t.slice(-1)[0].x, t.slice(-1)[0].y, 4.5, i);
  }
  drawProjection(t, i, r = "red") {
    this.drawLine(t, i, r);
  }
  drawOffsetCurve(t, i = "red") {
    t.forEach((r) => this.drawCurve(r, i));
  }
  drawOffsetPoint(t, i = "red") {
    this.drawPoint(t.x, t.y, 4, i);
  }
  drawReducedCurve(t, i) {
    t.forEach((r, e) => {
      e > 0 && this.drawPoint(r.points[0].x, r.points[0].y, 3), this.drawCurve(r, i || P(this, T, m).call(this));
    });
  }
  drawCircularArcs(t, i) {
    t.forEach((r) => this.drawArc(r, i));
  }
  drawArc(t, i = P(this, f, C).call(this, 0.1)) {
    this.ctx.fillStyle = i, this.ctx.beginPath(), this.ctx.moveTo(t.x, t.y), this.ctx.arc(t.x, t.y, t.r, t.s, t.e), this.ctx.lineTo(t.x, t.y), this.ctx.fill(), this.ctx.stroke();
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
  drawShape(t, i = "red", r = P(this, f, C).call(this, 0.2)) {
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
  drawSelfIntersection(t, i, r = 4.5, e = "black") {
    t.order != 2 && i.forEach((s) => {
      var a = s.split("/").map((d) => parseFloat(d)), n = o(t, a[0]);
      this.drawPoint(n.x, n.y, r, e);
    });
  }
  drawLineIntersection(t, i, r = 4.5, e = "black") {
    i.forEach((s) => {
      var a = o(t, s);
      this.drawPoint(a.x, a.y, r, e);
    });
  }
  drawCurvesIntersection(t, i, r = 4.5, e = "black") {
    i.forEach((s) => {
      var a = s.split("/").map((d) => parseFloat(d)), n = o(t, a[0]);
      this.drawPoint(n.x, n.y, r, e);
    });
  }
}
c = new WeakMap(), w = new WeakMap(), T = new WeakSet(), m = function() {
  return v(this, w, (h(this, w) + 1) % h(this, c).length), h(this, c)[this.randomIndex];
}, f = new WeakSet(), C = function(t) {
  v(this, w, (h(this, w) + 1) % h(this, c).length), t = typeof t > "u" ? 1 : t;
  var i = h(this, c)[h(this, w)];
  return i = i.replace("hsl(", "hsla(").replace(")", "," + t + ")"), i;
};
export {
  O as default
};
//# sourceMappingURL=drawing.js.map
