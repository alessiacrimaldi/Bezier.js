import { Bezier as o } from "./bezier.js";
function u(t, n, e) {
  var l, r;
  if (t.length == 3 && n.length == 3)
    l = new o(t[0], n[0], t[1], n[1], t[2], n[2]), r = "quadratic";
  else if (t.length == 4 && n.length == 4)
    l = new o(t[0], n[0], t[1], n[1], t[2], n[2], t[3], n[3]), r = "cubic";
  else
    throw new Error("Invalid curve input control points.");
  return e && console.log(`Bézier ${r} curve:
`, l), l;
}
function s(t) {
  var n = 1e3;
  for (let e = 0, l, r; e < n; e++)
    r = e / (n - 1), l = t.compute(r), l.t = r, t._lut.push(l);
  return t._lut;
}
function f(t, n = 100) {
  return t.getLUT(n), t._lut;
}
function c(t) {
  return t._curvelength = t.length();
}
function _(t, n, e) {
  return e ? t._curvepoint = t.get(n) : t.get(n);
}
function p(t, n) {
  var e = t.derivative(n);
  return e.x *= 1 / (t._t2 - t._t1), e.y *= 1 / (t._t2 - t._t1), t._derivative = e;
}
function g(t, n) {
  for (var e = [], l = 0, r = 0; l <= 1; l += n, r++)
    e[r] = t.derivative(l), e[r].x *= 1 / (t._t2 - t._t1), e[r].y *= 1 / (t._t2 - t._t1);
  return t._derivatives = e;
}
function m(t, n, e) {
  return e ? { x: t.normal(n).x, y: t.normal(n).y, t: n } : t._normal = { x: t.normal(n).x, y: t.normal(n).y, t: n };
}
function h(t, n) {
  for (var e = [], l = 0, r = 0; l <= 1; l += n, r++)
    e[r] = { x: t.normal(l).x, y: t.normal(l).y, t: l };
  return t._normals = e;
}
function C(t, n, e) {
  return e ? t._subcurve = t.split(n, e) : t._subcurves = [t.split(n).left, t.split(n).right];
}
function b(t) {
  return t._extremas = t.extrema();
}
function d(t) {
  return t._inflectionpoints = t.inflections();
}
function x(t, n) {
  return t._curvature = { k: t.curvature(n).k, r: t.curvature(n).r, t: n };
}
function k(t, n = 2) {
  for (var e = [], l = 0, r = 0; l < 256; l += n, r++) {
    let i = l / 255;
    e[r] = { k: t.curvature(i).k, r: t.curvature(i).r, t: i };
  }
  return t._curvatures = e;
}
function P(t) {
  return t._boundingbox = t.bbox();
}
function w(t, n) {
  return t._hullpoints = t.hull(n);
}
function B(t, n) {
  return t._projectpoint = t.project(n);
}
function O(t, n, e) {
  return e ? t._offsetpoint = t.offset(e, n) : t._offsetcurves = t.offset(n);
}
function T(t) {
  return t._reducedcurves = t.reduce();
}
function I(t, n = 0.5) {
  return t._arcs = t.arcs(n);
}
function L(t, n) {
  for (var e = [], l = -30, r = 0; l <= 30; l += 10, r++)
    e[r] = n.scale(l);
  return t._scaledcurves = e;
}
function j(t, n, e, l, r) {
  return r ? t._outline = t.outline(n, e, l, r) : l ? t._outline = t.outline(n, e, l) : e ? t._outline = t.outline(n, e) : t._outline = t.outline(n);
}
function z(t, n, e, l) {
  return l ? t._shapedoutline = t.outlineshapes(n, e, l) : e ? t._shapedoutline = t.outlineshapes(n, e) : t._shapedoutline = t.outlineshapes(n);
}
function E(t, n, e = 0.5) {
  if (n)
    return n instanceof o ? t._intersection = t.intersects(n, e) : t._intersection = t.intersects(n);
  if (t.order == 2)
    return t._intersection = "no self intersection";
  if (t.order == 3)
    return t._intersection = t.intersects();
}
function N(t, n, e) {
  return e ? t.offset(n, e) : t.offset(n);
}
export {
  I as calculateArcs,
  P as calculateBoundingBox,
  B as calculateClosestPoint,
  x as calculateCurvature,
  k as calculateCurvatures,
  b as calculateCurveExtremas,
  s as calculateCurvePoints,
  w as calculateHullPoints,
  d as calculateInflectionPoints,
  E as calculateIntersection,
  c as calculateLength,
  m as calculateNormal,
  h as calculateNormals,
  O as calculateOffset,
  j as calculateOutline,
  T as calculateReducedCurve,
  L as calculateScaledCurve,
  z as calculateShapedOutline,
  p as calculateTangent,
  g as calculateTangents,
  u as getCurve,
  _ as getCurvePoint,
  f as getLookUpTable,
  N as getOffsetCurve,
  C as splitCurve
};
//# sourceMappingURL=calculation.js.map
