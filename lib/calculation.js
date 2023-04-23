import { Bezier } from "./bezier.js";


export function getCurve(xt, yt, writeon) {
    var curve, type;
    if (xt.length == 3 && yt.length == 3) {
        curve = new Bezier(xt[0], yt[0], xt[1], yt[1], xt[2], yt[2]);
        type = "quadratic";
    } else if (xt.length == 4 && yt.length == 4) {
        curve = new Bezier(xt[0], yt[0], xt[1], yt[1], xt[2], yt[2], xt[3], yt[3]);
        type = "cubic";
    } else {
        throw new Error("Invalid curve input control points.");
    }
    if (writeon) {
        console.log(`Bézier ${type} curve:\n`, curve);
    }
    return curve;
}

export function calculateCurvePoints(curve) {
    var steps = 1000;
    for (let i = 0, p, t; i < steps; i++) {
        t = i / (steps - 1);
        p = curve.compute(t);
        p.t = t;
        curve._lut.push(p);
    }
    return curve._lut;
}

export function getLookUpTable(curve, steps = 100) {
    curve.getLUT(steps);
    return curve._lut;
}

export function calculateLength(curve) {
    return curve._curvelength = curve.length();
}

export function getCurvePoint(curve, t, writeon) {
    if (!writeon) {
        return curve.get(t);
    } else {
        return curve._curvepoint = curve.get(t);
    }
}

export function calculateTangent(curve, t) {
    var dv = curve.derivative(t);
    dv.x *= (1 / (curve._t2 - curve._t1));
    dv.y *= (1 / (curve._t2 - curve._t1));
    return curve._derivative = dv;
}

export function calculateTangents(curve, gap) {
    var dv = [];
    for (var t = 0, i = 0; t <= 1; t += gap, i++) {
        dv[i] = curve.derivative(t);
        dv[i].x *= (1 / (curve._t2 - curve._t1));
        dv[i].y *= (1 / (curve._t2 - curve._t1));
    }
    return curve._derivatives = dv;
}

export function calculateNormal(curve, t, writeoff) {
    if (writeoff) {
        return { x: curve.normal(t).x, y: curve.normal(t).y, t: t };
    } else {
        return curve._normal = { x: curve.normal(t).x, y: curve.normal(t).y, t: t };
    }
}

export function calculateNormals(curve, gap) {
    var normals = [];
    for (var t = 0, i = 0; t <= 1; t += gap, i++) {
        normals[i] = { x: curve.normal(t).x, y: curve.normal(t).y, t: t };
    }
    return curve._normals = normals;
}

export function splitCurve(curve, t1, t2) {
    if (t2) {
        return curve._subcurve = curve.split(t1, t2);
    } else {
        return curve._subcurves = [curve.split(t1).left, curve.split(t1).right];
    }
}

export function calculateCurveExtremas(curve) {
    return curve._extremas = curve.extrema();
}

export function calculateInflectionPoints(curve) {
    return curve._inflectionpoints = curve.inflections();
}

export function calculateCurvature(curve, t) {
    return curve._curvature = { k: curve.curvature(t).k, r: curve.curvature(t).r, t: t };
}

export function calculateCurvatures(curve, gap = 2) {
    var kr = [];
    for (var s = 0, i = 0; s < 256; s += gap, i++) {
        let t = s / 255;
        kr[i] = { k: curve.curvature(t).k, r: curve.curvature(t).r, t: t };
    }
    return curve._curvatures = kr;
}

export function calculateBoundingBox(curve) {
    return curve._boundingbox = curve.bbox();
}

export function calculateHullPoints(curve, t) {
    return curve._hullpoints = curve.hull(t);
}

export function calculateClosestPoint(curve, point) {
    return curve._projectpoint = curve.project(point);
}

export function calculateOffset(curve, d, t) {
    if (t) {
        return curve._offsetpoint = curve.offset(t, d);
    } else {
        return curve._offsetcurves = curve.offset(d);
    }
}

export function calculateReducedCurve(curve) {
    return curve._reducedcurves = curve.reduce();
}

export function calculateArcs(curve, threshold = 0.5) {
    return curve._arcs = curve.arcs(threshold);
}

export function calculateScaledCurve(curve, reduced) {
    var scaledCurves = [];
    for (var d = -30, k = 0; d <= 30; d += 10, k++) {
        scaledCurves[k] = reduced.scale(d);
    }
    return curve._scaledcurves = scaledCurves;
}

export function calculateOutline(curve, d1, d2, d3, d4) {
    if (d4) {
        return curve._outline = curve.outline(d1, d2, d3, d4);
    } else if (d3) {
        return curve._outline = curve.outline(d1, d2, d3);
    } else if (d2) {
        return curve._outline = curve.outline(d1, d2);
    } else {
        return curve._outline = curve.outline(d1);
    }
}

export function calculateShapedOutline(curve, d1, d2, threshold) {
    if (threshold) {
        return curve._shapedoutline = curve.outlineshapes(d1, d2, threshold);
    } else if (d2) {
        return curve._shapedoutline = curve.outlineshapes(d1, d2);
    } else {
        return curve._shapedoutline = curve.outlineshapes(d1);
    }
}

export function calculateIntersection(curve, other, threshold = 0.5) {
    if (other) {
        if (other instanceof Bezier) {
            return curve._intersection = curve.intersects(other, threshold);
        } else {
            return curve._intersection = curve.intersects(other);
        }
    } else {
        if (curve.order == 2) {
            return curve._intersection = "no self intersection";
        } else if (curve.order == 3) {
            return curve._intersection = curve.intersects();
        }
    }
}

// utils
export function getOffsetCurve(curve, a, b) {
    if (b) {
        return curve.offset(a, b);
    } else {
        return curve.offset(a);
    }
}