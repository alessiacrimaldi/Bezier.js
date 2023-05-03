const { abs: U, cos: j, sin: R, acos: K, atan2: J, sqrt: S, pow: M } = Math;
function $(c) {
  return c < 0 ? -M(-c, 1 / 3) : M(c, 1 / 3);
}
const Z = Math.PI, X = 2 * Z, N = Z / 2, B = 1e-6, W = Number.MAX_SAFE_INTEGER || 9007199254740991, Y = Number.MIN_SAFE_INTEGER || -9007199254740991, tt = { x: 0, y: 0, z: 0 }, a = {
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
    const i = n(c);
    let e = i.x * i.x + i.y * i.y;
    return typeof i.z < "u" && (e += i.z * i.z), S(e);
  },
  compute: function(c, n, i) {
    if (c === 0)
      return n[0].t = 0, n[0];
    const e = n.length - 1;
    if (c === 1)
      return n[e].t = 1, n[e];
    const s = 1 - c;
    let o = n;
    if (e === 0)
      return n[0].t = c, n[0];
    if (e === 1) {
      const u = {
        x: s * o[0].x + c * o[1].x,
        y: s * o[0].y + c * o[1].y,
        t: c
      };
      return i && (u.z = s * o[0].z + c * o[1].z), u;
    }
    if (e < 4) {
      let u = s * s, f = c * c, h, x, l, y = 0;
      e === 2 ? (o = [o[0], o[1], o[2], tt], h = u, x = s * c * 2, l = f) : e === 3 && (h = u * s, x = u * c * 3, l = s * f * 3, y = c * f);
      const p = {
        x: h * o[0].x + x * o[1].x + l * o[2].x + y * o[3].x,
        y: h * o[0].y + x * o[1].y + l * o[2].y + y * o[3].y,
        t: c
      };
      return i && (p.z = h * o[0].z + x * o[1].z + l * o[2].z + y * o[3].z), p;
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
  computeWithRatios: function(c, n, i, e) {
    const s = 1 - c, o = i, r = n;
    let u = o[0], f = o[1], h = o[2], x = o[3], l;
    if (u *= s, f *= c, r.length === 2)
      return l = u + f, {
        x: (u * r[0].x + f * r[1].x) / l,
        y: (u * r[0].y + f * r[1].y) / l,
        z: e ? (u * r[0].z + f * r[1].z) / l : !1,
        t: c
      };
    if (u *= s, f *= 2 * s, h *= c * c, r.length === 3)
      return l = u + f + h, {
        x: (u * r[0].x + f * r[1].x + h * r[2].x) / l,
        y: (u * r[0].y + f * r[1].y + h * r[2].y) / l,
        z: e ? (u * r[0].z + f * r[1].z + h * r[2].z) / l : !1,
        t: c
      };
    if (u *= s, f *= 1.5 * s, h *= 3 * s, x *= c * c * c, r.length === 4)
      return l = u + f + h + x, {
        x: (u * r[0].x + f * r[1].x + h * r[2].x + x * r[3].x) / l,
        y: (u * r[0].y + f * r[1].y + h * r[2].y + x * r[3].y) / l,
        z: e ? (u * r[0].z + f * r[1].z + h * r[2].z + x * r[3].z) / l : !1,
        t: c
      };
  },
  derive: function(c, n) {
    const i = [];
    for (let e = c, s = e.length, o = s - 1; s > 1; s--, o--) {
      const r = [];
      for (let u = 0, f; u < o; u++)
        f = {
          x: o * (e[u + 1].x - e[u].x),
          y: o * (e[u + 1].y - e[u].y)
        }, n && (f.z = o * (e[u + 1].z - e[u].z)), r.push(f);
      i.push(r), e = r;
    }
    return i;
  },
  between: function(c, n, i) {
    return n <= c && c <= i || a.approximately(c, n) || a.approximately(c, i);
  },
  approximately: function(c, n, i) {
    return U(c - n) <= (i || B);
  },
  length: function(c) {
    const i = a.Tvalues.length;
    let e = 0;
    for (let s = 0, o; s < i; s++)
      o = 0.5 * a.Tvalues[s] + 0.5, e += a.Cvalues[s] * a.arcfn(o, c);
    return 0.5 * e;
  },
  map: function(c, n, i, e, s) {
    const o = i - n, r = s - e, u = c - n, f = u / o;
    return e + r * f;
  },
  lerp: function(c, n, i) {
    const e = {
      x: n.x + c * (i.x - n.x),
      y: n.y + c * (i.y - n.y)
    };
    return n.z !== void 0 && i.z !== void 0 && (e.z = n.z + c * (i.z - n.z)), e;
  },
  pointToString: function(c) {
    let n = c.x + "/" + c.y;
    return typeof c.z < "u" && (n += "/" + c.z), n;
  },
  pointsToString: function(c) {
    return "[" + c.map(a.pointToString).join(", ") + "]";
  },
  copy: function(c) {
    return JSON.parse(JSON.stringify(c));
  },
  angle: function(c, n, i) {
    const e = n.x - c.x, s = n.y - c.y, o = i.x - c.x, r = i.y - c.y, u = e * r - s * o, f = e * o + s * r;
    return J(u, f);
  },
  // round as string, to avoid rounding errors
  round: function(c, n) {
    const i = "" + c, e = i.indexOf(".");
    return parseFloat(i.substring(0, e + 1 + n));
  },
  dist: function(c, n) {
    const i = c.x - n.x, e = c.y - n.y;
    return S(i * i + e * e);
  },
  closest: function(c, n) {
    let i = M(2, 63), e, s;
    return c.forEach(function(o, r) {
      s = a.dist(n, o), s < i && (i = s, e = r);
    }), { mdist: i, mpos: e };
  },
  abcratio: function(c, n) {
    if (n !== 2 && n !== 3)
      return !1;
    if (typeof c > "u")
      c = 0.5;
    else if (c === 0 || c === 1)
      return c;
    const i = M(c, n) + M(1 - c, n), e = i - 1;
    return U(e / i);
  },
  projectionratio: function(c, n) {
    if (n !== 2 && n !== 3)
      return !1;
    if (typeof c > "u")
      c = 0.5;
    else if (c === 0 || c === 1)
      return c;
    const i = M(1 - c, n), e = M(c, n) + i;
    return i / e;
  },
  lli8: function(c, n, i, e, s, o, r, u) {
    const f = (c * e - n * i) * (s - r) - (c - i) * (s * u - o * r), h = (c * e - n * i) * (o - u) - (n - e) * (s * u - o * r), x = (c - i) * (o - u) - (n - e) * (s - r);
    return x == 0 ? !1 : { x: f / x, y: h / x };
  },
  lli4: function(c, n, i, e) {
    const s = c.x, o = c.y, r = n.x, u = n.y, f = i.x, h = i.y, x = e.x, l = e.y;
    return a.lli8(s, o, r, u, f, h, x, l);
  },
  lli: function(c, n) {
    return a.lli4(c, c.c, n, n.c);
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
    let n = W, i = W, e = Y, s = Y;
    return c.forEach(function(o) {
      const r = o.bbox();
      n > r.x.min && (n = r.x.min), i > r.y.min && (i = r.y.min), e < r.x.max && (e = r.x.max), s < r.y.max && (s = r.y.max);
    }), {
      x: { min: n, mid: (n + e) / 2, max: e, size: e - n },
      y: { min: i, mid: (i + s) / 2, max: s, size: s - i }
    };
  },
  shapeintersections: function(c, n, i, e, s) {
    if (!a.bboxoverlap(n, e))
      return [];
    const o = [], r = [c.startcap, c.forward, c.back, c.endcap], u = [i.startcap, i.forward, i.back, i.endcap];
    return r.forEach(function(f) {
      f.virtual || u.forEach(function(h) {
        if (h.virtual)
          return;
        const x = f.intersects(h, s);
        x.length > 0 && (x.c1 = f, x.c2 = h, x.s1 = c, x.s2 = i, o.push(x));
      });
    }), o;
  },
  makeshape: function(c, n, i) {
    const e = n.points.length, s = c.points.length, o = a.makeline(n.points[e - 1], c.points[0]), r = a.makeline(c.points[s - 1], n.points[0]), u = {
      startcap: o,
      forward: c,
      back: n,
      endcap: r,
      bbox: a.findbbox([o, c, n, r])
    };
    return u.intersections = function(f) {
      return a.shapeintersections(
        u,
        u.bbox,
        f,
        f.bbox,
        i
      );
    }, u;
  },
  getminmax: function(c, n, i) {
    if (!i)
      return { min: 0, max: 0 };
    let e = W, s = Y, o, r;
    i.indexOf(0) === -1 && (i = [0].concat(i)), i.indexOf(1) === -1 && i.push(1);
    for (let u = 0, f = i.length; u < f; u++)
      o = i[u], r = c.get(o), r[n] < e && (e = r[n]), r[n] > s && (s = r[n]);
    return { min: e, mid: (e + s) / 2, max: s, size: s - e };
  },
  align: function(c, n) {
    const i = n.p1.x, e = n.p1.y, s = -J(n.p2.y - e, n.p2.x - i), o = function(r) {
      return {
        x: (r.x - i) * j(s) - (r.y - e) * R(s),
        y: (r.x - i) * R(s) + (r.y - e) * j(s)
      };
    };
    return c.map(o);
  },
  roots: function(c, n) {
    n = n || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
    const i = c.length - 1, e = a.align(c, n), s = function(d) {
      return 0 <= d && d <= 1;
    };
    if (i === 2) {
      const d = e[0].y, z = e[1].y, q = e[2].y, k = d - 2 * z + q;
      if (k !== 0) {
        const T = -S(z * z - d * q), A = -d + z, I = -(T + A) / k, F = -(-T + A) / k;
        return [I, F].filter(s);
      } else if (z !== q && k === 0)
        return [(2 * z - q) / (2 * z - 2 * q)].filter(s);
      return [];
    }
    const o = e[0].y, r = e[1].y, u = e[2].y, f = e[3].y;
    let h = -o + 3 * r - 3 * u + f, x = 3 * o - 6 * r + 3 * u, l = -3 * o + 3 * r, y = o;
    if (a.approximately(h, 0)) {
      if (a.approximately(x, 0))
        return a.approximately(l, 0) ? [] : [-y / l].filter(s);
      const d = S(l * l - 4 * x * y), z = 2 * x;
      return [(d - l) / z, (-l - d) / z].filter(s);
    }
    x /= h, l /= h, y /= h;
    const p = (3 * l - x * x) / 3, g = p / 3, _ = (2 * x * x * x - 9 * x * l + 27 * y) / 27, E = _ / 2, P = E * E + g * g * g;
    let O, w, b, m, C;
    if (P < 0) {
      const d = -p / 3, z = d * d * d, q = S(z), k = -_ / (2 * q), T = k < -1 ? -1 : k > 1 ? 1 : k, A = K(T), I = $(q), F = 2 * I;
      return b = F * j(A / 3) - x / 3, m = F * j((A + X) / 3) - x / 3, C = F * j((A + 2 * X) / 3) - x / 3, [b, m, C].filter(s);
    } else {
      if (P === 0)
        return O = E < 0 ? $(-E) : -$(E), b = 2 * O - x / 3, m = -O - x / 3, [b, m].filter(s);
      {
        const d = S(P);
        return O = $(-E + d), w = $(E + d), [O - w - x / 3].filter(s);
      }
    }
  },
  droots: function(c) {
    if (c.length === 3) {
      const n = c[0], i = c[1], e = c[2], s = n - 2 * i + e;
      if (s !== 0) {
        const o = -S(i * i - n * e), r = -n + i, u = -(o + r) / s, f = -(-o + r) / s;
        return [u, f];
      } else if (i !== e && s === 0)
        return [(2 * i - e) / (2 * (i - e))];
      return [];
    }
    if (c.length === 2) {
      const n = c[0], i = c[1];
      return n !== i ? [n / (n - i)] : [];
    }
    return [];
  },
  curvature: function(c, n, i, e, s) {
    let o, r, u, f, h = 0, x = 0;
    const l = a.compute(c, n), y = a.compute(c, i), p = l.x * l.x + l.y * l.y;
    if (e ? (o = S(
      M(l.y * y.z - y.y * l.z, 2) + M(l.z * y.x - y.z * l.x, 2) + M(l.x * y.y - y.x * l.y, 2)
    ), r = M(p + l.z * l.z, 3 / 2)) : (o = l.x * y.y - l.y * y.x, r = M(p, 3 / 2)), o === 0 || r === 0)
      return { k: 0, r: 0 };
    if (h = o / r, x = r / o, !s) {
      const g = a.curvature(c - 1e-3, n, i, e, !0).k, _ = a.curvature(c + 1e-3, n, i, e, !0).k;
      f = (_ - h + (h - g)) / 2, u = (U(_ - h) + U(h - g)) / 2;
    }
    return { k: h, r: x, dk: f, adk: u };
  },
  inflections: function(c) {
    if (c.length < 4)
      return [];
    const n = a.align(c, { p1: c[0], p2: c.slice(-1)[0] }), i = n[2].x * n[1].y, e = n[3].x * n[1].y, s = n[1].x * n[2].y, o = n[3].x * n[2].y, r = 18 * (-3 * i + 2 * e + 3 * s - o), u = 18 * (3 * i - e - 3 * s), f = 18 * (s - i);
    if (a.approximately(r, 0)) {
      if (!a.approximately(u, 0)) {
        let y = -f / u;
        if (0 <= y && y <= 1)
          return [y];
      }
      return [];
    }
    const h = u * u - 4 * r * f, x = Math.sqrt(h), l = 2 * r;
    return a.approximately(l, 0) ? [] : [(x - u) / l, -(u + x) / l].filter(function(y) {
      return 0 <= y && y <= 1;
    });
  },
  bboxoverlap: function(c, n) {
    const i = ["x", "y"], e = i.length;
    for (let s = 0, o, r, u, f; s < e; s++)
      if (o = i[s], r = c[o].mid, u = n[o].mid, f = (c[o].size + n[o].size) / 2, U(r - u) >= f)
        return !1;
    return !0;
  },
  expandbox: function(c, n) {
    n.x.min < c.x.min && (c.x.min = n.x.min), n.y.min < c.y.min && (c.y.min = n.y.min), n.z && n.z.min < c.z.min && (c.z.min = n.z.min), n.x.max > c.x.max && (c.x.max = n.x.max), n.y.max > c.y.max && (c.y.max = n.y.max), n.z && n.z.max > c.z.max && (c.z.max = n.z.max), c.x.mid = (c.x.min + c.x.max) / 2, c.y.mid = (c.y.min + c.y.max) / 2, c.z && (c.z.mid = (c.z.min + c.z.max) / 2), c.x.size = c.x.max - c.x.min, c.y.size = c.y.max - c.y.min, c.z && (c.z.size = c.z.max - c.z.min);
  },
  pairiteration: function(c, n, i) {
    const e = c.bbox(), s = n.bbox(), o = 1e5, r = i || 0.5;
    if (e.x.size + e.y.size < r && s.x.size + s.y.size < r)
      return [
        (o * (c._t1 + c._t2) / 2 | 0) / o + "/" + (o * (n._t1 + n._t2) / 2 | 0) / o
      ];
    let u = c.split(0.5), f = n.split(0.5), h = [
      { left: u.left, right: f.left },
      { left: u.left, right: f.right },
      { left: u.right, right: f.right },
      { left: u.right, right: f.left }
    ];
    h = h.filter(function(l) {
      return a.bboxoverlap(l.left.bbox(), l.right.bbox());
    });
    let x = [];
    return h.length === 0 || (h.forEach(function(l) {
      x = x.concat(
        a.pairiteration(l.left, l.right, r)
      );
    }), x = x.filter(function(l, y) {
      return x.indexOf(l) === y;
    })), x;
  },
  getccenter: function(c, n, i) {
    const e = n.x - c.x, s = n.y - c.y, o = i.x - n.x, r = i.y - n.y, u = e * j(N) - s * R(N), f = e * R(N) + s * j(N), h = o * j(N) - r * R(N), x = o * R(N) + r * j(N), l = (c.x + n.x) / 2, y = (c.y + n.y) / 2, p = (n.x + i.x) / 2, g = (n.y + i.y) / 2, _ = l + u, E = y + f, P = p + h, O = g + x, w = a.lli8(l, y, _, E, p, g, P, O), b = a.dist(w, c);
    let m = J(c.y - w.y, c.x - w.x), C = J(n.y - w.y, n.x - w.x), d = J(i.y - w.y, i.x - w.x), z;
    return m < d ? ((m > C || C > d) && (m += X), m > d && (z = d, d = m, m = z)) : d < C && C < m ? (z = d, d = m, m = z) : d += X, w.s = m, w.e = d, w.r = b, w;
  },
  numberSort: function(c, n) {
    return c - n;
  },
  midpoint: function(c, n) {
    const i = (c.x + n.x) / 2, e = (c.y + n.y) / 2;
    return { x: i, y: e };
  },
  checkcoincidation: function(c, n) {
    return c.x == n.x && c.y == n.y;
  }
};
class G {
  constructor(n) {
    this.curves = [], this._3d = !1, n && (this.curves = n, this._3d = this.curves[0]._3d), this._closed = a.checkcoincidation(this.lastPathPoint(), this.firstPathPoint()), this.setJoinC_0();
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
      const i = this.curve(n), e = this.curve(n + 1), s = i.lastPoint(), o = e.points[0];
      if (!a.checkcoincidation(s, o)) {
        const r = a.midpoint(s, o);
        i.points[i.lastPointIdx()] = r, e.points[0] = r;
      }
    }
  }
  closePath() {
    if (!this._closed) {
      const n = this.lastPathCurve();
      n.points[n.lastPointIdx()] = this.firstPathPoint(), this._closed = !0;
    }
  }
  valueOf() {
    return this.toString();
  }
  toString() {
    return "[" + this.curves.map(function(n) {
      return a.pointsToString(n.points);
    }).join(", ") + "]";
  }
  addCurve(n) {
    this.curves.push(n), this._3d = this._3d || n._3d;
  }
  length() {
    return this.curves.map(function(n) {
      return n.length();
    }).reduce(function(n, i) {
      return n + i;
    });
  }
  bbox() {
    const n = this.curves;
    for (var i = n[0].bbox(), e = 1; e < n.length; e++)
      a.expandbox(i, n[e].bbox());
    return i;
  }
  offset(n) {
    const i = [];
    return this.curves.forEach(function(e) {
      i.push(...e.offset(n));
    }), new G(i);
  }
}
const { abs: L, min: Q, max: V, cos: nt, sin: it, acos: et, sqrt: D } = Math, st = Math.PI;
class v {
  constructor(n) {
    let i = n && n.forEach ? n : Array.from(arguments).slice(), e = !1;
    if (typeof i[0] == "object") {
      e = i.length;
      const p = [];
      i.forEach(function(g) {
        ["x", "y", "z"].forEach(function(_) {
          typeof g[_] < "u" && p.push(g[_]);
        });
      }), i = p;
    }
    let s = !1;
    const o = i.length;
    if (e) {
      if (e > 4) {
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
        x: i[p],
        y: i[p + 1]
      };
      r && (f.z = i[p + 2]), u.push(f);
    }
    const h = this.order = u.length - 1, x = this.dims = ["x", "y"];
    r && x.push("z"), this.dimlen = x.length;
    const l = a.align(u, { p1: u[0], p2: u[h] }), y = a.dist(u[0], u[h]);
    this._linear = l.reduce((p, g) => p + L(g.y), 0) < y / 50, this.curvepoints = [], this._lut = [], this.intersections = {}, this._t1 = 0, this._t2 = 1, this.update();
  }
  static quadraticFromPoints(n, i, e, s) {
    if (typeof s > "u" && (s = 0.5), s === 0)
      return new v(i, i, e);
    if (s === 1)
      return new v(n, i, i);
    const o = v.getABC(2, n, i, e, s);
    return new v(n, o.A, e);
  }
  static cubicFromPoints(n, i, e, s, o) {
    typeof s > "u" && (s = 0.5);
    const r = v.getABC(3, n, i, e, s);
    typeof o > "u" && (o = a.dist(i, r.C));
    const u = o * (1 - s) / s, f = a.dist(n, e), h = (e.x - n.x) / f, x = (e.y - n.y) / f, l = o * h, y = o * x, p = u * h, g = u * x, _ = { x: i.x - l, y: i.y - y }, E = { x: i.x + p, y: i.y + g }, P = r.A, O = { x: P.x + (_.x - P.x) / (1 - s), y: P.y + (_.y - P.y) / (1 - s) }, w = { x: P.x + (E.x - P.x) / s, y: P.y + (E.y - P.y) / s }, b = { x: n.x + (O.x - n.x) / s, y: n.y + (O.y - n.y) / s }, m = {
      x: e.x + (w.x - e.x) / (1 - s),
      y: e.y + (w.y - e.y) / (1 - s)
    };
    return new v(n, b, m, e);
  }
  static getUtils() {
    return a;
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
    return a.pointsToString(this.points);
  }
  toSVG() {
    if (this._3d)
      return !1;
    const n = this.points, i = n[0].x, e = n[0].y, s = ["M", i, e, this.order === 2 ? "Q" : "C"];
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
    return this.points.map(function(n, i) {
      return "" + i + n.x + n.y + (n.z ? n.z : 0);
    }).join("");
  }
  update() {
    this._lut = [], this.dpoints = a.derive(this.points, this._3d), this.computedirection();
    const n = this.curvepoints.length;
    this.computeCurvePoints(n);
  }
  computeCurvePoints(n = 1e3) {
    this.curvepoints = [];
    for (let i = 0, e, s; i < n; i++)
      s = i / (n - 1), e = this.compute(s), e.t = s, this.curvepoints.push(e);
    return this.curvepoints;
  }
  computedirection() {
    const n = this.points, i = a.angle(n[0], n[this.order], n[1]);
    this.clockwise = i > 0;
  }
  length() {
    return this.len = a.length(this.derivative.bind(this));
  }
  static getABC(n = 2, i, e, s, o = 0.5) {
    const r = a.projectionratio(o, n), u = 1 - r, f = {
      x: r * i.x + u * s.x,
      y: r * i.y + u * s.y
    }, h = a.abcratio(o, n);
    return { A: {
      x: e.x + (e.x - f.x) / h,
      y: e.y + (e.y - f.y) / h
    }, B: e, C: f, S: i, E: s };
  }
  getABC(n, i) {
    i = i || this.get(n);
    let e = this.points[0], s = this.points[this.order];
    return v.getABC(this.order, e, i, s, n);
  }
  getLUT(n) {
    if (this.verify(), n = n || 100, this._lut.length === n)
      return this._lut;
    this._lut = [], n++, this._lut = [];
    for (let i = 0, e, s; i < n; i++)
      s = i / (n - 1), e = this.compute(s), e.t = s, this._lut.push(e);
    return this._lut;
  }
  on(n, i) {
    i = i || 5;
    const e = this.getLUT(), s = [];
    for (let o = 0, r, u = 0; o < e.length; o++)
      r = e[o], a.dist(r, n) < i && (s.push(r), u += o / e.length);
    return s.length ? t /= s.length : !1;
  }
  project(n) {
    const i = this.getLUT(), e = i.length - 1, s = a.closest(i, n), o = s.mpos, r = (o - 1) / e, u = (o + 1) / e, f = 0.1 / e;
    let h = s.mdist, x = r, l = x, y;
    h += 1;
    for (let p; x < u + f; x += f)
      y = this.compute(x), p = a.dist(n, y), p < h && (h = p, l = x);
    return l = l < 0 ? 0 : l > 1 ? 1 : l, y = this.compute(l), y.t = l, y.d = h, this.projp = { ...y, point: n }, y;
  }
  get(n) {
    return this.p = this.compute(n);
  }
  point(n) {
    return this.points[n];
  }
  compute(n) {
    return this.ratios ? a.computeWithRatios(n, this.points, this.ratios, this._3d) : a.compute(n, this.points, this._3d, this.ratios);
  }
  raise() {
    const n = this.points, i = [n[0]], e = n.length;
    for (let s = 1, o, r; s < e; s++)
      o = n[s], r = n[s - 1], i[s] = {
        x: (e - s) / e * o.x + s / e * r.x,
        y: (e - s) / e * o.y + s / e * r.y
      };
    return i[e] = n[e - 1], new v(i);
  }
  derivative(n) {
    const i = a.compute(n, this.dpoints[0], this._3d);
    return this.dv = i;
  }
  dderivative(n) {
    return a.compute(n, this.dpoints[1], this._3d);
  }
  align() {
    let n = this.points;
    return new v(a.align(n, { p1: n[0], p2: n[n.length - 1] }));
  }
  curvature(n) {
    const i = a.curvature(n, this.dpoints[0], this.dpoints[1], this._3d);
    return this.kr = { ...i, t: n }, i;
  }
  inflections() {
    return this.infl = a.inflections(this.points);
  }
  normal(n) {
    const i = this._3d ? this.__normal3(n) : this.__normal2(n);
    return this.norm = { ...i, t: n }, i;
  }
  __normal2(n) {
    const i = this.derivative(n), e = D(i.x * i.x + i.y * i.y);
    return { x: -i.y / e, y: i.x / e };
  }
  __normal3(n) {
    const i = this.derivative(n), e = this.derivative(n + 0.01), s = D(i.x * i.x + i.y * i.y + i.z * i.z), o = D(e.x * e.x + e.y * e.y + e.z * e.z);
    i.x /= s, i.y /= s, i.z /= s, e.x /= o, e.y /= o, e.z /= o;
    const r = {
      x: e.y * i.z - e.z * i.y,
      y: e.z * i.x - e.x * i.z,
      z: e.x * i.y - e.y * i.x
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
      x: f[0] * i.x + f[1] * i.y + f[2] * i.z,
      y: f[3] * i.x + f[4] * i.y + f[5] * i.z,
      z: f[6] * i.x + f[7] * i.y + f[8] * i.z
    };
  }
  hull(n) {
    let i = this.points, e = [], s = [], o = 0;
    for (s[o++] = i[0], s[o++] = i[1], s[o++] = i[2], this.order === 3 && (s[o++] = i[3]); i.length > 1; ) {
      e = [];
      for (let r = 0, u, f = i.length - 1; r < f; r++)
        u = a.lerp(n, i[r], i[r + 1]), s[o++] = u, e.push(u);
      i = e;
    }
    return this.hullp = { ...s, t: n }, s;
  }
  split(n, i) {
    if (n === 0 && i)
      return this.subc = this.split(i).left;
    if (i === 1)
      return this.subc = this.split(n).right;
    const e = this.hull(n), s = {
      left: this.order === 2 ? new v([e[0], e[3], e[5]]) : new v([e[0], e[4], e[7], e[9]]),
      right: this.order === 2 ? new v([e[5], e[4], e[2]]) : new v([e[9], e[8], e[6], e[3]]),
      span: e
    };
    if (s.left._t1 = a.map(0, 0, 1, this._t1, this._t2), s.left._t2 = a.map(n, 0, 1, this._t1, this._t2), s.right._t1 = a.map(n, 0, 1, this._t1, this._t2), s.right._t2 = a.map(1, 0, 1, this._t1, this._t2), !i)
      return this.subc = { c: [s.left, s.right], t: n }, s;
    i = a.map(i, n, 1, 0, 1);
    const o = s.right.split(i).left;
    return this.subc = { ...o, t1: n, t2: i }, o;
  }
  extrema() {
    const n = {};
    let i = [];
    return this.dims.forEach(
      function(e) {
        let s = function(r) {
          return r[e];
        }, o = this.dpoints[0].map(s);
        n[e] = a.droots(o), this.order === 3 && (o = this.dpoints[1].map(s), n[e] = n[e].concat(a.droots(o))), n[e] = n[e].filter(function(r) {
          return r >= 0 && r <= 1;
        }), i = i.concat(n[e].sort(a.numberSort));
      }.bind(this)
    ), n.values = i.sort(a.numberSort).filter(function(e, s) {
      return i.indexOf(e) === s;
    }), this.extrs = n;
  }
  bbox() {
    const n = this.extrema(), i = {};
    return this.dims.forEach(
      function(e) {
        i[e] = a.getminmax(this, e, n[e]);
      }.bind(this)
    ), this.bb = i;
  }
  overlaps(n) {
    const i = this.bbox(), e = n.bbox();
    return a.bboxoverlap(i, e);
  }
  offset(n, i) {
    if (typeof i < "u") {
      const e = this.get(n), s = this.normal(n), o = {
        c: e,
        n: s,
        x: e.x + s.x * i,
        y: e.y + s.y * i
      };
      return this._3d && (o.z = e.z + s.z * i), this.offstcoords = o;
    }
    if (this._linear) {
      const e = this.normal(0), s = this.points.map(function(o) {
        const r = {
          x: o.x + n * e.x,
          y: o.y + n * e.y
        };
        return o.z && e.z && (r.z = o.z + n * e.z), r;
      });
      return this.offst = [new v(s)];
    }
    return this.offst = this.reduce().map(function(e) {
      return e._linear ? e.offset(n)[0] : e.scale(n);
    });
  }
  simple() {
    if (this.order === 3) {
      const s = a.angle(this.points[0], this.points[3], this.points[1]), o = a.angle(this.points[0], this.points[3], this.points[2]);
      if (s > 0 && o < 0 || s < 0 && o > 0)
        return !1;
    }
    const n = this.normal(0), i = this.normal(1);
    let e = n.x * i.x + n.y * i.y;
    return this._3d && (e += n.z * i.z), L(et(e)) < st / 3;
  }
  reduce() {
    let n, i = 0, e = 0, s = 0.01, o, r = [], u = [], f = this.extrema().values;
    for (f.indexOf(0) === -1 && (f = [0].concat(f)), f.indexOf(1) === -1 && f.push(1), i = f[0], n = 1; n < f.length; n++)
      e = f[n], o = this.split(i, e), o._t1 = i, o._t2 = e, r.push(o), i = e;
    return r.forEach(function(h) {
      for (i = 0, e = 0; e <= 1; )
        for (e = i + s; e <= 1 + s; e += s)
          if (o = h.split(i, e), !o.simple()) {
            if (e -= s, L(i - e) < s)
              return [];
            o = h.split(i, e), o._t1 = a.map(i, 0, 1, h._t1, h._t2), o._t2 = a.map(e, 0, 1, h._t1, h._t2), u.push(o), i = e;
            break;
          }
      i < 1 && (o = h.split(i, 1), o._t1 = a.map(i, 0, 1, h._t1, h._t2), o._t2 = h._t2, u.push(o));
    }), this.redc = u;
  }
  translate(n, i, e) {
    e = typeof e == "number" ? e : i;
    const s = this.order;
    let o = this.points.map((r, u) => (1 - u / s) * i + u / s * e);
    return new v(
      this.points.map((r, u) => ({
        x: r.x + n.x * o[u],
        y: r.y + n.y * o[u]
      }))
    );
  }
  scale(n) {
    const i = this.order;
    let e = !1;
    if (typeof n == "function" && (e = n), e && i === 2)
      return this.scaled = this.raise().scale(e);
    const s = this.clockwise, o = this.points;
    if (this._linear)
      return this.scaled = this.translate(
        this.normal(0),
        e ? e(0) : n,
        e ? e(1) : n
      );
    const r = e ? e(0) : n, u = e ? e(1) : n, f = [this.offset(0, 10), this.offset(1, 10)], h = [], x = a.lli4(f[0], f[0].c, f[1], f[1].c);
    if (!x)
      throw new Error("cannot scale this curve. Try reducing it first.");
    return [0, 1].forEach(function(l) {
      const y = h[l * i] = a.copy(o[l * i]);
      y.x += (l ? u : r) * f[l].n.x, y.y += (l ? u : r) * f[l].n.y;
    }), e ? ([0, 1].forEach(function(l) {
      if (!(i === 2 && l)) {
        var y = o[l + 1], p = {
          x: y.x - x.x,
          y: y.y - x.y
        }, g = e ? e((l + 1) / i) : n;
        e && !s && (g = -g);
        var _ = D(p.x * p.x + p.y * p.y);
        p.x /= _, p.y /= _, h[l + 1] = {
          x: y.x + g * p.x,
          y: y.y + g * p.y
        };
      }
    }), this.scaled = new v(h)) : ([0, 1].forEach((l) => {
      if (i === 2 && l)
        return;
      const y = h[l * i], p = this.derivative(l), g = { x: y.x + p.x, y: y.y + p.y };
      h[l + 1] = a.lli4(y, g, x, o[l + 1]);
    }), this.scaled = new v(h));
  }
  outline(n, i, e, s) {
    if (i = i === void 0 ? n : i, this._linear) {
      const m = this.normal(0), C = this.points[0], d = this.points[this.points.length - 1];
      let z, q, k;
      e === void 0 && (e = n, s = i), z = { x: C.x + m.x * n, y: C.y + m.y * n }, k = { x: d.x + m.x * e, y: d.y + m.y * e }, q = { x: (z.x + k.x) / 2, y: (z.y + k.y) / 2 };
      const T = [z, q, k];
      z = { x: C.x - m.x * i, y: C.y - m.y * i }, k = { x: d.x - m.x * s, y: d.y - m.y * s }, q = { x: (z.x + k.x) / 2, y: (z.y + k.y) / 2 };
      const A = [k, q, z], I = a.makeline(A[2], T[0]), F = a.makeline(T[2], A[0]), H = [I, new v(T), F, new v(A)];
      return this.outl = new G(H);
    }
    const o = this.reduce(), r = o.length, u = [];
    let f = [], h, x = 0, l = this.length();
    const y = typeof e < "u" && typeof s < "u";
    function p(m, C, d, z, q) {
      return function(k) {
        const T = z / d, A = (z + q) / d, I = C - m;
        return a.map(k, 0, 1, m + T * I, m + A * I);
      };
    }
    o.forEach(function(m) {
      const C = m.length();
      y ? (u.push(
        m.scale(p(n, e, l, x, C))
      ), f.push(
        m.scale(p(-i, -s, l, x, C))
      )) : (u.push(m.scale(n)), f.push(m.scale(-i))), x += C;
    }), f = f.map(function(m) {
      return h = m.points, h[3] ? m.points = [h[3], h[2], h[1], h[0]] : m.points = [h[2], h[1], h[0]], m;
    }).reverse();
    const g = u[0].points[0], _ = u[r - 1].points[u[r - 1].points.length - 1], E = f[r - 1].points[f[r - 1].points.length - 1], P = f[0].points[0], O = a.makeline(E, g), w = a.makeline(_, P), b = [O].concat(u).concat([w]).concat(f);
    return this.outl = new G(b);
  }
  outlineshapes(n, i, e) {
    i = i || n;
    const s = this.outline(n, i).curves, o = [];
    for (let r = 1, u = s.length; r < u / 2; r++) {
      const f = a.makeshape(
        s[r],
        s[u - r],
        e
      );
      f.startcap.virtual = r > 1, f.endcap.virtual = r < u / 2 - 1, o.push(f);
    }
    return this.shapeoutl = o;
  }
  intersects(n, i) {
    return n ? n.p1 && n.p2 ? this.intersections.line = this.lineIntersects(n) : (n instanceof v && (n = n.reduce()), this.intersections.curve = this.curveintersects(
      this.reduce(),
      n,
      i
    )) : this.intersections.self = this.selfintersects(i);
  }
  lineIntersects(n) {
    const i = Q(n.p1.x, n.p2.x), e = Q(n.p1.y, n.p2.y), s = V(n.p1.x, n.p2.x), o = V(n.p1.y, n.p2.y);
    return a.roots(this.points, n).filter((r) => {
      var u = this.get(r);
      return a.between(u.x, i, s) && a.between(u.y, e, o);
    });
  }
  selfintersects(n) {
    const i = this.reduce(), e = i.length - 2, s = [];
    for (let o = 0, r, u, f; o < e; o++)
      u = i.slice(o, o + 1), f = i.slice(o + 2), r = this.curveintersects(u, f, n), s.push(...r);
    return s;
  }
  curveintersects(n, i, e) {
    const s = [];
    n.forEach(function(r) {
      i.forEach(function(u) {
        r.overlaps(u) && s.push({ left: r, right: u });
      });
    });
    let o = [];
    return s.forEach(function(r) {
      const u = a.pairiteration(
        r.left,
        r.right,
        e
      );
      u.length > 0 && (o = o.concat(u));
    }), o;
  }
  arcs(n) {
    return n = n || 0.5, this.carcs = this._iterate(n, []);
  }
  _error(n, i, e, s) {
    const o = (s - e) / 4, r = this.get(e + o), u = this.get(s - o), f = a.dist(n, i), h = a.dist(n, r), x = a.dist(n, u);
    return L(h - f) + L(x - f);
  }
  _iterate(n, i) {
    let e = 0, s = 1, o;
    do {
      o = 0, s = 1;
      let r = this.get(e), u, f, h, x, l = !1, y = !1, p, g = s, _ = 1;
      do
        if (y = l, x = h, g = (e + s) / 2, u = this.get(g), f = this.get(s), h = a.getccenter(r, u, f), h.interval = {
          start: e,
          end: s
        }, l = this._error(h, r, e, s) <= n, p = y && !l, p || (_ = s), l) {
          if (s >= 1) {
            if (h.interval.end = _ = 1, x = h, s > 1) {
              let P = {
                x: h.x + h.r * nt(h.e),
                y: h.y + h.r * it(h.e)
              };
              h.e += a.angle({ x: h.x, y: h.y }, P, this.get(1));
            }
            break;
          }
          s = s + (s - e) / 2;
        } else
          s = g;
      while (!p && o++ < 100);
      if (o >= 100)
        break;
      x = x || h, i.push(x), e = _;
    } while (s < 1);
    return i;
  }
}
export {
  v as Bezier
};
//# sourceMappingURL=bezier.js.map
