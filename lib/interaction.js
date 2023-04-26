export default function handleInteraction(cvs, curve, draw) {
    let moving = false,
    mx = 0,
    my = 0,
    sx = 0,
    sy = 0,
    selectedPoint;

    const points = curve.points;
    const isMouseNearPoint = (p) => Math.abs(mx - p.x) < 10 && Math.abs(my - p.y) < 10

    cvs.addEventListener("mousedown", (e) => {
        mx = e.offsetX;
        my = e.offsetY;

        points.forEach(p => {
            if (isMouseNearPoint(p)) {
                moving = true;
                selectedPoint = p; // p: puntatore al punto della curva
                sx = p.x;
                sy = p.y;
                return;
            }
        });
    });

    cvs.addEventListener("mousemove", (e) => {
        if (!moving) return;
        // Aggiorna le coordinate del punto selezionato con le coordinate
        // del mouse considerando l'offset iniziale.
        // Essendo p un puntatore verso il punto selezionato (mosso), le
        // coordinate del punto nella curva vengono aggiornate all'aggiornamento
        // di selectedPoint
        selectedPoint.x = sx + (e.offsetX - mx);
        selectedPoint.y = sy + (e.offsetY - my);
        curve.update()
        draw()
    });

    cvs.addEventListener("mouseup", (e) => {
        moving = false;
        selectedPoint = undefined;
    });
}