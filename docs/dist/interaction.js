function E(n, f, m) {
  const y = n.getContext("2d");
  let i = !1, r = 0, u = 0, h = 0, l = 0, a, o, s;
  const x = (e) => Math.abs(r - e.x) < 10 && Math.abs(u - e.y) < 10;
  n.addEventListener("mousedown", (e) => {
    r = e.offsetX, u = e.offsetY, f.length > 1 ? f.forEach((t) => {
      a = t.points, a.forEach((d) => {
        if (x(d)) {
          i = !0, o = d, s = t, h = d.x, l = d.y;
          return;
        }
      });
    }) : (a = f.points, a.forEach((t) => {
      if (x(t)) {
        i = !0, o = t, h = t.x, l = t.y;
        return;
      }
    }));
  }), n.addEventListener("mousemove", (e) => {
    i && (o.x = h + (e.offsetX - r), o.y = l + (e.offsetY - u), s ? s.update() : f.update(), y.clearRect(0, 0, n.width, n.height), m());
  }), n.addEventListener("mouseup", (e) => {
    i = !1, o = void 0, s = void 0;
  });
}
export {
  E as default
};
//# sourceMappingURL=interaction.js.map
