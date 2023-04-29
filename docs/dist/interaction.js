function m(t, f, u) {
  const x = t.getContext("2d");
  let s = !1, a = 0, i = 0, d = 0, r = 0, n;
  const h = f.points, l = (e) => Math.abs(a - e.x) < 10 && Math.abs(i - e.y) < 10;
  t.addEventListener("mousedown", (e) => {
    a = e.offsetX, i = e.offsetY, h.forEach((o) => {
      if (l(o)) {
        s = !0, n = o, d = o.x, r = o.y;
        return;
      }
    });
  }), t.addEventListener("mousemove", (e) => {
    s && (n.x = d + (e.offsetX - a), n.y = r + (e.offsetY - i), f.update(), x.clearRect(0, 0, t.width, t.height), u());
  }), t.addEventListener("mouseup", (e) => {
    s = !1, n = void 0;
  });
}
export {
  m as default
};
//# sourceMappingURL=interaction.js.map
