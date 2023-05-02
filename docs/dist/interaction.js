function E(n, o, c) {
  const y = n.getContext("2d");
  let f = !1, a = 0, u = 0, h = 0, x = 0, i, s, d;
  const l = (e) => Math.abs(a - e.x) < 10 && Math.abs(u - e.y) < 10;
  n.addEventListener("mousedown", (e) => {
    a = e.offsetX, u = e.offsetY, o.length > 1 ? o.forEach((t) => {
      i = t.points, i.forEach((r) => {
        if (l(r)) {
          f = !0, s = r, d = t, h = r.x, x = r.y;
          return;
        }
      });
    }) : (i = o.points, i.forEach((t) => {
      if (l(t)) {
        f = !0, s = t, h = t.x, x = t.y;
        return;
      }
    }));
  }), n.addEventListener("mousemove", (e) => {
    f && (s.x = h + (e.offsetX - a), s.y = x + (e.offsetY - u), d ? d.update() : o.update(), y.clearRect(0, 0, n.width, n.height), c());
  }), n.addEventListener("mouseup", (e) => {
    f = !1, s = void 0, d = void 0;
  });
}
export {
  E as default
};
//# sourceMappingURL=interaction.js.map
