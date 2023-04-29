const { abs: F, cos: j, sin: R, acos: K, atan2: L, sqrt: P, pow: b } = Math;
function $(r) {
  return r < 0 ? -b(-r, 1 / 3) : b(r, 1 / 3);
}
const V = Math.PI, X = 2 * V, I = V / 2, B = 1e-6, W = Number.MAX_SAFE_INTEGER || 9007199254740991, Y = Number.MIN_SAFE_INTEGER || -9007199254740991, tt = { x: 0, y: 0, z: 0 }, h = {
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
  arcfn: function(r, n) {
    const e = n(r);
    let i = e.x * e.x + e.y * e.y;
    return typeof e.z < "u" && (i += e.z * e.z), P(i);
  },
  compute: function(r, n, e) {
    if (r === 0)
      return n[0].t = 0, n[0];
    const i = n.length - 1;
    if (r === 1)
      return n[i].t = 1, n[i];
    const s = 1 - r;
    let u = n;
    if (i === 0)
      return n[0].t = r, n[0];
    if (i === 1) {
      const c = {
        x: s * u[0].x + r * u[1].x,
        y: s * u[0].y + r * u[1].y,
        t: r
      };
      return e && (c.z = s * u[0].z + r * u[1].z), c;
    }
    if (i < 4) {
      let c = s * s, l = r * r, f, x, a, y = 0;
      i === 2 ? (u = [u[0], u[1], u[2], tt], f = c, x = s * r * 2, a = l) : i === 3 && (f = c * s, x = c * r * 3, a = s * l * 3, y = r * l);
      const p = {
        x: f * u[0].x + x * u[1].x + a * u[2].x + y * u[3].x,
        y: f * u[0].y + x * u[1].y + a * u[2].y + y * u[3].y,
        t: r
      };
      return e && (p.z = f * u[0].z + x * u[1].z + a * u[2].z + y * u[3].z), p;
    }
    const o = JSON.parse(JSON.stringify(n));
    for (; o.length > 1; ) {
      for (let c = 0; c < o.length - 1; c++)
        o[c] = {
          x: o[c].x + (o[c + 1].x - o[c].x) * r,
          y: o[c].y + (o[c + 1].y - o[c].y) * r
        }, typeof o[c].z < "u" && (o[c] = o[c].z + (o[c + 1].z - o[c].z) * r);
      o.splice(o.length - 1, 1);
    }
    return o[0].t = r, o[0];
  },
  computeWithRatios: function(r, n, e, i) {
    const s = 1 - r, u = e, o = n;
    let c = u[0], l = u[1], f = u[2], x = u[3], a;
    if (c *= s, l *= r, o.length === 2)
      return a = c + l, {
        x: (c * o[0].x + l * o[1].x) / a,
        y: (c * o[0].y + l * o[1].y) / a,
        z: i ? (c * o[0].z + l * o[1].z) / a : !1,
        t: r
      };
    if (c *= s, l *= 2 * s, f *= r * r, o.length === 3)
      return a = c + l + f, {
        x: (c * o[0].x + l * o[1].x + f * o[2].x) / a,
        y: (c * o[0].y + l * o[1].y + f * o[2].y) / a,
        z: i ? (c * o[0].z + l * o[1].z + f * o[2].z) / a : !1,
        t: r
      };
    if (c *= s, l *= 1.5 * s, f *= 3 * s, x *= r * r * r, o.length === 4)
      return a = c + l + f + x, {
        x: (c * o[0].x + l * o[1].x + f * o[2].x + x * o[3].x) / a,
        y: (c * o[0].y + l * o[1].y + f * o[2].y + x * o[3].y) / a,
        z: i ? (c * o[0].z + l * o[1].z + f * o[2].z + x * o[3].z) / a : !1,
        t: r
      };
  },
  derive: function(r, n) {
    const e = [];
    for (let i = r, s = i.length, u = s - 1; s > 1; s--, u--) {
      const o = [];
      for (let c = 0, l; c < u; c++)
        l = {
          x: u * (i[c + 1].x - i[c].x),
          y: u * (i[c + 1].y - i[c].y)
        }, n && (l.z = u * (i[c + 1].z - i[c].z)), o.push(l);
      e.push(o), i = o;
    }
    return e;
  },
  between: function(r, n, e) {
    return n <= r && r <= e || h.approximately(r, n) || h.approximately(r, e);
  },
  approximately: function(r, n, e) {
    return F(r - n) <= (e || B);
  },
  length: function(r) {
    const e = h.Tvalues.length;
    let i = 0;
    for (let s = 0, u; s < e; s++)
      u = 0.5 * h.Tvalues[s] + 0.5, i += h.Cvalues[s] * h.arcfn(u, r);
    return 0.5 * i;
  },
  map: function(r, n, e, i, s) {
    const u = e - n, o = s - i, c = r - n, l = c / u;
    return i + o * l;
  },
  lerp: function(r, n, e) {
    const i = {
      x: n.x + r * (e.x - n.x),
      y: n.y + r * (e.y - n.y)
    };
    return n.z !== void 0 && e.z !== void 0 && (i.z = n.z + r * (e.z - n.z)), i;
  },
  pointToString: function(r) {
    let n = r.x + "/" + r.y;
    return typeof r.z < "u" && (n += "/" + r.z), n;
  },
  pointsToString: function(r) {
    return "[" + r.map(h.pointToString).join(", ") + "]";
  },
  copy: function(r) {
    return JSON.parse(JSON.stringify(r));
  },
  angle: function(r, n, e) {
    const i = n.x - r.x, s = n.y - r.y, u = e.x - r.x, o = e.y - r.y, c = i * o - s * u, l = i * u + s * o;
    return L(c, l);
  },
  // round as string, to avoid rounding errors
  round: function(r, n) {
    const e = "" + r, i = e.indexOf(".");
    return parseFloat(e.substring(0, i + 1 + n));
  },
  dist: function(r, n) {
    const e = r.x - n.x, i = r.y - n.y;
    return P(e * e + i * i);
  },
  closest: function(r, n) {
    let e = b(2, 63), i, s;
    return r.forEach(function(u, o) {
      s = h.dist(n, u), s < e && (e = s, i = o);
    }), { mdist: e, mpos: i };
  },
  abcratio: function(r, n) {
    if (n !== 2 && n !== 3)
      return !1;
    if (typeof r > "u")
      r = 0.5;
    else if (r === 0 || r === 1)
      return r;
    const e = b(r, n) + b(1 - r, n), i = e - 1;
    return F(i / e);
  },
  projectionratio: function(r, n) {
    if (n !== 2 && n !== 3)
      return !1;
    if (typeof r > "u")
      r = 0.5;
    else if (r === 0 || r === 1)
      return r;
    const e = b(1 - r, n), i = b(r, n) + e;
    return e / i;
  },
  lli8: function(r, n, e, i, s, u, o, c) {
    const l = (r * i - n * e) * (s - o) - (r - e) * (s * c - u * o), f = (r * i - n * e) * (u - c) - (n - i) * (s * c - u * o), x = (r - e) * (u - c) - (n - i) * (s - o);
    return x == 0 ? !1 : { x: l / x, y: f / x };
  },
  lli4: function(r, n, e, i) {
    const s = r.x, u = r.y, o = n.x, c = n.y, l = e.x, f = e.y, x = i.x, a = i.y;
    return h.lli8(s, u, o, c, l, f, x, a);
  },
  lli: function(r, n) {
    return h.lli4(r, r.c, n, n.c);
  },
  makeline: function(r, n) {
    return new _(
      r.x,
      r.y,
      (r.x + n.x) / 2,
      (r.y + n.y) / 2,
      n.x,
      n.y
    );
  },
  findbbox: function(r) {
    let n = W, e = W, i = Y, s = Y;
    return r.forEach(function(u) {
      const o = u.bbox();
      n > o.x.min && (n = o.x.min), e > o.y.min && (e = o.y.min), i < o.x.max && (i = o.x.max), s < o.y.max && (s = o.y.max);
    }), {
      x: { min: n, mid: (n + i) / 2, max: i, size: i - n },
      y: { min: e, mid: (e + s) / 2, max: s, size: s - e }
    };
  },
  shapeintersections: function(r, n, e, i, s) {
    if (!h.bboxoverlap(n, i))
      return [];
    const u = [], o = [r.startcap, r.forward, r.back, r.endcap], c = [e.startcap, e.forward, e.back, e.endcap];
    return o.forEach(function(l) {
      l.virtual || c.forEach(function(f) {
        if (f.virtual)
          return;
        const x = l.intersects(f, s);
        x.length > 0 && (x.c1 = l, x.c2 = f, x.s1 = r, x.s2 = e, u.push(x));
      });
    }), u;
  },
  makeshape: function(r, n, e) {
    const i = n.points.length, s = r.points.length, u = h.makeline(n.points[i - 1], r.points[0]), o = h.makeline(r.points[s - 1], n.points[0]), c = {
      startcap: u,
      forward: r,
      back: n,
      endcap: o,
      bbox: h.findbbox([u, r, n, o])
    };
    return c.intersections = function(l) {
      return h.shapeintersections(
        c,
        c.bbox,
        l,
        l.bbox,
        e
      );
    }, c;
  },
  getminmax: function(r, n, e) {
    if (!e)
      return { min: 0, max: 0 };
    let i = W, s = Y, u, o;
    e.indexOf(0) === -1 && (e = [0].concat(e)), e.indexOf(1) === -1 && e.push(1);
    for (let c = 0, l = e.length; c < l; c++)
      u = e[c], o = r.get(u), o[n] < i && (i = o[n]), o[n] > s && (s = o[n]);
    return { min: i, mid: (i + s) / 2, max: s, size: s - i };
  },
  align: function(r, n) {
    const e = n.p1.x, i = n.p1.y, s = -L(n.p2.y - i, n.p2.x - e), u = function(o) {
      return {
        x: (o.x - e) * j(s) - (o.y - i) * R(s),
        y: (o.x - e) * R(s) + (o.y - i) * j(s)
      };
    };
    return r.map(u);
  },
  roots: function(r, n) {
    n = n || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
    const e = r.length - 1, i = h.align(r, n), s = function(d) {
      return 0 <= d && d <= 1;
    };
    if (e === 2) {
      const d = i[0].y, z = i[1].y, q = i[2].y, k = d - 2 * z + q;
      if (k !== 0) {
        const S = -P(z * z - d * q), A = -d + z, N = -(S + A) / k, U = -(-S + A) / k;
        return [N, U].filter(s);
      } else if (z !== q && k === 0)
        return [(2 * z - q) / (2 * z - 2 * q)].filter(s);
      return [];
    }
    const u = i[0].y, o = i[1].y, c = i[2].y, l = i[3].y;
    let f = -u + 3 * o - 3 * c + l, x = 3 * u - 6 * o + 3 * c, a = -3 * u + 3 * o, y = u;
    if (h.approximately(f, 0)) {
      if (h.approximately(x, 0))
        return h.approximately(a, 0) ? [] : [-y / a].filter(s);
      const d = P(a * a - 4 * x * y), z = 2 * x;
      return [(d - a) / z, (-a - d) / z].filter(s);
    }
    x /= f, a /= f, y /= f;
    const p = (3 * a - x * x) / 3, g = p / 3, v = (2 * x * x * x - 9 * x * a + 27 * y) / 27, O = v / 2, C = O * O + g * g * g;
    let T, w, M, m, E;
    if (C < 0) {
      const d = -p / 3, z = d * d * d, q = P(z), k = -v / (2 * q), S = k < -1 ? -1 : k > 1 ? 1 : k, A = K(S), N = $(q), U = 2 * N;
      return M = U * j(A / 3) - x / 3, m = U * j((A + X) / 3) - x / 3, E = U * j((A + 2 * X) / 3) - x / 3, [M, m, E].filter(s);
    } else {
      if (C === 0)
        return T = O < 0 ? $(-O) : -$(O), M = 2 * T - x / 3, m = -T - x / 3, [M, m].filter(s);
      {
        const d = P(C);
        return T = $(-O + d), w = $(O + d), [T - w - x / 3].filter(s);
      }
    }
  },
  droots: function(r) {
    if (r.length === 3) {
      const n = r[0], e = r[1], i = r[2], s = n - 2 * e + i;
      if (s !== 0) {
        const u = -P(e * e - n * i), o = -n + e, c = -(u + o) / s, l = -(-u + o) / s;
        return [c, l];
      } else if (e !== i && s === 0)
        return [(2 * e - i) / (2 * (e - i))];
      return [];
    }
    if (r.length === 2) {
      const n = r[0], e = r[1];
      return n !== e ? [n / (n - e)] : [];
    }
    return [];
  },
  curvature: function(r, n, e, i, s) {
    let u, o, c, l, f = 0, x = 0;
    const a = h.compute(r, n), y = h.compute(r, e), p = a.x * a.x + a.y * a.y;
    if (i ? (u = P(
      b(a.y * y.z - y.y * a.z, 2) + b(a.z * y.x - y.z * a.x, 2) + b(a.x * y.y - y.x * a.y, 2)
    ), o = b(p + a.z * a.z, 3 / 2)) : (u = a.x * y.y - a.y * y.x, o = b(p, 3 / 2)), u === 0 || o === 0)
      return { k: 0, r: 0 };
    if (f = u / o, x = o / u, !s) {
      const g = h.curvature(r - 1e-3, n, e, i, !0).k, v = h.curvature(r + 1e-3, n, e, i, !0).k;
      l = (v - f + (f - g)) / 2, c = (F(v - f) + F(f - g)) / 2;
    }
    return { k: f, r: x, dk: l, adk: c };
  },
  inflections: function(r) {
    if (r.length < 4)
      return [];
    const n = h.align(r, { p1: r[0], p2: r.slice(-1)[0] }), e = n[2].x * n[1].y, i = n[3].x * n[1].y, s = n[1].x * n[2].y, u = n[3].x * n[2].y, o = 18 * (-3 * e + 2 * i + 3 * s - u), c = 18 * (3 * e - i - 3 * s), l = 18 * (s - e);
    if (h.approximately(o, 0)) {
      if (!h.approximately(c, 0)) {
        let y = -l / c;
        if (0 <= y && y <= 1)
          return [y];
      }
      return [];
    }
    const f = c * c - 4 * o * l, x = Math.sqrt(f), a = 2 * o;
    return h.approximately(a, 0) ? [] : [(x - c) / a, -(c + x) / a].filter(function(y) {
      return 0 <= y && y <= 1;
    });
  },
  bboxoverlap: function(r, n) {
    const e = ["x", "y"], i = e.length;
    for (let s = 0, u, o, c, l; s < i; s++)
      if (u = e[s], o = r[u].mid, c = n[u].mid, l = (r[u].size + n[u].size) / 2, F(o - c) >= l)
        return !1;
    return !0;
  },
  expandbox: function(r, n) {
    n.x.min < r.x.min && (r.x.min = n.x.min), n.y.min < r.y.min && (r.y.min = n.y.min), n.z && n.z.min < r.z.min && (r.z.min = n.z.min), n.x.max > r.x.max && (r.x.max = n.x.max), n.y.max > r.y.max && (r.y.max = n.y.max), n.z && n.z.max > r.z.max && (r.z.max = n.z.max), r.x.mid = (r.x.min + r.x.max) / 2, r.y.mid = (r.y.min + r.y.max) / 2, r.z && (r.z.mid = (r.z.min + r.z.max) / 2), r.x.size = r.x.max - r.x.min, r.y.size = r.y.max - r.y.min, r.z && (r.z.size = r.z.max - r.z.min);
  },
  pairiteration: function(r, n, e) {
    const i = r.bbox(), s = n.bbox(), u = 1e5, o = e || 0.5;
    if (i.x.size + i.y.size < o && s.x.size + s.y.size < o)
      return [
        (u * (r._t1 + r._t2) / 2 | 0) / u + "/" + (u * (n._t1 + n._t2) / 2 | 0) / u
      ];
    let c = r.split(0.5), l = n.split(0.5), f = [
      { left: c.left, right: l.left },
      { left: c.left, right: l.right },
      { left: c.right, right: l.right },
      { left: c.right, right: l.left }
    ];
    f = f.filter(function(a) {
      return h.bboxoverlap(a.left.bbox(), a.right.bbox());
    });
    let x = [];
    return f.length === 0 || (f.forEach(function(a) {
      x = x.concat(
        h.pairiteration(a.left, a.right, o)
      );
    }), x = x.filter(function(a, y) {
      return x.indexOf(a) === y;
    })), x;
  },
  getccenter: function(r, n, e) {
    const i = n.x - r.x, s = n.y - r.y, u = e.x - n.x, o = e.y - n.y, c = i * j(I) - s * R(I), l = i * R(I) + s * j(I), f = u * j(I) - o * R(I), x = u * R(I) + o * j(I), a = (r.x + n.x) / 2, y = (r.y + n.y) / 2, p = (n.x + e.x) / 2, g = (n.y + e.y) / 2, v = a + c, O = y + l, C = p + f, T = g + x, w = h.lli8(a, y, v, O, p, g, C, T), M = h.dist(w, r);
    let m = L(r.y - w.y, r.x - w.x), E = L(n.y - w.y, n.x - w.x), d = L(e.y - w.y, e.x - w.x), z;
    return m < d ? ((m > E || E > d) && (m += X), m > d && (z = d, d = m, m = z)) : d < E && E < m ? (z = d, d = m, m = z) : d += X, w.s = m, w.e = d, w.r = M, w;
  },
  numberSort: function(r, n) {
    return r - n;
  }
};
class G {
  constructor(n) {
    this.curves = [], this._3d = !1, n && (this.curves = n, this._3d = this.curves[0]._3d);
  }
  setJoinC_0() {
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
const { abs: J, min: H, max: Q, cos: nt, sin: et, acos: it, sqrt: D } = Math, rt = Math.PI;
class _ {
  constructor(n) {
    let e = n && n.forEach ? n : Array.from(arguments).slice(), i = !1;
    if (typeof e[0] == "object") {
      i = e.length;
      const p = [];
      e.forEach(function(g) {
        ["x", "y", "z"].forEach(function(v) {
          typeof g[v] < "u" && p.push(g[v]);
        });
      }), e = p;
    }
    let s = !1;
    const u = e.length;
    if (i) {
      if (i > 4) {
        if (arguments.length !== 1)
          throw new Error(
            "Only new Bezier(point[]) is accepted for 4th and higher order curves"
          );
        s = !0;
      }
    } else if (u !== 6 && u !== 8 && u !== 9 && u !== 12 && arguments.length !== 1)
      throw new Error(
        "Only new Bezier(point[]) is accepted for 4th and higher order curves"
      );
    const o = this._3d = !s && (u === 9 || u === 12) || n && n[0] && typeof n[0].z < "u", c = this.points = [];
    for (let p = 0, g = o ? 3 : 2; p < u; p += g) {
      var l = {
        x: e[p],
        y: e[p + 1]
      };
      o && (l.z = e[p + 2]), c.push(l);
    }
    const f = this.order = c.length - 1, x = this.dims = ["x", "y"];
    o && x.push("z"), this.dimlen = x.length;
    const a = h.align(c, { p1: c[0], p2: c[f] }), y = h.dist(c[0], c[f]);
    this._linear = a.reduce((p, g) => p + J(g.y), 0) < y / 50, this._lut = [], this._t1 = 0, this._t2 = 1, this.update();
  }
  static quadraticFromPoints(n, e, i, s) {
    if (typeof s > "u" && (s = 0.5), s === 0)
      return new _(e, e, i);
    if (s === 1)
      return new _(n, e, e);
    const u = _.getABC(2, n, e, i, s);
    return new _(n, u.A, i);
  }
  static cubicFromPoints(n, e, i, s, u) {
    typeof s > "u" && (s = 0.5);
    const o = _.getABC(3, n, e, i, s);
    typeof u > "u" && (u = h.dist(e, o.C));
    const c = u * (1 - s) / s, l = h.dist(n, i), f = (i.x - n.x) / l, x = (i.y - n.y) / l, a = u * f, y = u * x, p = c * f, g = c * x, v = { x: e.x - a, y: e.y - y }, O = { x: e.x + p, y: e.y + g }, C = o.A, T = { x: C.x + (v.x - C.x) / (1 - s), y: C.y + (v.y - C.y) / (1 - s) }, w = { x: C.x + (O.x - C.x) / s, y: C.y + (O.y - C.y) / s }, M = { x: n.x + (T.x - n.x) / s, y: n.y + (T.y - n.y) / s }, m = {
      x: i.x + (w.x - i.x) / (1 - s),
      y: i.y + (w.y - i.y) / (1 - s)
    };
    return new _(n, M, m, i);
  }
  static getUtils() {
    return h;
  }
  getUtils() {
    return _.getUtils();
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
    for (let u = 1, o = n.length; u < o; u++)
      s.push(n[u].x), s.push(n[u].y);
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
  static getABC(n = 2, e, i, s, u = 0.5) {
    const o = h.projectionratio(u, n), c = 1 - o, l = {
      x: o * e.x + c * s.x,
      y: o * e.y + c * s.y
    }, f = h.abcratio(u, n);
    return { A: {
      x: i.x + (i.x - l.x) / f,
      y: i.y + (i.y - l.y) / f
    }, B: i, C: l, S: e, E: s };
  }
  getABC(n, e) {
    e = e || this.get(n);
    let i = this.points[0], s = this.points[this.order];
    return _.getABC(this.order, i, e, s, n);
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
    for (let u = 0, o, c = 0; u < i.length; u++)
      o = i[u], h.dist(o, n) < e && (s.push(o), c += u / i.length);
    return s.length ? t /= s.length : !1;
  }
  project(n) {
    const e = this.getLUT(), i = e.length - 1, s = h.closest(e, n), u = s.mpos, o = (u - 1) / i, c = (u + 1) / i, l = 0.1 / i;
    let f = s.mdist, x = o, a = x, y;
    f += 1;
    for (let p; x < c + l; x += l)
      y = this.compute(x), p = h.dist(n, y), p < f && (f = p, a = x);
    return a = a < 0 ? 0 : a > 1 ? 1 : a, y = this.compute(a), y.t = a, y.d = f, y;
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
    for (let s = 1, u, o; s < i; s++)
      u = n[s], o = n[s - 1], e[s] = {
        x: (i - s) / i * u.x + s / i * o.x,
        y: (i - s) / i * u.y + s / i * o.y
      };
    return e[i] = n[i - 1], new _(e);
  }
  derivative(n) {
    return h.compute(n, this.dpoints[0], this._3d);
  }
  dderivative(n) {
    return h.compute(n, this.dpoints[1], this._3d);
  }
  align() {
    let n = this.points;
    return new _(h.align(n, { p1: n[0], p2: n[n.length - 1] }));
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
    const e = this.derivative(n), i = this.derivative(n + 0.01), s = D(e.x * e.x + e.y * e.y + e.z * e.z), u = D(i.x * i.x + i.y * i.y + i.z * i.z);
    e.x /= s, e.y /= s, e.z /= s, i.x /= u, i.y /= u, i.z /= u;
    const o = {
      x: i.y * e.z - i.z * e.y,
      y: i.z * e.x - i.x * e.z,
      z: i.x * e.y - i.y * e.x
    }, c = D(o.x * o.x + o.y * o.y + o.z * o.z);
    o.x /= c, o.y /= c, o.z /= c;
    const l = [
      o.x * o.x,
      o.x * o.y - o.z,
      o.x * o.z + o.y,
      o.x * o.y + o.z,
      o.y * o.y,
      o.y * o.z - o.x,
      o.x * o.z - o.y,
      o.y * o.z + o.x,
      o.z * o.z
    ];
    return {
      x: l[0] * e.x + l[1] * e.y + l[2] * e.z,
      y: l[3] * e.x + l[4] * e.y + l[5] * e.z,
      z: l[6] * e.x + l[7] * e.y + l[8] * e.z
    };
  }
  hull(n) {
    let e = this.points, i = [], s = [], u = 0;
    for (s[u++] = e[0], s[u++] = e[1], s[u++] = e[2], this.order === 3 && (s[u++] = e[3]); e.length > 1; ) {
      i = [];
      for (let o = 0, c, l = e.length - 1; o < l; o++)
        c = h.lerp(n, e[o], e[o + 1]), s[u++] = c, i.push(c);
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
      left: this.order === 2 ? new _([i[0], i[3], i[5]]) : new _([i[0], i[4], i[7], i[9]]),
      right: this.order === 2 ? new _([i[5], i[4], i[2]]) : new _([i[9], i[8], i[6], i[3]]),
      span: i
    };
    return s.left._t1 = h.map(0, 0, 1, this._t1, this._t2), s.left._t2 = h.map(n, 0, 1, this._t1, this._t2), s.right._t1 = h.map(n, 0, 1, this._t1, this._t2), s.right._t2 = h.map(1, 0, 1, this._t1, this._t2), e ? (e = h.map(e, n, 1, 0, 1), s.right.split(e).left) : s;
  }
  extrema() {
    const n = {};
    let e = [];
    return this.dims.forEach(
      function(i) {
        let s = function(o) {
          return o[i];
        }, u = this.dpoints[0].map(s);
        n[i] = h.droots(u), this.order === 3 && (u = this.dpoints[1].map(s), n[i] = n[i].concat(h.droots(u))), n[i] = n[i].filter(function(o) {
          return o >= 0 && o <= 1;
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
      const i = this.get(n), s = this.normal(n), u = {
        c: i,
        n: s,
        x: i.x + s.x * e,
        y: i.y + s.y * e
      };
      return this._3d && (u.z = i.z + s.z * e), u;
    }
    if (this._linear) {
      const i = this.normal(0), s = this.points.map(function(u) {
        const o = {
          x: u.x + n * i.x,
          y: u.y + n * i.y
        };
        return u.z && i.z && (o.z = u.z + n * i.z), o;
      });
      return [new _(s)];
    }
    return this.reduce().map(function(i) {
      return i._linear ? i.offset(n)[0] : i.scale(n);
    });
  }
  simple() {
    if (this.order === 3) {
      const s = h.angle(this.points[0], this.points[3], this.points[1]), u = h.angle(this.points[0], this.points[3], this.points[2]);
      if (s > 0 && u < 0 || s < 0 && u > 0)
        return !1;
    }
    const n = this.normal(0), e = this.normal(1);
    let i = n.x * e.x + n.y * e.y;
    return this._3d && (i += n.z * e.z), J(it(i)) < rt / 3;
  }
  reduce() {
    let n, e = 0, i = 0, s = 0.01, u, o = [], c = [], l = this.extrema().values;
    for (l.indexOf(0) === -1 && (l = [0].concat(l)), l.indexOf(1) === -1 && l.push(1), e = l[0], n = 1; n < l.length; n++)
      i = l[n], u = this.split(e, i), u._t1 = e, u._t2 = i, o.push(u), e = i;
    return o.forEach(function(f) {
      for (e = 0, i = 0; i <= 1; )
        for (i = e + s; i <= 1 + s; i += s)
          if (u = f.split(e, i), !u.simple()) {
            if (i -= s, J(e - i) < s)
              return [];
            u = f.split(e, i), u._t1 = h.map(e, 0, 1, f._t1, f._t2), u._t2 = h.map(i, 0, 1, f._t1, f._t2), c.push(u), e = i;
            break;
          }
      e < 1 && (u = f.split(e, 1), u._t1 = h.map(e, 0, 1, f._t1, f._t2), u._t2 = f._t2, c.push(u));
    }), c;
  }
  translate(n, e, i) {
    i = typeof i == "number" ? i : e;
    const s = this.order;
    let u = this.points.map((o, c) => (1 - c / s) * e + c / s * i);
    return new _(
      this.points.map((o, c) => ({
        x: o.x + n.x * u[c],
        y: o.y + n.y * u[c]
      }))
    );
  }
  scale(n) {
    const e = this.order;
    let i = !1;
    if (typeof n == "function" && (i = n), i && e === 2)
      return this.raise().scale(i);
    const s = this.clockwise, u = this.points;
    if (this._linear)
      return this.translate(
        this.normal(0),
        i ? i(0) : n,
        i ? i(1) : n
      );
    const o = i ? i(0) : n, c = i ? i(1) : n, l = [this.offset(0, 10), this.offset(1, 10)], f = [], x = h.lli4(l[0], l[0].c, l[1], l[1].c);
    if (!x)
      throw new Error("cannot scale this curve. Try reducing it first.");
    return [0, 1].forEach(function(a) {
      const y = f[a * e] = h.copy(u[a * e]);
      y.x += (a ? c : o) * l[a].n.x, y.y += (a ? c : o) * l[a].n.y;
    }), i ? ([0, 1].forEach(function(a) {
      if (!(e === 2 && a)) {
        var y = u[a + 1], p = {
          x: y.x - x.x,
          y: y.y - x.y
        }, g = i ? i((a + 1) / e) : n;
        i && !s && (g = -g);
        var v = D(p.x * p.x + p.y * p.y);
        p.x /= v, p.y /= v, f[a + 1] = {
          x: y.x + g * p.x,
          y: y.y + g * p.y
        };
      }
    }), new _(f)) : ([0, 1].forEach((a) => {
      if (e === 2 && a)
        return;
      const y = f[a * e], p = this.derivative(a), g = { x: y.x + p.x, y: y.y + p.y };
      f[a + 1] = h.lli4(y, g, x, u[a + 1]);
    }), new _(f));
  }
  outline(n, e, i, s) {
    if (e = e === void 0 ? n : e, this._linear) {
      const m = this.normal(0), E = this.points[0], d = this.points[this.points.length - 1];
      let z, q, k;
      i === void 0 && (i = n, s = e), z = { x: E.x + m.x * n, y: E.y + m.y * n }, k = { x: d.x + m.x * i, y: d.y + m.y * i }, q = { x: (z.x + k.x) / 2, y: (z.y + k.y) / 2 };
      const S = [z, q, k];
      z = { x: E.x - m.x * e, y: E.y - m.y * e }, k = { x: d.x - m.x * s, y: d.y - m.y * s }, q = { x: (z.x + k.x) / 2, y: (z.y + k.y) / 2 };
      const A = [k, q, z], N = h.makeline(A[2], S[0]), U = h.makeline(S[2], A[0]), Z = [N, new _(S), U, new _(A)];
      return new G(Z);
    }
    const u = this.reduce(), o = u.length, c = [];
    let l = [], f, x = 0, a = this.length();
    const y = typeof i < "u" && typeof s < "u";
    function p(m, E, d, z, q) {
      return function(k) {
        const S = z / d, A = (z + q) / d, N = E - m;
        return h.map(k, 0, 1, m + S * N, m + A * N);
      };
    }
    u.forEach(function(m) {
      const E = m.length();
      y ? (c.push(
        m.scale(p(n, i, a, x, E))
      ), l.push(
        m.scale(p(-e, -s, a, x, E))
      )) : (c.push(m.scale(n)), l.push(m.scale(-e))), x += E;
    }), l = l.map(function(m) {
      return f = m.points, f[3] ? m.points = [f[3], f[2], f[1], f[0]] : m.points = [f[2], f[1], f[0]], m;
    }).reverse();
    const g = c[0].points[0], v = c[o - 1].points[c[o - 1].points.length - 1], O = l[o - 1].points[l[o - 1].points.length - 1], C = l[0].points[0], T = h.makeline(O, g), w = h.makeline(v, C), M = [T].concat(c).concat([w]).concat(l);
    return new G(M);
  }
  outlineshapes(n, e, i) {
    e = e || n;
    const s = this.outline(n, e).curves, u = [];
    for (let o = 1, c = s.length; o < c / 2; o++) {
      const l = h.makeshape(
        s[o],
        s[c - o],
        i
      );
      l.startcap.virtual = o > 1, l.endcap.virtual = o < c / 2 - 1, u.push(l);
    }
    return u;
  }
  intersects(n, e) {
    return n ? n.p1 && n.p2 ? this.lineIntersects(n) : (n instanceof _ && (n = n.reduce()), this.curveintersects(
      this.reduce(),
      n,
      e
    )) : this.selfintersects(e);
  }
  lineIntersects(n) {
    const e = H(n.p1.x, n.p2.x), i = H(n.p1.y, n.p2.y), s = Q(n.p1.x, n.p2.x), u = Q(n.p1.y, n.p2.y);
    return h.roots(this.points, n).filter((o) => {
      var c = this.get(o);
      return h.between(c.x, e, s) && h.between(c.y, i, u);
    });
  }
  selfintersects(n) {
    const e = this.reduce(), i = e.length - 2, s = [];
    for (let u = 0, o, c, l; u < i; u++)
      c = e.slice(u, u + 1), l = e.slice(u + 2), o = this.curveintersects(c, l, n), s.push(...o);
    return s;
  }
  curveintersects(n, e, i) {
    const s = [];
    n.forEach(function(o) {
      e.forEach(function(c) {
        o.overlaps(c) && s.push({ left: o, right: c });
      });
    });
    let u = [];
    return s.forEach(function(o) {
      const c = h.pairiteration(
        o.left,
        o.right,
        i
      );
      c.length > 0 && (u = u.concat(c));
    }), u;
  }
  arcs(n) {
    return n = n || 0.5, this._iterate(n, []);
  }
  _error(n, e, i, s) {
    const u = (s - i) / 4, o = this.get(i + u), c = this.get(s - u), l = h.dist(n, e), f = h.dist(n, o), x = h.dist(n, c);
    return J(f - l) + J(x - l);
  }
  _iterate(n, e) {
    let i = 0, s = 1, u;
    do {
      u = 0, s = 1;
      let o = this.get(i), c, l, f, x, a = !1, y = !1, p, g = s, v = 1;
      do
        if (y = a, x = f, g = (i + s) / 2, c = this.get(g), l = this.get(s), f = h.getccenter(o, c, l), f.interval = {
          start: i,
          end: s
        }, a = this._error(f, o, i, s) <= n, p = y && !a, p || (v = s), a) {
          if (s >= 1) {
            if (f.interval.end = v = 1, x = f, s > 1) {
              let C = {
                x: f.x + f.r * nt(f.e),
                y: f.y + f.r * et(f.e)
              };
              f.e += h.angle({ x: f.x, y: f.y }, C, this.get(1));
            }
            break;
          }
          s = s + (s - i) / 2;
        } else
          s = g;
      while (!p && u++ < 100);
      if (u >= 100)
        break;
      x = x || f, e.push(x), i = v;
    } while (s < 1);
    return e;
  }
}
function st(r, n, e) {
  var i, s;
  if (r.length == 3 && n.length == 3)
    i = new _(r[0], n[0], r[1], n[1], r[2], n[2]), s = "quadratic";
  else if (r.length == 4 && n.length == 4)
    i = new _(r[0], n[0], r[1], n[1], r[2], n[2], r[3], n[3]), s = "cubic";
  else
    throw new Error("Invalid curve input control points.");
  return e && console.log(`Bézier ${s} curve:
`, i), i;
}
function ot(r) {
  var n = 1e3;
  for (let e = 0, i, s; e < n; e++)
    s = e / (n - 1), i = r.compute(s), i.t = s, r._lut.push(i);
  return r._lut;
}
function ut(r, n = 100) {
  return r.getLUT(n), r._lut;
}
function ct(r) {
  return r._curvelength = r.length();
}
function lt(r, n, e) {
  return e ? r._curvepoint = r.get(n) : r.get(n);
}
function ft(r, n) {
  var e = r.derivative(n);
  return e.x *= 1 / (r._t2 - r._t1), e.y *= 1 / (r._t2 - r._t1), r._derivative = e;
}
function at(r, n) {
  for (var e = [], i = 0, s = 0; i <= 1; i += n, s++)
    e[s] = r.derivative(i), e[s].x *= 1 / (r._t2 - r._t1), e[s].y *= 1 / (r._t2 - r._t1);
  return r._derivatives = e;
}
function ht(r, n, e) {
  return e ? { x: r.normal(n).x, y: r.normal(n).y, t: n } : r._normal = { x: r.normal(n).x, y: r.normal(n).y, t: n };
}
function xt(r, n) {
  for (var e = [], i = 0, s = 0; i <= 1; i += n, s++)
    e[s] = { x: r.normal(i).x, y: r.normal(i).y, t: i };
  return r._normals = e;
}
function yt(r, n, e) {
  return e ? r._subcurve = r.split(n, e) : r._subcurves = [r.split(n).left, r.split(n).right];
}
function pt(r) {
  return r._extremas = r.extrema();
}
function mt(r) {
  return r._inflectionpoints = r.inflections();
}
function dt(r, n) {
  return r._curvature = { k: r.curvature(n).k, r: r.curvature(n).r, t: n };
}
function gt(r, n = 2) {
  for (var e = [], i = 0, s = 0; i < 256; i += n, s++) {
    let u = i / 255;
    e[s] = { k: r.curvature(u).k, r: r.curvature(u).r, t: u };
  }
  return r._curvatures = e;
}
function zt(r) {
  return r._boundingbox = r.bbox();
}
function _t(r, n) {
  return r._hullpoints = r.hull(n);
}
function vt(r, n) {
  return r._projectpoint = r.project(n);
}
function wt(r, n, e) {
  return e ? r._offsetpoint = r.offset(e, n) : r._offsetcurves = r.offset(n);
}
function kt(r) {
  return r._reducedcurves = r.reduce();
}
function Ct(r, n = 0.5) {
  return r._arcs = r.arcs(n);
}
function Et(r, n) {
  for (var e = [], i = -30, s = 0; i <= 30; i += 10, s++)
    e[s] = n.scale(i);
  return r._scaledcurves = e;
}
function Ot(r, n, e, i, s) {
  return s ? r._outline = r.outline(n, e, i, s) : i ? r._outline = r.outline(n, e, i) : e ? r._outline = r.outline(n, e) : r._outline = r.outline(n);
}
function qt(r, n, e, i) {
  return i ? r._shapedoutline = r.outlineshapes(n, e, i) : e ? r._shapedoutline = r.outlineshapes(n, e) : r._shapedoutline = r.outlineshapes(n);
}
function Tt(r, n, e = 0.5) {
  if (n)
    return n instanceof _ ? r._intersection = r.intersects(n, e) : r._intersection = r.intersects(n);
  if (r.order == 2)
    return r._intersection = "no self intersection";
  if (r.order == 3)
    return r._intersection = r.intersects();
}
function At(r, n, e) {
  return e ? r.offset(n, e) : r.offset(n);
}
export {
  Ct as calculateArcs,
  zt as calculateBoundingBox,
  vt as calculateClosestPoint,
  dt as calculateCurvature,
  gt as calculateCurvatures,
  pt as calculateCurveExtremas,
  ot as calculateCurvePoints,
  _t as calculateHullPoints,
  mt as calculateInflectionPoints,
  Tt as calculateIntersection,
  ct as calculateLength,
  ht as calculateNormal,
  xt as calculateNormals,
  wt as calculateOffset,
  Ot as calculateOutline,
  kt as calculateReducedCurve,
  Et as calculateScaledCurve,
  qt as calculateShapedOutline,
  ft as calculateTangent,
  at as calculateTangents,
  st as getCurve,
  lt as getCurvePoint,
  ut as getLookUpTable,
  At as getOffsetCurve,
  yt as splitCurve
};
//# sourceMappingURL=calculation.js.map
