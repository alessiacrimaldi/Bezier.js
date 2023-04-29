const { abs: $, cos: N, sin: I, acos: K, atan2: P, sqrt: R, pow: T } = Math;
function J(c) {
  return c < 0 ? -T(-c, 1 / 3) : T(c, 1 / 3);
}
const Z = Math.PI, X = 2 * Z, U = Z / 2, B = 1e-6, W = Number.MAX_SAFE_INTEGER || 9007199254740991, Y = Number.MIN_SAFE_INTEGER || -9007199254740991, tt = { x: 0, y: 0, z: 0 }, h = {
  // Legendre-Gauss abscissae with n=24 (x_i values, defined at i=n as the roots of the nth order Legendre polynomial Pn(x))
  Tvalues: [
    -0.06405689286260563,
    0.06405689286260563,
    -0.1911188674736163,
    0.1911188674736163,
    -0.3150426796961634,
    0.3150426796961634,
    -0.4337935076260451,
    0.4337935076260451,
    -0.5454214713888396,
    0.5454214713888396,
    -0.6480936519369755,
    0.6480936519369755,
    -0.7401241915785544,
    0.7401241915785544,
    -0.820001985973903,
    0.820001985973903,
    -0.8864155270044011,
    0.8864155270044011,
    -0.9382745520027328,
    0.9382745520027328,
    -0.9747285559713095,
    0.9747285559713095,
    -0.9951872199970213,
    0.9951872199970213
  ],
  // Legendre-Gauss weights with n=24 (w_i values, defined by a function linked to in the Bezier primer article)
  Cvalues: [
    0.12793819534675216,
    0.12793819534675216,
    0.1258374563468283,
    0.1258374563468283,
    0.12167047292780339,
    0.12167047292780339,
    0.1155056680537256,
    0.1155056680537256,
    0.10744427011596563,
    0.10744427011596563,
    0.09761865210411388,
    0.09761865210411388,
    0.08619016153195327,
    0.08619016153195327,
    0.0733464814110803,
    0.0733464814110803,
    0.05929858491543678,
    0.05929858491543678,
    0.04427743881741981,
    0.04427743881741981,
    0.028531388628933663,
    0.028531388628933663,
    0.0123412297999872,
    0.0123412297999872
  ],
  arcfn: function(c, n) {
    const e = n(c);
    let i = e.x * e.x + e.y * e.y;
    return typeof e.z < "u" && (i += e.z * e.z), R(i);
  },
  compute: function(c, n, e) {
    if (c === 0)
      return n[0].t = 0, n[0];
    const i = n.length - 1;
    if (c === 1)
      return n[i].t = 1, n[i];
    const s = 1 - c;
    let o = n;
    if (i === 0)
      return n[0].t = c, n[0];
    if (i === 1) {
      const u = {
        x: s * o[0].x + c * o[1].x,
        y: s * o[0].y + c * o[1].y,
        t: c
      };
      return e && (u.z = s * o[0].z + c * o[1].z), u;
    }
    if (i < 4) {
      let u = s * s, f = c * c, a, y, l, x = 0;
      i === 2 ? (o = [o[0], o[1], o[2], tt], a = u, y = s * c * 2, l = f) : i === 3 && (a = u * s, y = u * c * 3, l = s * f * 3, x = c * f);
      const p = {
        x: a * o[0].x + y * o[1].x + l * o[2].x + x * o[3].x,
        y: a * o[0].y + y * o[1].y + l * o[2].y + x * o[3].y,
        t: c
      };
      return e && (p.z = a * o[0].z + y * o[1].z + l * o[2].z + x * o[3].z), p;
    }
    const r = JSON.parse(JSON.stringify(n));
    for (; r.length > 1; ) {
      for (let u = 0; u < r.length - 1; u++)
        r[u] = {
          x: r[u].x + (r[u + 1].x - r[u].x) * c,
          y: r[u].y + (r[u + 1].y - r[u].y) * c
        }, typeof r[u].z < "u" && (r[u] = r[u].z + (r[u + 1].z - r[u].z) * c);
      r.splice(r.length - 1, 1);
    }
    return r[0].t = c, r[0];
  },
  computeWithRatios: function(c, n, e, i) {
    const s = 1 - c, o = e, r = n;
    let u = o[0], f = o[1], a = o[2], y = o[3], l;
    if (u *= s, f *= c, r.length === 2)
      return l = u + f, {
        x: (u * r[0].x + f * r[1].x) / l,
        y: (u * r[0].y + f * r[1].y) / l,
        z: i ? (u * r[0].z + f * r[1].z) / l : !1,
        t: c
      };
    if (u *= s, f *= 2 * s, a *= c * c, r.length === 3)
      return l = u + f + a, {
        x: (u * r[0].x + f * r[1].x + a * r[2].x) / l,
        y: (u * r[0].y + f * r[1].y + a * r[2].y) / l,
        z: i ? (u * r[0].z + f * r[1].z + a * r[2].z) / l : !1,
        t: c
      };
    if (u *= s, f *= 1.5 * s, a *= 3 * s, y *= c * c * c, r.length === 4)
      return l = u + f + a + y, {
        x: (u * r[0].x + f * r[1].x + a * r[2].x + y * r[3].x) / l,
        y: (u * r[0].y + f * r[1].y + a * r[2].y + y * r[3].y) / l,
        z: i ? (u * r[0].z + f * r[1].z + a * r[2].z + y * r[3].z) / l : !1,
        t: c
      };
  },
  derive: function(c, n) {
    const e = [];
    for (let i = c, s = i.length, o = s - 1; s > 1; s--, o--) {
      const r = [];
      for (let u = 0, f; u < o; u++)
        f = {
          x: o * (i[u + 1].x - i[u].x),
          y: o * (i[u + 1].y - i[u].y)
        }, n && (f.z = o * (i[u + 1].z - i[u].z)), r.push(f);
      e.push(r), i = r;
    }
    return e;
  },
  between: function(c, n, e) {
    return n <= c && c <= e || h.approximately(c, n) || h.approximately(c, e);
  },
  approximately: function(c, n, e) {
    return $(c - n) <= (e || B);
  },
  length: function(c) {
    const e = h.Tvalues.length;
    let i = 0;
    for (let s = 0, o; s < e; s++)
      o = 0.5 * h.Tvalues[s] + 0.5, i += h.Cvalues[s] * h.arcfn(o, c);
    return 0.5 * i;
  },
  map: function(c, n, e, i, s) {
    const o = e - n, r = s - i, u = c - n, f = u / o;
    return i + r * f;
  },
  lerp: function(c, n, e) {
    const i = {
      x: n.x + c * (e.x - n.x),
      y: n.y + c * (e.y - n.y)
    };
    return n.z !== void 0 && e.z !== void 0 && (i.z = n.z + c * (e.z - n.z)), i;
  },
  pointToString: function(c) {
    let n = c.x + "/" + c.y;
    return typeof c.z < "u" && (n += "/" + c.z), n;
  },
  pointsToString: function(c) {
    return "[" + c.map(h.pointToString).join(", ") + "]";
  },
  copy: function(c) {
    return JSON.parse(JSON.stringify(c));
  },
  angle: function(c, n, e) {
    const i = n.x - c.x, s = n.y - c.y, o = e.x - c.x, r = e.y - c.y, u = i * r - s * o, f = i * o + s * r;
    return P(u, f);
  },
  // round as string, to avoid rounding errors
  round: function(c, n) {
    const e = "" + c, i = e.indexOf(".");
    return parseFloat(e.substring(0, i + 1 + n));
  },
  dist: function(c, n) {
    const e = c.x - n.x, i = c.y - n.y;
    return R(e * e + i * i);
  },
  closest: function(c, n) {
    let e = T(2, 63), i, s;
    return c.forEach(function(o, r) {
      s = h.dist(n, o), s < e && (e = s, i = r);
    }), { mdist: e, mpos: i };
  },
  abcratio: function(c, n) {
    if (n !== 2 && n !== 3)
      return !1;
    if (typeof c > "u")
      c = 0.5;
    else if (c === 0 || c === 1)
      return c;
    const e = T(c, n) + T(1 - c, n), i = e - 1;
    return $(i / e);
  },
  projectionratio: function(c, n) {
    if (n !== 2 && n !== 3)
      return !1;
    if (typeof c > "u")
      c = 0.5;
    else if (c === 0 || c === 1)
      return c;
    const e = T(1 - c, n), i = T(c, n) + e;
    return e / i;
  },
  lli8: function(c, n, e, i, s, o, r, u) {
    const f = (c * i - n * e) * (s - r) - (c - e) * (s * u - o * r), a = (c * i - n * e) * (o - u) - (n - i) * (s * u - o * r), y = (c - e) * (o - u) - (n - i) * (s - r);
    return y == 0 ? !1 : { x: f / y, y: a / y };
  },
  lli4: function(c, n, e, i) {
    const s = c.x, o = c.y, r = n.x, u = n.y, f = e.x, a = e.y, y = i.x, l = i.y;
    return h.lli8(s, o, r, u, f, a, y, l);
  },
  lli: function(c, n) {
    return h.lli4(c, c.c, n, n.c);
  },
  makeline: function(c, n) {
    return new v(
      c.x,
      c.y,
      (c.x + n.x) / 2,
      (c.y + n.y) / 2,
      n.x,
      n.y
    );
  },
  findbbox: function(c) {
    let n = W, e = W, i = Y, s = Y;
    return c.forEach(function(o) {
      const r = o.bbox();
      n > r.x.min && (n = r.x.min), e > r.y.min && (e = r.y.min), i < r.x.max && (i = r.x.max), s < r.y.max && (s = r.y.max);
    }), {
      x: { min: n, mid: (n + i) / 2, max: i, size: i - n },
      y: { min: e, mid: (e + s) / 2, max: s, size: s - e }
    };
  },
  shapeintersections: function(c, n, e, i, s) {
    if (!h.bboxoverlap(n, i))
      return [];
    const o = [], r = [c.startcap, c.forward, c.back, c.endcap], u = [e.startcap, e.forward, e.back, e.endcap];
    return r.forEach(function(f) {
      f.virtual || u.forEach(function(a) {
        if (a.virtual)
          return;
        const y = f.intersects(a, s);
        y.length > 0 && (y.c1 = f, y.c2 = a, y.s1 = c, y.s2 = e, o.push(y));
      });
    }), o;
  },
  makeshape: function(c, n, e) {
    const i = n.points.length, s = c.points.length, o = h.makeline(n.points[i - 1], c.points[0]), r = h.makeline(c.points[s - 1], n.points[0]), u = {
      startcap: o,
      forward: c,
      back: n,
      endcap: r,
      bbox: h.findbbox([o, c, n, r])
    };
    return u.intersections = function(f) {
      return h.shapeintersections(
        u,
        u.bbox,
        f,
        f.bbox,
        e
      );
    }, u;
  },
  getminmax: function(c, n, e) {
    if (!e)
      return { min: 0, max: 0 };
    let i = W, s = Y, o, r;
    e.indexOf(0) === -1 && (e = [0].concat(e)), e.indexOf(1) === -1 && e.push(1);
    for (let u = 0, f = e.length; u < f; u++)
      o = e[u], r = c.get(o), r[n] < i && (i = r[n]), r[n] > s && (s = r[n]);
    return { min: i, mid: (i + s) / 2, max: s, size: s - i };
  },
  align: function(c, n) {
    const e = n.p1.x, i = n.p1.y, s = -P(n.p2.y - i, n.p2.x - e), o = function(r) {
      return {
        x: (r.x - e) * N(s) - (r.y - i) * I(s),
        y: (r.x - e) * I(s) + (r.y - i) * N(s)
      };
    };
    return c.map(o);
  },
  roots: function(c, n) {
    n = n || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
    const e = c.length - 1, i = h.align(c, n), s = function(d) {
      return 0 <= d && d <= 1;
    };
    if (e === 2) {
      const d = i[0].y, z = i[1].y, A = i[2].y, k = d - 2 * z + A;
      if (k !== 0) {
        const j = -R(z * z - d * A), C = -d + z, F = -(j + C) / k, b = -(-j + C) / k;
        return [F, b].filter(s);
      } else if (z !== A && k === 0)
        return [(2 * z - A) / (2 * z - 2 * A)].filter(s);
      return [];
    }
    const o = i[0].y, r = i[1].y, u = i[2].y, f = i[3].y;
    let a = -o + 3 * r - 3 * u + f, y = 3 * o - 6 * r + 3 * u, l = -3 * o + 3 * r, x = o;
    if (h.approximately(a, 0)) {
      if (h.approximately(y, 0))
        return h.approximately(l, 0) ? [] : [-x / l].filter(s);
      const d = R(l * l - 4 * y * x), z = 2 * y;
      return [(d - l) / z, (-l - d) / z].filter(s);
    }
    y /= a, l /= a, x /= a;
    const p = (3 * l - y * y) / 3, g = p / 3, _ = (2 * y * y * y - 9 * y * l + 27 * x) / 27, O = _ / 2, E = O * O + g * g * g;
    let M, w, S, m, q;
    if (E < 0) {
      const d = -p / 3, z = d * d * d, A = R(z), k = -_ / (2 * A), j = k < -1 ? -1 : k > 1 ? 1 : k, C = K(j), F = J(A), b = 2 * F;
      return S = b * N(C / 3) - y / 3, m = b * N((C + X) / 3) - y / 3, q = b * N((C + 2 * X) / 3) - y / 3, [S, m, q].filter(s);
    } else {
      if (E === 0)
        return M = O < 0 ? J(-O) : -J(O), S = 2 * M - y / 3, m = -M - y / 3, [S, m].filter(s);
      {
        const d = R(E);
        return M = J(-O + d), w = J(O + d), [M - w - y / 3].filter(s);
      }
    }
  },
  droots: function(c) {
    if (c.length === 3) {
      const n = c[0], e = c[1], i = c[2], s = n - 2 * e + i;
      if (s !== 0) {
        const o = -R(e * e - n * i), r = -n + e, u = -(o + r) / s, f = -(-o + r) / s;
        return [u, f];
      } else if (e !== i && s === 0)
        return [(2 * e - i) / (2 * (e - i))];
      return [];
    }
    if (c.length === 2) {
      const n = c[0], e = c[1];
      return n !== e ? [n / (n - e)] : [];
    }
    return [];
  },
  curvature: function(c, n, e, i, s) {
    let o, r, u, f, a = 0, y = 0;
    const l = h.compute(c, n), x = h.compute(c, e), p = l.x * l.x + l.y * l.y;
    if (i ? (o = R(
      T(l.y * x.z - x.y * l.z, 2) + T(l.z * x.x - x.z * l.x, 2) + T(l.x * x.y - x.x * l.y, 2)
    ), r = T(p + l.z * l.z, 3 / 2)) : (o = l.x * x.y - l.y * x.x, r = T(p, 3 / 2)), o === 0 || r === 0)
      return { k: 0, r: 0 };
    if (a = o / r, y = r / o, !s) {
      const g = h.curvature(c - 1e-3, n, e, i, !0).k, _ = h.curvature(c + 1e-3, n, e, i, !0).k;
      f = (_ - a + (a - g)) / 2, u = ($(_ - a) + $(a - g)) / 2;
    }
    return { k: a, r: y, dk: f, adk: u };
  },
  inflections: function(c) {
    if (c.length < 4)
      return [];
    const n = h.align(c, { p1: c[0], p2: c.slice(-1)[0] }), e = n[2].x * n[1].y, i = n[3].x * n[1].y, s = n[1].x * n[2].y, o = n[3].x * n[2].y, r = 18 * (-3 * e + 2 * i + 3 * s - o), u = 18 * (3 * e - i - 3 * s), f = 18 * (s - e);
    if (h.approximately(r, 0)) {
      if (!h.approximately(u, 0)) {
        let x = -f / u;
        if (0 <= x && x <= 1)
          return [x];
      }
      return [];
    }
    const a = u * u - 4 * r * f, y = Math.sqrt(a), l = 2 * r;
    return h.approximately(l, 0) ? [] : [(y - u) / l, -(u + y) / l].filter(function(x) {
      return 0 <= x && x <= 1;
    });
  },
  bboxoverlap: function(c, n) {
    const e = ["x", "y"], i = e.length;
    for (let s = 0, o, r, u, f; s < i; s++)
      if (o = e[s], r = c[o].mid, u = n[o].mid, f = (c[o].size + n[o].size) / 2, $(r - u) >= f)
        return !1;
    return !0;
  },
  expandbox: function(c, n) {
    n.x.min < c.x.min && (c.x.min = n.x.min), n.y.min < c.y.min && (c.y.min = n.y.min), n.z && n.z.min < c.z.min && (c.z.min = n.z.min), n.x.max > c.x.max && (c.x.max = n.x.max), n.y.max > c.y.max && (c.y.max = n.y.max), n.z && n.z.max > c.z.max && (c.z.max = n.z.max), c.x.mid = (c.x.min + c.x.max) / 2, c.y.mid = (c.y.min + c.y.max) / 2, c.z && (c.z.mid = (c.z.min + c.z.max) / 2), c.x.size = c.x.max - c.x.min, c.y.size = c.y.max - c.y.min, c.z && (c.z.size = c.z.max - c.z.min);
  },
  pairiteration: function(c, n, e) {
    const i = c.bbox(), s = n.bbox(), o = 1e5, r = e || 0.5;
    if (i.x.size + i.y.size < r && s.x.size + s.y.size < r)
      return [
        (o * (c._t1 + c._t2) / 2 | 0) / o + "/" + (o * (n._t1 + n._t2) / 2 | 0) / o
      ];
    let u = c.split(0.5), f = n.split(0.5), a = [
      { left: u.left, right: f.left },
      { left: u.left, right: f.right },
      { left: u.right, right: f.right },
      { left: u.right, right: f.left }
    ];
    a = a.filter(function(l) {
      return h.bboxoverlap(l.left.bbox(), l.right.bbox());
    });
    let y = [];
    return a.length === 0 || (a.forEach(function(l) {
      y = y.concat(
        h.pairiteration(l.left, l.right, r)
      );
    }), y = y.filter(function(l, x) {
      return y.indexOf(l) === x;
    })), y;
  },
  getccenter: function(c, n, e) {
    const i = n.x - c.x, s = n.y - c.y, o = e.x - n.x, r = e.y - n.y, u = i * N(U) - s * I(U), f = i * I(U) + s * N(U), a = o * N(U) - r * I(U), y = o * I(U) + r * N(U), l = (c.x + n.x) / 2, x = (c.y + n.y) / 2, p = (n.x + e.x) / 2, g = (n.y + e.y) / 2, _ = l + u, O = x + f, E = p + a, M = g + y, w = h.lli8(l, x, _, O, p, g, E, M), S = h.dist(w, c);
    let m = P(c.y - w.y, c.x - w.x), q = P(n.y - w.y, n.x - w.x), d = P(e.y - w.y, e.x - w.x), z;
    return m < d ? ((m > q || q > d) && (m += X), m > d && (z = d, d = m, m = z)) : d < q && q < m ? (z = d, d = m, m = z) : d += X, w.s = m, w.e = d, w.r = S, w;
  },
  numberSort: function(c, n) {
    return c - n;
  }
};
class G {
  constructor(n) {
    this.curves = [], this._3d = !1, n && (this.curves = n, this._3d = this.curves[0]._3d);
  }
  // setJoinC_0() {
  //   // to do --> se discordi, fare il punto medio
  // }
  valueOf() {
    return this.toString();
  }
  toString() {
    return "[" + this.curves.map(function(n) {
      return h.pointsToString(n.points);
    }).join(", ") + "]";
  }
  addCurve(n) {
    this.curves.push(n), this._3d = this._3d || n._3d;
  }
  length() {
    return this.curves.map(function(n) {
      return n.length();
    }).reduce(function(n, e) {
      return n + e;
    });
  }
  curve(n) {
    return this.curves[n];
  }
  bbox() {
    const n = this.curves;
    for (var e = n[0].bbox(), i = 1; i < n.length; i++)
      h.expandbox(e, n[i].bbox());
    return e;
  }
  offset(n) {
    const e = [];
    return this.curves.forEach(function(i) {
      e.push(...i.offset(n));
    }), new G(e);
  }
}
const { abs: L, min: Q, max: V, cos: nt, sin: et, acos: it, sqrt: D } = Math, rt = Math.PI;
class v {
  constructor(n) {
    let e = n && n.forEach ? n : Array.from(arguments).slice(), i = !1;
    if (typeof e[0] == "object") {
      i = e.length;
      const p = [];
      e.forEach(function(g) {
        ["x", "y", "z"].forEach(function(_) {
          typeof g[_] < "u" && p.push(g[_]);
        });
      }), e = p;
    }
    let s = !1;
    const o = e.length;
    if (i) {
      if (i > 4) {
        if (arguments.length !== 1)
          throw new Error(
            "Only new Bezier(point[]) is accepted for 4th and higher order curves"
          );
        s = !0;
      }
    } else if (o !== 6 && o !== 8 && o !== 9 && o !== 12 && arguments.length !== 1)
      throw new Error(
        "Only new Bezier(point[]) is accepted for 4th and higher order curves"
      );
    const r = this._3d = !s && (o === 9 || o === 12) || n && n[0] && typeof n[0].z < "u", u = this.points = [];
    for (let p = 0, g = r ? 3 : 2; p < o; p += g) {
      var f = {
        x: e[p],
        y: e[p + 1]
      };
      r && (f.z = e[p + 2]), u.push(f);
    }
    const a = this.order = u.length - 1, y = this.dims = ["x", "y"];
    r && y.push("z"), this.dimlen = y.length;
    const l = h.align(u, { p1: u[0], p2: u[a] }), x = h.dist(u[0], u[a]);
    this._linear = l.reduce((p, g) => p + L(g.y), 0) < x / 50, this._lut = [], this._t1 = 0, this._t2 = 1, this.update();
  }
  static quadraticFromPoints(n, e, i, s) {
    if (typeof s > "u" && (s = 0.5), s === 0)
      return new v(e, e, i);
    if (s === 1)
      return new v(n, e, e);
    const o = v.getABC(2, n, e, i, s);
    return new v(n, o.A, i);
  }
  static cubicFromPoints(n, e, i, s, o) {
    typeof s > "u" && (s = 0.5);
    const r = v.getABC(3, n, e, i, s);
    typeof o > "u" && (o = h.dist(e, r.C));
    const u = o * (1 - s) / s, f = h.dist(n, i), a = (i.x - n.x) / f, y = (i.y - n.y) / f, l = o * a, x = o * y, p = u * a, g = u * y, _ = { x: e.x - l, y: e.y - x }, O = { x: e.x + p, y: e.y + g }, E = r.A, M = { x: E.x + (_.x - E.x) / (1 - s), y: E.y + (_.y - E.y) / (1 - s) }, w = { x: E.x + (O.x - E.x) / s, y: E.y + (O.y - E.y) / s }, S = { x: n.x + (M.x - n.x) / s, y: n.y + (M.y - n.y) / s }, m = {
      x: i.x + (w.x - i.x) / (1 - s),
      y: i.y + (w.y - i.y) / (1 - s)
    };
    return new v(n, S, m, i);
  }
  static getUtils() {
    return h;
  }
  getUtils() {
    return v.getUtils();
  }
  static get PolyBezier() {
    return G;
  }
  valueOf() {
    return this.toString();
  }
  toString() {
    return h.pointsToString(this.points);
  }
  toSVG() {
    if (this._3d)
      return !1;
    const n = this.points, e = n[0].x, i = n[0].y, s = ["M", e, i, this.order === 2 ? "Q" : "C"];
    for (let o = 1, r = n.length; o < r; o++)
      s.push(n[o].x), s.push(n[o].y);
    return s.join(" ");
  }
  setRatios(n) {
    if (n.length !== this.points.length)
      throw new Error("incorrect number of ratio values");
    this.ratios = n, this._lut = [];
  }
  verify() {
    const n = this.coordDigest();
    n !== this._print && (this._print = n, this.update());
  }
  coordDigest() {
    return this.points.map(function(n, e) {
      return "" + e + n.x + n.y + (n.z ? n.z : 0);
    }).join("");
  }
  update() {
    this._lut = [], this.dpoints = h.derive(this.points, this._3d), this.computedirection();
  }
  computedirection() {
    const n = this.points, e = h.angle(n[0], n[this.order], n[1]);
    this.clockwise = e > 0;
  }
  length() {
    return h.length(this.derivative.bind(this));
  }
  static getABC(n = 2, e, i, s, o = 0.5) {
    const r = h.projectionratio(o, n), u = 1 - r, f = {
      x: r * e.x + u * s.x,
      y: r * e.y + u * s.y
    }, a = h.abcratio(o, n);
    return { A: {
      x: i.x + (i.x - f.x) / a,
      y: i.y + (i.y - f.y) / a
    }, B: i, C: f, S: e, E: s };
  }
  getABC(n, e) {
    e = e || this.get(n);
    let i = this.points[0], s = this.points[this.order];
    return v.getABC(this.order, i, e, s, n);
  }
  getLUT(n) {
    if (this.verify(), n = n || 100, this._lut.length === n)
      return this._lut;
    this._lut = [], n++, this._lut = [];
    for (let e = 0, i, s; e < n; e++)
      s = e / (n - 1), i = this.compute(s), i.t = s, this._lut.push(i);
    return this._lut;
  }
  on(n, e) {
    e = e || 5;
    const i = this.getLUT(), s = [];
    for (let o = 0, r, u = 0; o < i.length; o++)
      r = i[o], h.dist(r, n) < e && (s.push(r), u += o / i.length);
    return s.length ? t /= s.length : !1;
  }
  project(n) {
    const e = this.getLUT(), i = e.length - 1, s = h.closest(e, n), o = s.mpos, r = (o - 1) / i, u = (o + 1) / i, f = 0.1 / i;
    let a = s.mdist, y = r, l = y, x;
    a += 1;
    for (let p; y < u + f; y += f)
      x = this.compute(y), p = h.dist(n, x), p < a && (a = p, l = y);
    return l = l < 0 ? 0 : l > 1 ? 1 : l, x = this.compute(l), x.t = l, x.d = a, x;
  }
  get(n) {
    return this.compute(n);
  }
  point(n) {
    return this.points[n];
  }
  compute(n) {
    return this.ratios ? h.computeWithRatios(n, this.points, this.ratios, this._3d) : h.compute(n, this.points, this._3d, this.ratios);
  }
  raise() {
    const n = this.points, e = [n[0]], i = n.length;
    for (let s = 1, o, r; s < i; s++)
      o = n[s], r = n[s - 1], e[s] = {
        x: (i - s) / i * o.x + s / i * r.x,
        y: (i - s) / i * o.y + s / i * r.y
      };
    return e[i] = n[i - 1], new v(e);
  }
  derivative(n) {
    return h.compute(n, this.dpoints[0], this._3d);
  }
  dderivative(n) {
    return h.compute(n, this.dpoints[1], this._3d);
  }
  align() {
    let n = this.points;
    return new v(h.align(n, { p1: n[0], p2: n[n.length - 1] }));
  }
  curvature(n) {
    return h.curvature(n, this.dpoints[0], this.dpoints[1], this._3d);
  }
  inflections() {
    return h.inflections(this.points);
  }
  normal(n) {
    return this._3d ? this.__normal3(n) : this.__normal2(n);
  }
  __normal2(n) {
    const e = this.derivative(n), i = D(e.x * e.x + e.y * e.y);
    return { x: -e.y / i, y: e.x / i };
  }
  __normal3(n) {
    const e = this.derivative(n), i = this.derivative(n + 0.01), s = D(e.x * e.x + e.y * e.y + e.z * e.z), o = D(i.x * i.x + i.y * i.y + i.z * i.z);
    e.x /= s, e.y /= s, e.z /= s, i.x /= o, i.y /= o, i.z /= o;
    const r = {
      x: i.y * e.z - i.z * e.y,
      y: i.z * e.x - i.x * e.z,
      z: i.x * e.y - i.y * e.x
    }, u = D(r.x * r.x + r.y * r.y + r.z * r.z);
    r.x /= u, r.y /= u, r.z /= u;
    const f = [
      r.x * r.x,
      r.x * r.y - r.z,
      r.x * r.z + r.y,
      r.x * r.y + r.z,
      r.y * r.y,
      r.y * r.z - r.x,
      r.x * r.z - r.y,
      r.y * r.z + r.x,
      r.z * r.z
    ];
    return {
      x: f[0] * e.x + f[1] * e.y + f[2] * e.z,
      y: f[3] * e.x + f[4] * e.y + f[5] * e.z,
      z: f[6] * e.x + f[7] * e.y + f[8] * e.z
    };
  }
  hull(n) {
    let e = this.points, i = [], s = [], o = 0;
    for (s[o++] = e[0], s[o++] = e[1], s[o++] = e[2], this.order === 3 && (s[o++] = e[3]); e.length > 1; ) {
      i = [];
      for (let r = 0, u, f = e.length - 1; r < f; r++)
        u = h.lerp(n, e[r], e[r + 1]), s[o++] = u, i.push(u);
      e = i;
    }
    return s;
  }
  split(n, e) {
    if (n === 0 && e)
      return this.split(e).left;
    if (e === 1)
      return this.split(n).right;
    const i = this.hull(n), s = {
      left: this.order === 2 ? new v([i[0], i[3], i[5]]) : new v([i[0], i[4], i[7], i[9]]),
      right: this.order === 2 ? new v([i[5], i[4], i[2]]) : new v([i[9], i[8], i[6], i[3]]),
      span: i
    };
    return s.left._t1 = h.map(0, 0, 1, this._t1, this._t2), s.left._t2 = h.map(n, 0, 1, this._t1, this._t2), s.right._t1 = h.map(n, 0, 1, this._t1, this._t2), s.right._t2 = h.map(1, 0, 1, this._t1, this._t2), e ? (e = h.map(e, n, 1, 0, 1), s.right.split(e).left) : s;
  }
  extrema() {
    const n = {};
    let e = [];
    return this.dims.forEach(
      function(i) {
        let s = function(r) {
          return r[i];
        }, o = this.dpoints[0].map(s);
        n[i] = h.droots(o), this.order === 3 && (o = this.dpoints[1].map(s), n[i] = n[i].concat(h.droots(o))), n[i] = n[i].filter(function(r) {
          return r >= 0 && r <= 1;
        }), e = e.concat(n[i].sort(h.numberSort));
      }.bind(this)
    ), n.values = e.sort(h.numberSort).filter(function(i, s) {
      return e.indexOf(i) === s;
    }), n;
  }
  bbox() {
    const n = this.extrema(), e = {};
    return this.dims.forEach(
      function(i) {
        e[i] = h.getminmax(this, i, n[i]);
      }.bind(this)
    ), e;
  }
  overlaps(n) {
    const e = this.bbox(), i = n.bbox();
    return h.bboxoverlap(e, i);
  }
  offset(n, e) {
    if (typeof e < "u") {
      const i = this.get(n), s = this.normal(n), o = {
        c: i,
        n: s,
        x: i.x + s.x * e,
        y: i.y + s.y * e
      };
      return this._3d && (o.z = i.z + s.z * e), o;
    }
    if (this._linear) {
      const i = this.normal(0), s = this.points.map(function(o) {
        const r = {
          x: o.x + n * i.x,
          y: o.y + n * i.y
        };
        return o.z && i.z && (r.z = o.z + n * i.z), r;
      });
      return [new v(s)];
    }
    return this.reduce().map(function(i) {
      return i._linear ? i.offset(n)[0] : i.scale(n);
    });
  }
  simple() {
    if (this.order === 3) {
      const s = h.angle(this.points[0], this.points[3], this.points[1]), o = h.angle(this.points[0], this.points[3], this.points[2]);
      if (s > 0 && o < 0 || s < 0 && o > 0)
        return !1;
    }
    const n = this.normal(0), e = this.normal(1);
    let i = n.x * e.x + n.y * e.y;
    return this._3d && (i += n.z * e.z), L(it(i)) < rt / 3;
  }
  reduce() {
    let n, e = 0, i = 0, s = 0.01, o, r = [], u = [], f = this.extrema().values;
    for (f.indexOf(0) === -1 && (f = [0].concat(f)), f.indexOf(1) === -1 && f.push(1), e = f[0], n = 1; n < f.length; n++)
      i = f[n], o = this.split(e, i), o._t1 = e, o._t2 = i, r.push(o), e = i;
    return r.forEach(function(a) {
      for (e = 0, i = 0; i <= 1; )
        for (i = e + s; i <= 1 + s; i += s)
          if (o = a.split(e, i), !o.simple()) {
            if (i -= s, L(e - i) < s)
              return [];
            o = a.split(e, i), o._t1 = h.map(e, 0, 1, a._t1, a._t2), o._t2 = h.map(i, 0, 1, a._t1, a._t2), u.push(o), e = i;
            break;
          }
      e < 1 && (o = a.split(e, 1), o._t1 = h.map(e, 0, 1, a._t1, a._t2), o._t2 = a._t2, u.push(o));
    }), u;
  }
  translate(n, e, i) {
    i = typeof i == "number" ? i : e;
    const s = this.order;
    let o = this.points.map((r, u) => (1 - u / s) * e + u / s * i);
    return new v(
      this.points.map((r, u) => ({
        x: r.x + n.x * o[u],
        y: r.y + n.y * o[u]
      }))
    );
  }
  scale(n) {
    const e = this.order;
    let i = !1;
    if (typeof n == "function" && (i = n), i && e === 2)
      return this.raise().scale(i);
    const s = this.clockwise, o = this.points;
    if (this._linear)
      return this.translate(
        this.normal(0),
        i ? i(0) : n,
        i ? i(1) : n
      );
    const r = i ? i(0) : n, u = i ? i(1) : n, f = [this.offset(0, 10), this.offset(1, 10)], a = [], y = h.lli4(f[0], f[0].c, f[1], f[1].c);
    if (!y)
      throw new Error("cannot scale this curve. Try reducing it first.");
    return [0, 1].forEach(function(l) {
      const x = a[l * e] = h.copy(o[l * e]);
      x.x += (l ? u : r) * f[l].n.x, x.y += (l ? u : r) * f[l].n.y;
    }), i ? ([0, 1].forEach(function(l) {
      if (!(e === 2 && l)) {
        var x = o[l + 1], p = {
          x: x.x - y.x,
          y: x.y - y.y
        }, g = i ? i((l + 1) / e) : n;
        i && !s && (g = -g);
        var _ = D(p.x * p.x + p.y * p.y);
        p.x /= _, p.y /= _, a[l + 1] = {
          x: x.x + g * p.x,
          y: x.y + g * p.y
        };
      }
    }), new v(a)) : ([0, 1].forEach((l) => {
      if (e === 2 && l)
        return;
      const x = a[l * e], p = this.derivative(l), g = { x: x.x + p.x, y: x.y + p.y };
      a[l + 1] = h.lli4(x, g, y, o[l + 1]);
    }), new v(a));
  }
  outline(n, e, i, s) {
    if (e = e === void 0 ? n : e, this._linear) {
      const m = this.normal(0), q = this.points[0], d = this.points[this.points.length - 1];
      let z, A, k;
      i === void 0 && (i = n, s = e), z = { x: q.x + m.x * n, y: q.y + m.y * n }, k = { x: d.x + m.x * i, y: d.y + m.y * i }, A = { x: (z.x + k.x) / 2, y: (z.y + k.y) / 2 };
      const j = [z, A, k];
      z = { x: q.x - m.x * e, y: q.y - m.y * e }, k = { x: d.x - m.x * s, y: d.y - m.y * s }, A = { x: (z.x + k.x) / 2, y: (z.y + k.y) / 2 };
      const C = [k, A, z], F = h.makeline(C[2], j[0]), b = h.makeline(j[2], C[0]), H = [F, new v(j), b, new v(C)];
      return new G(H);
    }
    const o = this.reduce(), r = o.length, u = [];
    let f = [], a, y = 0, l = this.length();
    const x = typeof i < "u" && typeof s < "u";
    function p(m, q, d, z, A) {
      return function(k) {
        const j = z / d, C = (z + A) / d, F = q - m;
        return h.map(k, 0, 1, m + j * F, m + C * F);
      };
    }
    o.forEach(function(m) {
      const q = m.length();
      x ? (u.push(
        m.scale(p(n, i, l, y, q))
      ), f.push(
        m.scale(p(-e, -s, l, y, q))
      )) : (u.push(m.scale(n)), f.push(m.scale(-e))), y += q;
    }), f = f.map(function(m) {
      return a = m.points, a[3] ? m.points = [a[3], a[2], a[1], a[0]] : m.points = [a[2], a[1], a[0]], m;
    }).reverse();
    const g = u[0].points[0], _ = u[r - 1].points[u[r - 1].points.length - 1], O = f[r - 1].points[f[r - 1].points.length - 1], E = f[0].points[0], M = h.makeline(O, g), w = h.makeline(_, E), S = [M].concat(u).concat([w]).concat(f);
    return new G(S);
  }
  outlineshapes(n, e, i) {
    e = e || n;
    const s = this.outline(n, e).curves, o = [];
    for (let r = 1, u = s.length; r < u / 2; r++) {
      const f = h.makeshape(
        s[r],
        s[u - r],
        i
      );
      f.startcap.virtual = r > 1, f.endcap.virtual = r < u / 2 - 1, o.push(f);
    }
    return o;
  }
  intersects(n, e) {
    return n ? n.p1 && n.p2 ? this.lineIntersects(n) : (n instanceof v && (n = n.reduce()), this.curveintersects(
      this.reduce(),
      n,
      e
    )) : this.selfintersects(e);
  }
  lineIntersects(n) {
    const e = Q(n.p1.x, n.p2.x), i = Q(n.p1.y, n.p2.y), s = V(n.p1.x, n.p2.x), o = V(n.p1.y, n.p2.y);
    return h.roots(this.points, n).filter((r) => {
      var u = this.get(r);
      return h.between(u.x, e, s) && h.between(u.y, i, o);
    });
  }
  selfintersects(n) {
    const e = this.reduce(), i = e.length - 2, s = [];
    for (let o = 0, r, u, f; o < i; o++)
      u = e.slice(o, o + 1), f = e.slice(o + 2), r = this.curveintersects(u, f, n), s.push(...r);
    return s;
  }
  curveintersects(n, e, i) {
    const s = [];
    n.forEach(function(r) {
      e.forEach(function(u) {
        r.overlaps(u) && s.push({ left: r, right: u });
      });
    });
    let o = [];
    return s.forEach(function(r) {
      const u = h.pairiteration(
        r.left,
        r.right,
        i
      );
      u.length > 0 && (o = o.concat(u));
    }), o;
  }
  arcs(n) {
    return n = n || 0.5, this._iterate(n, []);
  }
  _error(n, e, i, s) {
    const o = (s - i) / 4, r = this.get(i + o), u = this.get(s - o), f = h.dist(n, e), a = h.dist(n, r), y = h.dist(n, u);
    return L(a - f) + L(y - f);
  }
  _iterate(n, e) {
    let i = 0, s = 1, o;
    do {
      o = 0, s = 1;
      let r = this.get(i), u, f, a, y, l = !1, x = !1, p, g = s, _ = 1;
      do
        if (x = l, y = a, g = (i + s) / 2, u = this.get(g), f = this.get(s), a = h.getccenter(r, u, f), a.interval = {
          start: i,
          end: s
        }, l = this._error(a, r, i, s) <= n, p = x && !l, p || (_ = s), l) {
          if (s >= 1) {
            if (a.interval.end = _ = 1, y = a, s > 1) {
              let E = {
                x: a.x + a.r * nt(a.e),
                y: a.y + a.r * et(a.e)
              };
              a.e += h.angle({ x: a.x, y: a.y }, E, this.get(1));
            }
            break;
          }
          s = s + (s - i) / 2;
        } else
          s = g;
      while (!p && o++ < 100);
      if (o >= 100)
        break;
      y = y || a, e.push(y), i = _;
    } while (s < 1);
    return e;
  }
}
export {
  v as Bezier
};
//# sourceMappingURL=bezier.js.map
