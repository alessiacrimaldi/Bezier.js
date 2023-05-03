var y = (o, t, s) => {
  if (!t.has(o))
    throw TypeError("Cannot " + s);
};
var h = (o, t, s) => (y(o, t, "read from private field"), s ? s.call(o) : t.get(o)), c = (o, t, s) => {
  if (t.has(o))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(o) : t.set(o, s);
};
var x, d;
class g {
  constructor(t) {
    c(this, x, [
      "#FF0000",
      "#FF7F00",
      "#FFFF00",
      "#00FF00",
      "#0000FF",
      "#4B0082",
      "#8F00FF"
    ]);
    c(this, d, [
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
  /* Basic drawing methods */
  drawLine(t, s, i = "lightgrey") {
    this.ctx.strokeStyle = i, this.ctx.beginPath(), this.ctx.moveTo(t.x, t.y), this.ctx.lineTo(s.x, s.y), this.ctx.stroke(), this.ctx.closePath();
  }
  drawPoints(t, s, i, r) {
    t.forEach((e) => this.drawPoint(e, s, i, r));
  }
  drawPoint(t, s = 3.5, i = "black", r = "transparent") {
    this.ctx.strokeStyle = i, this.ctx.fillStyle = r, this.ctx.beginPath(), this.ctx.arc(t.x, t.y, s, 0, 2 * Math.PI), this.ctx.fill(), this.ctx.stroke(), this.ctx.closePath();
  }
  drawCircle(t, s = "red", i = "transparent") {
    this.ctx.strokeStyle = s, this.ctx.fillStyle = i, this.ctx.beginPath(), this.ctx.arc(t.x, t.y, t.r, 0, 2 * Math.PI), this.ctx.fill(), this.ctx.stroke(), this.ctx.closePath();
  }
  drawSkeleton(t, s) {
    var i = t.points;
    this.drawLine(i[0], i[1]), i.length === 3 ? this.drawLine(i[1], i[2]) : i.length === 4 && this.drawLine(i[2], i[3]), this.drawPoints(i, 3.5, s);
  }
  drawCurve(t, s = "black", i = 0.1) {
    this.ctx.strokeStyle = s, this.ctx.beginPath();
    var r = t.points;
    this.ctx.moveTo(r[0].x, r[0].y), t.curvepoints.length == 0 && t.computeCurvePoints(), this.drawPoints(t.curvepoints, i, s), this.ctx.stroke(), this.ctx.closePath();
  }
  drawText(t, s, i = "black") {
    s = s || { x: 0, y: 0 }, this.ctx.fillStyle = i, this.ctx.fillText(t, s.x, s.y);
  }
  /* Additional drawing methods for library usage */
  drawLookupTable(t, s = 3, i = "black") {
    this.drawPoints(t._lut, s, i, "white");
  }
  drawLength(t, s = "red") {
    let i = t.offset(-10), r = i.length - 1;
    i.forEach((e, a) => {
      if (this.drawCurve(e, s), a === r) {
        let n = t.offset(0.95, -15), l = e.get(1), w = t.offset(0.95, -5);
        this.drawLine(n, l, s), this.drawLine(l, w, s);
        let b = (100 * t.len | 0) / 100 + "px";
        this.drawText(b, { x: l.x + 7, y: l.y - 3 });
      }
    });
  }
  drawCurvePoint(t, s = 5, i = "red") {
    this.drawPoint(t.p, s, i);
  }
  drawTangent(t, s = "red") {
    var i = t.get(t.dv.t), r = t.dv;
    this.drawPoint(i, 2.5, s, "white"), this.drawLine(i, { x: i.x + r.x, y: i.y + r.y }, s);
  }
  drawNormal(t, s = 40, i = "red") {
    const r = t.norm, e = t.get(r.t);
    this.drawPoint(e, 2.5, i, "white"), this.drawLine(e, { x: e.x + s * r.x, y: e.y + s * r.y }, i);
  }
  drawSplittedCurve(t, s = "red") {
    t.subc.c ? (this.drawCurve(t.subc.c[0], s), this.drawCurve(t.subc.c[1], s), this.drawPoint(t.get(t.subc.t), 3, s)) : (this.drawCurve(t.subc.v, s), this.drawPoint(t.get(t.subc.t1), 3, s), this.drawPoint(t.get(t.subc.t2), 3, s));
  }
  drawCurveExtremas(t, s = 3, i = "red") {
    this.ctx.strokeStyle = i, t.extrs.values.forEach((r) => {
      let e = t.get(r);
      this.drawPoint(e, s, i);
    });
  }
  drawInflectionPoints(t, s = 3, i = "red") {
    this.ctx.strokeStyle = i, t.infl.forEach((r) => {
      let e = t.get(r);
      this.drawPoint(e, s, i);
    });
  }
  drawCurvature(t, s = "red") {
    const i = t.kr.t, r = t.kr.r, e = t.get(i), a = t.normal(i);
    this.drawLine(e, { x: e.x + a.x * r, y: e.y + a.y * r }, s);
  }
  drawBoundingBox(t, s = "red") {
    this.ctx.strokeStyle = s, this.ctx.beginPath(), this.ctx.moveTo(t.bb.x.min, t.bb.y.min), this.ctx.lineTo(t.bb.x.min, t.bb.y.max), this.ctx.lineTo(t.bb.x.max, t.bb.y.max), this.ctx.lineTo(t.bb.x.max, t.bb.y.min), this.ctx.closePath(), this.ctx.stroke();
  }
  drawHullPoints(t, s = "red") {
    const i = t.hullp;
    this.ctx.strokeStyle = s, this.ctx.beginPath(), i.length === 6 ? (this.ctx.moveTo(i[0].x, i[0].y), this.ctx.lineTo(i[1].x, i[1].y), this.ctx.lineTo(i[2].x, i[2].y), this.ctx.moveTo(i[3].x, i[3].y), this.ctx.lineTo(i[4].x, i[4].y)) : (this.ctx.moveTo(i[0].x, i[0].y), this.ctx.lineTo(i[1].x, i[1].y), this.ctx.lineTo(i[2].x, i[2].y), this.ctx.lineTo(i[3].x, i[3].y), this.ctx.moveTo(i[4].x, i[4].y), this.ctx.lineTo(i[5].x, i[5].y), this.ctx.lineTo(i[6].x, i[6].y), this.ctx.moveTo(i[7].x, i[7].y), this.ctx.lineTo(i[8].x, i[8].y)), this.ctx.stroke(), this.ctx.closePath(), this.drawPoint(i.slice(-1)[0], 4.5, s);
  }
  drawProjection(t, s = "red") {
    this.drawLine(t.projp, t.projp.point, s);
  }
  drawOffsetCurve(t, s) {
    t.offst.forEach((i, r) => this.drawCurve(i, s || h(this, x)[r]));
  }
  drawOffsetPoint(t, s = 4, i = "red") {
    this.drawPoint(t.offstcoords, s, i, "white");
  }
  drawReducedCurve(t, s) {
    t.redc.forEach((i, r) => {
      r > 0 && this.drawPoint(i.points[0], 3), this.drawCurve(i, s || h(this, x)[r]);
    });
  }
  drawCircularArcs(t, s) {
    t.carcs.forEach((i, r) => this.drawArc(i, s || h(this, d)[r]));
  }
  drawArc(t, s) {
    this.ctx.fillStyle = s, this.ctx.beginPath(), this.ctx.moveTo(t.x, t.y), this.ctx.arc(t.x, t.y, t.r, t.s, t.e), this.ctx.fill(), this.ctx.closePath();
  }
  drawScaledCurve(t, s = "black") {
    this.drawReducedCurve(t.redc, s);
    for (var i = 0; i <= 6; i++)
      this.drawCurve(t.scaled[i], s);
  }
  drawOutline(t, s = "red") {
    t.outl.curves.forEach((i) => this.drawCurve(i, s));
  }
  drawShapedOutline(t, s = "red", i) {
    t.shapeoutl.forEach((r, e) => this.drawShape(r, s, i || h(this, d)[e]));
  }
  drawShape(t, s, i) {
    this.ctx.strokeStyle = s, this.ctx.fillStyle = i;
    var r = t.forward.points.length - 1, e = t.startcap.points.length, a = t.endcap.points.length;
    this.ctx.beginPath(), this.ctx.moveTo(
      t.startcap.points[0].x,
      t.startcap.points[0].y
    ), this.ctx.lineTo(
      t.startcap.points[e - 1].x,
      t.startcap.points[e - 1].y
    ), r === 3 ? this.ctx.bezierCurveTo(
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
    ), r === 3 ? this.ctx.bezierCurveTo(
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
  drawSelfIntersection(t, s = 4, i = "red") {
    t.order != 2 && t.intersections.self.forEach((r) => {
      var e = r.split("/").map((n) => parseFloat(n)), a = t.get(e[0]);
      this.drawPoint(a, s, i, "white");
    });
  }
  drawLineIntersection(t, s = 4, i = "red") {
    t.intersections.line.forEach((r) => {
      var e = t.get(r);
      this.drawPoint(e, s, i, "white");
    });
  }
  drawCurvesIntersection(t, s = 4, i = "red") {
    t.intersections.curve.forEach((r) => {
      var e = r.split("/").map((n) => parseFloat(n)), a = t.get(e[0]);
      this.drawPoint(a, s, i, "white");
    });
  }
}
x = new WeakMap(), d = new WeakMap();
export {
  g as default
};
//# sourceMappingURL=drawing.js.map
