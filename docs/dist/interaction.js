function handleInteraction(cvs, movable, update) {
  const ctx = cvs.getContext("2d");
  let isMoving = false, mx = 0, my = 0, sx = 0, sy = 0, points, selectedPoint, selectedCurve;
  const isMouseNearPoint = (p) => Math.abs(mx - p.x) < 10 && Math.abs(my - p.y) < 10;
  cvs.addEventListener("mousedown", (e) => {
    mx = e.offsetX;
    my = e.offsetY;
    if (movable.length > 1) {
      movable.forEach((c) => {
        points = c.points;
        points.forEach((p) => {
          if (isMouseNearPoint(p)) {
            isMoving = true;
            selectedPoint = p;
            selectedCurve = c;
            sx = p.x;
            sy = p.y;
            return;
          }
        });
      });
    } else {
      points = movable.points;
      points.forEach((p) => {
        if (isMouseNearPoint(p)) {
          isMoving = true;
          selectedPoint = p;
          sx = p.x;
          sy = p.y;
          return;
        }
      });
    }
  });
  cvs.addEventListener("mousemove", (e) => {
    if (!isMoving)
      return;
    selectedPoint.x = sx + (e.offsetX - mx);
    selectedPoint.y = sy + (e.offsetY - my);
    selectedCurve ? selectedCurve.update() : movable.update();
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    update();
  });
  cvs.addEventListener("mouseup", (e) => {
    isMoving = false;
    selectedPoint = void 0;
    selectedCurve = void 0;
  });
}
export {
  handleInteraction as default
};
//# sourceMappingURL=interaction.js.map
