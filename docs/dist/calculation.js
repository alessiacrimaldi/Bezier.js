import { Bezier as a } from "./bezier.js";
function u(t, n = 100) {
  return t.getLUT(n), t._lut;
}
function s(t) {
  return t._curvelength = t.length();
}
function f(t, n, e) {
  return e ? t._curvepoint = t.get(n) : t.get(n);
}
function c(t, n) {
  var e = t.derivative(n);
  return e.x *= 1 / (t._t2 - t._t1), e.y *= 1 / (t._t2 - t._t1), t._derivative = e;
}
function _(t, n) {
  for (var e = [], l = 0, r = 0; l <= 1; l += n, r++)
    e[r] = t.derivative(l), e[r].x *= 1 / (t._t2 - t._t1), e[r].y *= 1 / (t._t2 - t._t1);
  return t._derivatives = e;
}
function p(t, n, e) {
  return e ? { x: t.normal(n).x, y: t.normal(n).y, t: n } : t._normal = { x: t.normal(n).x, y: t.normal(n).y, t: n };
}
function m(t, n) {
  for (var e = [], l = 0, r = 0; l <= 1; l += n, r++)
    e[r] = { x: t.normal(l).x, y: t.normal(l).y, t: l };
  return t._normals = e;
}
function x(t, n, e) {
  return e ? t._subcurve = t.split(n, e) : t._subcurves = [t.split(n).left, t.split(n).right];
}
function g(t) {
  return t._extremas = t.extrema();
}
function C(t) {
  return t._inflectionpoints = t.inflections();
}
function h(t, n) {
  return t._curvature = { k: t.curvature(n).k, r: t.curvature(n).r, t: n };
}
function y(t, n = 2) {
  for (var e = [], l = 0, r = 0; l < 256; l += n, r++) {
    let i = l / 255;
    e[r] = { k: t.curvature(i).k, r: t.curvature(i).r, t: i };
  }
  return t._curvatures = e;
}
function b(t) {
  return t._boundingbox = t.bbox();
}
function d(t, n) {
  return t._hullpoints = t.hull(n);
}
function k(t, n) {
  return t._projectpoint = t.project(n);
}
function O(t, n, e) {
  return e ? t._offsetpoint = t.offset(e, n) : t._offsetcurves = t.offset(n);
}
function P(t) {
  return t._reducedcurves = t.reduce();
}
function T(t, n = 0.5) {
  return t._arcs = t.arcs(n);
}
function B(t, n) {
  for (var e = [], l = -30, r = 0; l <= 30; l += 10, r++)
    e[r] = n.scale(l);
  return t._scaledcurves = e;
}
function L(t, n, e, l, r) {
  return r ? t._outline = t.outline(n, e, l, r) : l ? t._outline = t.outline(n, e, l) : e ? t._outline = t.outline(n, e) : t._outline = t.outline(n);
}
function j(t, n, e, l) {
  return l ? t._shapedoutline = t.outlineshapes(n, e, l) : e ? t._shapedoutline = t.outlineshapes(n, e) : t._shapedoutline = t.outlineshapes(n);
}
function I(t, n, e = 0.5) {
  if (n)
    return n instanceof a ? t._intersection = t.intersects(n, e) : t._intersection = t.intersects(n);
  if (t.order == 2)
    return t._intersection = "no self intersection";
  if (t.order == 3)
    return t._intersection = t.intersects();
}
function N(t, n, e) {
  return e ? t.offset(n, e) : t.offset(n);
}
export {
  T as calculateArcs,
  b as calculateBoundingBox,
  k as calculateClosestPoint,
  h as calculateCurvature,
  y as calculateCurvatures,
  g as calculateCurveExtremas,
  d as calculateHullPoints,
  C as calculateInflectionPoints,
  I as calculateIntersection,
  s as calculateLength,
  p as calculateNormal,
  m as calculateNormals,
  O as calculateOffset,
  L as calculateOutline,
  P as calculateReducedCurve,
  B as calculateScaledCurve,
  j as calculateShapedOutline,
  c as calculateTangent,
  _ as calculateTangents,
  f as getCurvePoint,
  u as getLookUpTable,
  N as getOffsetCurve,
  x as splitCurve
};
//# sourceMappingURL=calculation.js.map
