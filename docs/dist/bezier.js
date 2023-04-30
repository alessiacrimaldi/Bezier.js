const { abs: b, cos: S, sin: U, acos: K, atan2: J, sqrt: N, pow: M } = Math;
function $(c) {
  return c < 0 ? -M(-c, 1 / 3) : M(c, 1 / 3);
}
const Z = Math.PI, X = 2 * Z, F = Z / 2, B = 1e-6, W = Number.MAX_SAFE_INTEGER || 9007199254740991, Y = Number.MIN_SAFE_INTEGER || -9007199254740991, tt = { x: 0, y: 0, z: 0 }, h = {
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
    return typeof e.z < "u" && (i += e.z * e.z), N(i);
  },
  compute: function(c, n, e) {
    if (c === 0)
      return n[0].t = 0, n[0];
    const i = n.length - 1;
    if (c === 1)
      return n[i].t = 1, n[i];
    const r = 1 - c;
    let o = n;
    if (i === 0)
      return n[0].t = c, n[0];
    if (i === 1) {
      const u = {
        x: r * o[0].x + c * o[1].x,
        y: r * o[0].y + c * o[1].y,
        t: c
      };
      return e && (u.z = r * o[0].z + c * o[1].z), u;
    }
    if (i < 4) {
      let u = r * r, f = c * c, a, x, l, y = 0;
      i === 2 ? (o = [o[0], o[1], o[2], tt], a = u, x = r * c * 2, l = f) : i === 3 && (a = u * r, x = u * c * 3, l = r * f * 3, y = c * f);
      const p = {
        x: a * o[0].x + x * o[1].x + l * o[2].x + y * o[3].x,
        y: a * o[0].y + x * o[1].y + l * o[2].y + y * o[3].y,
        t: c
      };
      return e && (p.z = a * o[0].z + x * o[1].z + l * o[2].z + y * o[3].z), p;
    }
    const s = JSON.parse(JSON.stringify(n));
    for (; s.length > 1; ) {
      for (let u = 0; u < s.length - 1; u++)
        s[u] = {
          x: s[u].x + (s[u + 1].x - s[u].x) * c,
          y: s[u].y + (s[u + 1].y - s[u].y) * c
        }, typeof s[u].z < "u" && (s[u] = s[u].z + (s[u + 1].z - s[u].z) * c);
      s.splice(s.length - 1, 1);
    }
    return s[0].t = c, s[0];
  },
  computeWithRatios: function(c, n, e, i) {
    const r = 1 - c, o = e, s = n;
    let u = o[0], f = o[1], a = o[2], x = o[3], l;
    if (u *= r, f *= c, s.length === 2)
      return l = u + f, {
        x: (u * s[0].x + f * s[1].x) / l,
        y: (u * s[0].y + f * s[1].y) / l,
        z: i ? (u * s[0].z + f * s[1].z) / l : !1,
        t: c
      };
    if (u *= r, f *= 2 * r, a *= c * c, s.length === 3)
      return l = u + f + a, {
        x: (u * s[0].x + f * s[1].x + a * s[2].x) / l,
        y: (u * s[0].y + f * s[1].y + a * s[2].y) / l,
        z: i ? (u * s[0].z + f * s[1].z + a * s[2].z) / l : !1,
        t: c
      };
    if (u *= r, f *= 1.5 * r, a *= 3 * r, x *= c * c * c, s.length === 4)
      return l = u + f + a + x, {
        x: (u * s[0].x + f * s[1].x + a * s[2].x + x * s[3].x) / l,
        y: (u * s[0].y + f * s[1].y + a * s[2].y + x * s[3].y) / l,
        z: i ? (u * s[0].z + f * s[1].z + a * s[2].z + x * s[3].z) / l : !1,
        t: c
      };
  },
  derive: function(c, n) {
    const e = [];
    for (let i = c, r = i.length, o = r - 1; r > 1; r--, o--) {
      const s = [];
      for (let u = 0, f; u < o; u++)
        f = {
          x: o * (i[u + 1].x - i[u].x),
          y: o * (i[u + 1].y - i[u].y)
        }, n && (f.z = o * (i[u + 1].z - i[u].z)), s.push(f);
      e.push(s), i = s;
    }
    return e;
  },
  between: function(c, n, e) {
    return n <= c && c <= e || h.approximately(c, n) || h.approximately(c, e);
  },
  approximately: function(c, n, e) {
    return b(c - n) <= (e || B);
  },
  length: function(c) {
    const e = h.Tvalues.length;
    let i = 0;
    for (let r = 0, o; r < e; r++)
      o = 0.5 * h.Tvalues[r] + 0.5, i += h.Cvalues[r] * h.arcfn(o, c);
    return 0.5 * i;
  },
  map: function(c, n, e, i, r) {
    const o = e - n, s = r - i, u = c - n, f = u / o;
    return i + s * f;
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
    const i = n.x - c.x, r = n.y - c.y, o = e.x - c.x, s = e.y - c.y, u = i * s - r * o, f = i * o + r * s;
    return J(u, f);
  },
  // round as string, to avoid rounding errors
  round: function(c, n) {
    const e = "" + c, i = e.indexOf(".");
    return parseFloat(e.substring(0, i + 1 + n));
  },
  dist: function(c, n) {
    const e = c.x - n.x, i = c.y - n.y;
    return N(e * e + i * i);
  },
  closest: function(c, n) {
    let e = M(2, 63), i, r;
    return c.forEach(function(o, s) {
      r = h.dist(n, o), r < e && (e = r, i = s);
    }), { mdist: e, mpos: i };
  },
  abcratio: function(c, n) {
    if (n !== 2 && n !== 3)
      return !1;
    if (typeof c > "u")
      c = 0.5;
    else if (c === 0 || c === 1)
      return c;
    const e = M(c, n) + M(1 - c, n), i = e - 1;
    return b(i / e);
  },
  projectionratio: function(c, n) {
    if (n !== 2 && n !== 3)
      return !1;
    if (typeof c > "u")
      c = 0.5;
    else if (c === 0 || c === 1)
      return c;
    const e = M(1 - c, n), i = M(c, n) + e;
    return e / i;
  },
  lli8: function(c, n, e, i, r, o, s, u) {
    const f = (c * i - n * e) * (r - s) - (c - e) * (r * u - o * s), a = (c * i - n * e) * (o - u) - (n - i) * (r * u - o * s), x = (c - e) * (o - u) - (n - i) * (r - s);
    return x == 0 ? !1 : { x: f / x, y: a / x };
  },
  lli4: function(c, n, e, i) {
    const r = c.x, o = c.y, s = n.x, u = n.y, f = e.x, a = e.y, x = i.x, l = i.y;
    return h.lli8(r, o, s, u, f, a, x, l);
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
    let n = W, e = W, i = Y, r = Y;
    return c.forEach(function(o) {
      const s = o.bbox();
      n > s.x.min && (n = s.x.min), e > s.y.min && (e = s.y.min), i < s.x.max && (i = s.x.max), r < s.y.max && (r = s.y.max);
    }), {
      x: { min: n, mid: (n + i) / 2, max: i, size: i - n },
      y: { min: e, mid: (e + r) / 2, max: r, size: r - e }
    };
  },
  shapeintersections: function(c, n, e, i, r) {
    if (!h.bboxoverlap(n, i))
      return [];
    const o = [], s = [c.startcap, c.forward, c.back, c.endcap], u = [e.startcap, e.forward, e.back, e.endcap];
    return s.forEach(function(f) {
      f.virtual || u.forEach(function(a) {
        if (a.virtual)
          return;
        const x = f.intersects(a, r);
        x.length > 0 && (x.c1 = f, x.c2 = a, x.s1 = c, x.s2 = e, o.push(x));
      });
    }), o;
  },
  makeshape: function(c, n, e) {
    const i = n.points.length, r = c.points.length, o = h.makeline(n.points[i - 1], c.points[0]), s = h.makeline(c.points[r - 1], n.points[0]), u = {
      startcap: o,
      forward: c,
      back: n,
      endcap: s,
      bbox: h.findbbox([o, c, n, s])
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
    let i = W, r = Y, o, s;
    e.indexOf(0) === -1 && (e = [0].concat(e)), e.indexOf(1) === -1 && e.push(1);
    for (let u = 0, f = e.length; u < f; u++)
      o = e[u], s = c.get(o), s[n] < i && (i = s[n]), s[n] > r && (r = s[n]);
    return { min: i, mid: (i + r) / 2, max: r, size: r - i };
  },
  align: function(c, n) {
    const e = n.p1.x, i = n.p1.y, r = -J(n.p2.y - i, n.p2.x - e), o = function(s) {
      return {
        x: (s.x - e) * S(r) - (s.y - i) * U(r),
        y: (s.x - e) * U(r) + (s.y - i) * S(r)
      };
    };
    return c.map(o);
  },
  roots: function(c, n) {
    n = n || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
    const e = c.length - 1, i = h.align(c, n), r = function(d) {
      return 0 <= d && d <= 1;
    };
    if (e === 2) {
      const d = i[0].y, z = i[1].y, q = i[2].y, P = d - 2 * z + q;
      if (P !== 0) {
        const I = -N(z * z - d * q), A = -d + z, j = -(I + A) / P, R = -(-I + A) / P;
        return [j, R].filter(r);
      } else if (z !== q && P === 0)
        return [(2 * z - q) / (2 * z - 2 * q)].filter(r);
      return [];
    }
    const o = i[0].y, s = i[1].y, u = i[2].y, f = i[3].y;
    let a = -o + 3 * s - 3 * u + f, x = 3 * o - 6 * s + 3 * u, l = -3 * o + 3 * s, y = o;
    if (h.approximately(a, 0)) {
      if (h.approximately(x, 0))
        return h.approximately(l, 0) ? [] : [-y / l].filter(r);
      const d = N(l * l - 4 * x * y), z = 2 * x;
      return [(d - l) / z, (-l - d) / z].filter(r);
    }
    x /= a, l /= a, y /= a;
    const p = (3 * l - x * x) / 3, g = p / 3, _ = (2 * x * x * x - 9 * x * l + 27 * y) / 27, E = _ / 2, k = E * E + g * g * g;
    let O, w, T, m, C;
    if (k < 0) {
      const d = -p / 3, z = d * d * d, q = N(z), P = -_ / (2 * q), I = P < -1 ? -1 : P > 1 ? 1 : P, A = K(I), j = $(q), R = 2 * j;
      return T = R * S(A / 3) - x / 3, m = R * S((A + X) / 3) - x / 3, C = R * S((A + 2 * X) / 3) - x / 3, [T, m, C].filter(r);
    } else {
      if (k === 0)
        return O = E < 0 ? $(-E) : -$(E), T = 2 * O - x / 3, m = -O - x / 3, [T, m].filter(r);
      {
        const d = N(k);
        return O = $(-E + d), w = $(E + d), [O - w - x / 3].filter(r);
      }
    }
  },
  droots: function(c) {
    if (c.length === 3) {
      const n = c[0], e = c[1], i = c[2], r = n - 2 * e + i;
      if (r !== 0) {
        const o = -N(e * e - n * i), s = -n + e, u = -(o + s) / r, f = -(-o + s) / r;
        return [u, f];
      } else if (e !== i && r === 0)
        return [(2 * e - i) / (2 * (e - i))];
      return [];
    }
    if (c.length === 2) {
      const n = c[0], e = c[1];
      return n !== e ? [n / (n - e)] : [];
    }
    return [];
  },
  curvature: function(c, n, e, i, r) {
    let o, s, u, f, a = 0, x = 0;
    const l = h.compute(c, n), y = h.compute(c, e), p = l.x * l.x + l.y * l.y;
    if (i ? (o = N(
      M(l.y * y.z - y.y * l.z, 2) + M(l.z * y.x - y.z * l.x, 2) + M(l.x * y.y - y.x * l.y, 2)
    ), s = M(p + l.z * l.z, 3 / 2)) : (o = l.x * y.y - l.y * y.x, s = M(p, 3 / 2)), o === 0 || s === 0)
      return { k: 0, r: 0 };
    if (a = o / s, x = s / o, !r) {
      const g = h.curvature(c - 1e-3, n, e, i, !0).k, _ = h.curvature(c + 1e-3, n, e, i, !0).k;
      f = (_ - a + (a - g)) / 2, u = (b(_ - a) + b(a - g)) / 2;
    }
    return { k: a, r: x, dk: f, adk: u };
  },
  inflections: function(c) {
    if (c.length < 4)
      return [];
    const n = h.align(c, { p1: c[0], p2: c.slice(-1)[0] }), e = n[2].x * n[1].y, i = n[3].x * n[1].y, r = n[1].x * n[2].y, o = n[3].x * n[2].y, s = 18 * (-3 * e + 2 * i + 3 * r - o), u = 18 * (3 * e - i - 3 * r), f = 18 * (r - e);
    if (h.approximately(s, 0)) {
      if (!h.approximately(u, 0)) {
        let y = -f / u;
        if (0 <= y && y <= 1)
          return [y];
      }
      return [];
    }
    const a = u * u - 4 * s * f, x = Math.sqrt(a), l = 2 * s;
    return h.approximately(l, 0) ? [] : [(x - u) / l, -(u + x) / l].filter(function(y) {
      return 0 <= y && y <= 1;
    });
  },
  bboxoverlap: function(c, n) {
    const e = ["x", "y"], i = e.length;
    for (let r = 0, o, s, u, f; r < i; r++)
      if (o = e[r], s = c[o].mid, u = n[o].mid, f = (c[o].size + n[o].size) / 2, b(s - u) >= f)
        return !1;
    return !0;
  },
  expandbox: function(c, n) {
    n.x.min < c.x.min && (c.x.min = n.x.min), n.y.min < c.y.min && (c.y.min = n.y.min), n.z && n.z.min < c.z.min && (c.z.min = n.z.min), n.x.max > c.x.max && (c.x.max = n.x.max), n.y.max > c.y.max && (c.y.max = n.y.max), n.z && n.z.max > c.z.max && (c.z.max = n.z.max), c.x.mid = (c.x.min + c.x.max) / 2, c.y.mid = (c.y.min + c.y.max) / 2, c.z && (c.z.mid = (c.z.min + c.z.max) / 2), c.x.size = c.x.max - c.x.min, c.y.size = c.y.max - c.y.min, c.z && (c.z.size = c.z.max - c.z.min);
  },
  pairiteration: function(c, n, e) {
    const i = c.bbox(), r = n.bbox(), o = 1e5, s = e || 0.5;
    if (i.x.size + i.y.size < s && r.x.size + r.y.size < s)
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
    let x = [];
    return a.length === 0 || (a.forEach(function(l) {
      x = x.concat(
        h.pairiteration(l.left, l.right, s)
      );
    }), x = x.filter(function(l, y) {
      return x.indexOf(l) === y;
    })), x;
  },
  getccenter: function(c, n, e) {
    const i = n.x - c.x, r = n.y - c.y, o = e.x - n.x, s = e.y - n.y, u = i * S(F) - r * U(F), f = i * U(F) + r * S(F), a = o * S(F) - s * U(F), x = o * U(F) + s * S(F), l = (c.x + n.x) / 2, y = (c.y + n.y) / 2, p = (n.x + e.x) / 2, g = (n.y + e.y) / 2, _ = l + u, E = y + f, k = p + a, O = g + x, w = h.lli8(l, y, _, E, p, g, k, O), T = h.dist(w, c);
    let m = J(c.y - w.y, c.x - w.x), C = J(n.y - w.y, n.x - w.x), d = J(e.y - w.y, e.x - w.x), z;
    return m < d ? ((m > C || C > d) && (m += X), m > d && (z = d, d = m, m = z)) : d < C && C < m ? (z = d, d = m, m = z) : d += X, w.s = m, w.e = d, w.r = T, w;
  },
  numberSort: function(c, n) {
    return c - n;
  },
  midpoint: function(c, n) {
    const e = (c.x + n.x) / 2, i = (c.y + n.y) / 2;
    return { x: e, y: i };
  },
  checkcoincidation: function(c, n) {
    return c.x == n.x && c.y == n.y;
  }
};
class G {
  constructor(n) {
    this.curves = [], this._3d = !1, n && (this.curves = n, this._3d = this.curves[0]._3d), this._closed = h.checkcoincidation(this.lastPathPoint(), this.firstPathPoint()), this.setJoinC_0();
  }
  curve(n) {
    return this.curves[n];
  }
  firstPathCurve() {
    return this.curves[0];
  }
  firstPathPoint() {
    return this.firstPathCurve().points[0];
  }
  lastPathCurve() {
    return this.curves[this.curves.length - 1];
  }
  lastPathPoint() {
    return this.lastPathCurve().lastPoint();
  }
  setJoinC_0() {
    for (let n = 0; n < this.curves.length - 1; n++) {
      const e = this.curve(n), i = this.curve(n + 1), r = e.lastPoint(), o = i.points[0];
      if (!h.checkcoincidation(r, o)) {
        const s = h.midpoint(r, o);
        e.points[e.lastPointIdx()] = s, i.points[0] = s;
      }
    }
  }
  closePath() {
    const n = this.lastPathPoint(), e = this.firstPathPoint();
    if (!h.checkcoincidation(n, e) && !this._closed) {
      const i = this.firstPathCurve(), r = this.lastPathCurve(), o = h.midpoint(n, e);
      i.points[0] = o, r.points[r.lastPointIdx()] = o, this._closed = !0;
    } else
      return;
  }
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
    let r = !1;
    const o = e.length;
    if (i) {
      if (i > 4) {
        if (arguments.length !== 1)
          throw new Error(
            "Only new Bezier(point[]) is accepted for 4th and higher order curves"
          );
        r = !0;
      }
    } else if (o !== 6 && o !== 8 && o !== 9 && o !== 12 && arguments.length !== 1)
      throw new Error(
        "Only new Bezier(point[]) is accepted for 4th and higher order curves"
      );
    const s = this._3d = !r && (o === 9 || o === 12) || n && n[0] && typeof n[0].z < "u", u = this.points = [];
    for (let p = 0, g = s ? 3 : 2; p < o; p += g) {
      var f = {
        x: e[p],
        y: e[p + 1]
      };
      s && (f.z = e[p + 2]), u.push(f);
    }
    const a = this.order = u.length - 1, x = this.dims = ["x", "y"];
    s && x.push("z"), this.dimlen = x.length;
    const l = h.align(u, { p1: u[0], p2: u[a] }), y = h.dist(u[0], u[a]);
    this._linear = l.reduce((p, g) => p + L(g.y), 0) < y / 50, this._lut = [], this._t1 = 0, this._t2 = 1, this.update();
  }
  static quadraticFromPoints(n, e, i, r) {
    if (typeof r > "u" && (r = 0.5), r === 0)
      return new v(e, e, i);
    if (r === 1)
      return new v(n, e, e);
    const o = v.getABC(2, n, e, i, r);
    return new v(n, o.A, i);
  }
  static cubicFromPoints(n, e, i, r, o) {
    typeof r > "u" && (r = 0.5);
    const s = v.getABC(3, n, e, i, r);
    typeof o > "u" && (o = h.dist(e, s.C));
    const u = o * (1 - r) / r, f = h.dist(n, i), a = (i.x - n.x) / f, x = (i.y - n.y) / f, l = o * a, y = o * x, p = u * a, g = u * x, _ = { x: e.x - l, y: e.y - y }, E = { x: e.x + p, y: e.y + g }, k = s.A, O = { x: k.x + (_.x - k.x) / (1 - r), y: k.y + (_.y - k.y) / (1 - r) }, w = { x: k.x + (E.x - k.x) / r, y: k.y + (E.y - k.y) / r }, T = { x: n.x + (O.x - n.x) / r, y: n.y + (O.y - n.y) / r }, m = {
      x: i.x + (w.x - i.x) / (1 - r),
      y: i.y + (w.y - i.y) / (1 - r)
    };
    return new v(n, T, m, i);
  }
  static getUtils() {
    return h;
  }
  getUtils() {
    return v.getUtils();
  }
  lastPointIdx() {
    return this.points.length - 1;
  }
  lastPoint() {
    return this.points[this.lastPointIdx()];
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
    const n = this.points, e = n[0].x, i = n[0].y, r = ["M", e, i, this.order === 2 ? "Q" : "C"];
    for (let o = 1, s = n.length; o < s; o++)
      r.push(n[o].x), r.push(n[o].y);
    return r.join(" ");
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
  static getABC(n = 2, e, i, r, o = 0.5) {
    const s = h.projectionratio(o, n), u = 1 - s, f = {
      x: s * e.x + u * r.x,
      y: s * e.y + u * r.y
    }, a = h.abcratio(o, n);
    return { A: {
      x: i.x + (i.x - f.x) / a,
      y: i.y + (i.y - f.y) / a
    }, B: i, C: f, S: e, E: r };
  }
  getABC(n, e) {
    e = e || this.get(n);
    let i = this.points[0], r = this.points[this.order];
    return v.getABC(this.order, i, e, r, n);
  }
  getLUT(n) {
    if (this.verify(), n = n || 100, this._lut.length === n)
      return this._lut;
    this._lut = [], n++, this._lut = [];
    for (let e = 0, i, r; e < n; e++)
      r = e / (n - 1), i = this.compute(r), i.t = r, this._lut.push(i);
    return this._lut;
  }
  on(n, e) {
    e = e || 5;
    const i = this.getLUT(), r = [];
    for (let o = 0, s, u = 0; o < i.length; o++)
      s = i[o], h.dist(s, n) < e && (r.push(s), u += o / i.length);
    return r.length ? t /= r.length : !1;
  }
  project(n) {
    const e = this.getLUT(), i = e.length - 1, r = h.closest(e, n), o = r.mpos, s = (o - 1) / i, u = (o + 1) / i, f = 0.1 / i;
    let a = r.mdist, x = s, l = x, y;
    a += 1;
    for (let p; x < u + f; x += f)
      y = this.compute(x), p = h.dist(n, y), p < a && (a = p, l = x);
    return l = l < 0 ? 0 : l > 1 ? 1 : l, y = this.compute(l), y.t = l, y.d = a, y;
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
    for (let r = 1, o, s; r < i; r++)
      o = n[r], s = n[r - 1], e[r] = {
        x: (i - r) / i * o.x + r / i * s.x,
        y: (i - r) / i * o.y + r / i * s.y
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
    const e = this.derivative(n), i = this.derivative(n + 0.01), r = D(e.x * e.x + e.y * e.y + e.z * e.z), o = D(i.x * i.x + i.y * i.y + i.z * i.z);
    e.x /= r, e.y /= r, e.z /= r, i.x /= o, i.y /= o, i.z /= o;
    const s = {
      x: i.y * e.z - i.z * e.y,
      y: i.z * e.x - i.x * e.z,
      z: i.x * e.y - i.y * e.x
    }, u = D(s.x * s.x + s.y * s.y + s.z * s.z);
    s.x /= u, s.y /= u, s.z /= u;
    const f = [
      s.x * s.x,
      s.x * s.y - s.z,
      s.x * s.z + s.y,
      s.x * s.y + s.z,
      s.y * s.y,
      s.y * s.z - s.x,
      s.x * s.z - s.y,
      s.y * s.z + s.x,
      s.z * s.z
    ];
    return {
      x: f[0] * e.x + f[1] * e.y + f[2] * e.z,
      y: f[3] * e.x + f[4] * e.y + f[5] * e.z,
      z: f[6] * e.x + f[7] * e.y + f[8] * e.z
    };
  }
  hull(n) {
    let e = this.points, i = [], r = [], o = 0;
    for (r[o++] = e[0], r[o++] = e[1], r[o++] = e[2], this.order === 3 && (r[o++] = e[3]); e.length > 1; ) {
      i = [];
      for (let s = 0, u, f = e.length - 1; s < f; s++)
        u = h.lerp(n, e[s], e[s + 1]), r[o++] = u, i.push(u);
      e = i;
    }
    return r;
  }
  split(n, e) {
    if (n === 0 && e)
      return this.split(e).left;
    if (e === 1)
      return this.split(n).right;
    const i = this.hull(n), r = {
      left: this.order === 2 ? new v([i[0], i[3], i[5]]) : new v([i[0], i[4], i[7], i[9]]),
      right: this.order === 2 ? new v([i[5], i[4], i[2]]) : new v([i[9], i[8], i[6], i[3]]),
      span: i
    };
    return r.left._t1 = h.map(0, 0, 1, this._t1, this._t2), r.left._t2 = h.map(n, 0, 1, this._t1, this._t2), r.right._t1 = h.map(n, 0, 1, this._t1, this._t2), r.right._t2 = h.map(1, 0, 1, this._t1, this._t2), e ? (e = h.map(e, n, 1, 0, 1), r.right.split(e).left) : r;
  }
  extrema() {
    const n = {};
    let e = [];
    return this.dims.forEach(
      function(i) {
        let r = function(s) {
          return s[i];
        }, o = this.dpoints[0].map(r);
        n[i] = h.droots(o), this.order === 3 && (o = this.dpoints[1].map(r), n[i] = n[i].concat(h.droots(o))), n[i] = n[i].filter(function(s) {
          return s >= 0 && s <= 1;
        }), e = e.concat(n[i].sort(h.numberSort));
      }.bind(this)
    ), n.values = e.sort(h.numberSort).filter(function(i, r) {
      return e.indexOf(i) === r;
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
      const i = this.get(n), r = this.normal(n), o = {
        c: i,
        n: r,
        x: i.x + r.x * e,
        y: i.y + r.y * e
      };
      return this._3d && (o.z = i.z + r.z * e), o;
    }
    if (this._linear) {
      const i = this.normal(0), r = this.points.map(function(o) {
        const s = {
          x: o.x + n * i.x,
          y: o.y + n * i.y
        };
        return o.z && i.z && (s.z = o.z + n * i.z), s;
      });
      return [new v(r)];
    }
    return this.reduce().map(function(i) {
      return i._linear ? i.offset(n)[0] : i.scale(n);
    });
  }
  simple() {
    if (this.order === 3) {
      const r = h.angle(this.points[0], this.points[3], this.points[1]), o = h.angle(this.points[0], this.points[3], this.points[2]);
      if (r > 0 && o < 0 || r < 0 && o > 0)
        return !1;
    }
    const n = this.normal(0), e = this.normal(1);
    let i = n.x * e.x + n.y * e.y;
    return this._3d && (i += n.z * e.z), L(it(i)) < rt / 3;
  }
  reduce() {
    let n, e = 0, i = 0, r = 0.01, o, s = [], u = [], f = this.extrema().values;
    for (f.indexOf(0) === -1 && (f = [0].concat(f)), f.indexOf(1) === -1 && f.push(1), e = f[0], n = 1; n < f.length; n++)
      i = f[n], o = this.split(e, i), o._t1 = e, o._t2 = i, s.push(o), e = i;
    return s.forEach(function(a) {
      for (e = 0, i = 0; i <= 1; )
        for (i = e + r; i <= 1 + r; i += r)
          if (o = a.split(e, i), !o.simple()) {
            if (i -= r, L(e - i) < r)
              return [];
            o = a.split(e, i), o._t1 = h.map(e, 0, 1, a._t1, a._t2), o._t2 = h.map(i, 0, 1, a._t1, a._t2), u.push(o), e = i;
            break;
          }
      e < 1 && (o = a.split(e, 1), o._t1 = h.map(e, 0, 1, a._t1, a._t2), o._t2 = a._t2, u.push(o));
    }), u;
  }
  translate(n, e, i) {
    i = typeof i == "number" ? i : e;
    const r = this.order;
    let o = this.points.map((s, u) => (1 - u / r) * e + u / r * i);
    return new v(
      this.points.map((s, u) => ({
        x: s.x + n.x * o[u],
        y: s.y + n.y * o[u]
      }))
    );
  }
  scale(n) {
    const e = this.order;
    let i = !1;
    if (typeof n == "function" && (i = n), i && e === 2)
      return this.raise().scale(i);
    const r = this.clockwise, o = this.points;
    if (this._linear)
      return this.translate(
        this.normal(0),
        i ? i(0) : n,
        i ? i(1) : n
      );
    const s = i ? i(0) : n, u = i ? i(1) : n, f = [this.offset(0, 10), this.offset(1, 10)], a = [], x = h.lli4(f[0], f[0].c, f[1], f[1].c);
    if (!x)
      throw new Error("cannot scale this curve. Try reducing it first.");
    return [0, 1].forEach(function(l) {
      const y = a[l * e] = h.copy(o[l * e]);
      y.x += (l ? u : s) * f[l].n.x, y.y += (l ? u : s) * f[l].n.y;
    }), i ? ([0, 1].forEach(function(l) {
      if (!(e === 2 && l)) {
        var y = o[l + 1], p = {
          x: y.x - x.x,
          y: y.y - x.y
        }, g = i ? i((l + 1) / e) : n;
        i && !r && (g = -g);
        var _ = D(p.x * p.x + p.y * p.y);
        p.x /= _, p.y /= _, a[l + 1] = {
          x: y.x + g * p.x,
          y: y.y + g * p.y
        };
      }
    }), new v(a)) : ([0, 1].forEach((l) => {
      if (e === 2 && l)
        return;
      const y = a[l * e], p = this.derivative(l), g = { x: y.x + p.x, y: y.y + p.y };
      a[l + 1] = h.lli4(y, g, x, o[l + 1]);
    }), new v(a));
  }
  outline(n, e, i, r) {
    if (e = e === void 0 ? n : e, this._linear) {
      const m = this.normal(0), C = this.points[0], d = this.points[this.points.length - 1];
      let z, q, P;
      i === void 0 && (i = n, r = e), z = { x: C.x + m.x * n, y: C.y + m.y * n }, P = { x: d.x + m.x * i, y: d.y + m.y * i }, q = { x: (z.x + P.x) / 2, y: (z.y + P.y) / 2 };
      const I = [z, q, P];
      z = { x: C.x - m.x * e, y: C.y - m.y * e }, P = { x: d.x - m.x * r, y: d.y - m.y * r }, q = { x: (z.x + P.x) / 2, y: (z.y + P.y) / 2 };
      const A = [P, q, z], j = h.makeline(A[2], I[0]), R = h.makeline(I[2], A[0]), H = [j, new v(I), R, new v(A)];
      return new G(H);
    }
    const o = this.reduce(), s = o.length, u = [];
    let f = [], a, x = 0, l = this.length();
    const y = typeof i < "u" && typeof r < "u";
    function p(m, C, d, z, q) {
      return function(P) {
        const I = z / d, A = (z + q) / d, j = C - m;
        return h.map(P, 0, 1, m + I * j, m + A * j);
      };
    }
    o.forEach(function(m) {
      const C = m.length();
      y ? (u.push(
        m.scale(p(n, i, l, x, C))
      ), f.push(
        m.scale(p(-e, -r, l, x, C))
      )) : (u.push(m.scale(n)), f.push(m.scale(-e))), x += C;
    }), f = f.map(function(m) {
      return a = m.points, a[3] ? m.points = [a[3], a[2], a[1], a[0]] : m.points = [a[2], a[1], a[0]], m;
    }).reverse();
    const g = u[0].points[0], _ = u[s - 1].points[u[s - 1].points.length - 1], E = f[s - 1].points[f[s - 1].points.length - 1], k = f[0].points[0], O = h.makeline(E, g), w = h.makeline(_, k), T = [O].concat(u).concat([w]).concat(f);
    return new G(T);
  }
  outlineshapes(n, e, i) {
    e = e || n;
    const r = this.outline(n, e).curves, o = [];
    for (let s = 1, u = r.length; s < u / 2; s++) {
      const f = h.makeshape(
        r[s],
        r[u - s],
        i
      );
      f.startcap.virtual = s > 1, f.endcap.virtual = s < u / 2 - 1, o.push(f);
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
    const e = Q(n.p1.x, n.p2.x), i = Q(n.p1.y, n.p2.y), r = V(n.p1.x, n.p2.x), o = V(n.p1.y, n.p2.y);
    return h.roots(this.points, n).filter((s) => {
      var u = this.get(s);
      return h.between(u.x, e, r) && h.between(u.y, i, o);
    });
  }
  selfintersects(n) {
    const e = this.reduce(), i = e.length - 2, r = [];
    for (let o = 0, s, u, f; o < i; o++)
      u = e.slice(o, o + 1), f = e.slice(o + 2), s = this.curveintersects(u, f, n), r.push(...s);
    return r;
  }
  curveintersects(n, e, i) {
    const r = [];
    n.forEach(function(s) {
      e.forEach(function(u) {
        s.overlaps(u) && r.push({ left: s, right: u });
      });
    });
    let o = [];
    return r.forEach(function(s) {
      const u = h.pairiteration(
        s.left,
        s.right,
        i
      );
      u.length > 0 && (o = o.concat(u));
    }), o;
  }
  arcs(n) {
    return n = n || 0.5, this._iterate(n, []);
  }
  _error(n, e, i, r) {
    const o = (r - i) / 4, s = this.get(i + o), u = this.get(r - o), f = h.dist(n, e), a = h.dist(n, s), x = h.dist(n, u);
    return L(a - f) + L(x - f);
  }
  _iterate(n, e) {
    let i = 0, r = 1, o;
    do {
      o = 0, r = 1;
      let s = this.get(i), u, f, a, x, l = !1, y = !1, p, g = r, _ = 1;
      do
        if (y = l, x = a, g = (i + r) / 2, u = this.get(g), f = this.get(r), a = h.getccenter(s, u, f), a.interval = {
          start: i,
          end: r
        }, l = this._error(a, s, i, r) <= n, p = y && !l, p || (_ = r), l) {
          if (r >= 1) {
            if (a.interval.end = _ = 1, x = a, r > 1) {
              let k = {
                x: a.x + a.r * nt(a.e),
                y: a.y + a.r * et(a.e)
              };
              a.e += h.angle({ x: a.x, y: a.y }, k, this.get(1));
            }
            break;
          }
          r = r + (r - i) / 2;
        } else
          r = g;
      while (!p && o++ < 100);
      if (o >= 100)
        break;
      x = x || a, e.push(x), i = _;
    } while (r < 1);
    return e;
  }
}
export {
  v as Bezier
};
//# sourceMappingURL=bezier.js.map
