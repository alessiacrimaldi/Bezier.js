function x(s, i, u) {
  let o = !1, a = 0, f = 0, d = 0, r = 0, t;
  const l = i.points, m = (e) => Math.abs(a - e.x) < 10 && Math.abs(f - e.y) < 10;
  s.addEventListener("mousedown", (e) => {
    a = e.offsetX, f = e.offsetY, l.forEach((n) => {
      if (m(n)) {
        o = !0, t = n, d = n.x, r = n.y;
        return;
      }
    });
  }), s.addEventListener("mousemove", (e) => {
    o && (t.x = d + (e.offsetX - a), t.y = r + (e.offsetY - f), i.update(), u());
  }), s.addEventListener("mouseup", (e) => {
    o = !1, t = void 0;
  });
}
export {
  x as default
};
//# sourceMappingURL=interaction.js.map
