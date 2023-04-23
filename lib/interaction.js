import * as drawing from "./drawing.js";
import * as calculation from "./calculation.js";


export default function handleInteraction(cvs, ctx, type, btn, fn) {
    var C = 10;
    var dragok = false;
    var loc;
    var point = [];
    var xt = [], yt = [];
    var n = 3, np = 0, flag = 0;

    function clear() {
        ctx.clearRect(0, 0, 350, 300);
    }

    function restart() {
        np = 0;
        flag = 0;
        xt = [], yt = [];
        clear();
    }

    function windowToCanvas(cvs, x, y) {
        var bbox = cvs.getBoundingClientRect();
        return {
            x: Math.round(x - bbox.left * (cvs.width / bbox.width)),
            y: Math.round(y - bbox.top * (cvs.height / bbox.height))
        };
    }

    cvs.addEventListener("mousedown", function (e) {
        if (np == 0) {
            flag = 0;
            clear();
        }
        if (np < n && flag == 0) {
            loc = windowToCanvas(cvs, e.pageX, e.pageY);
            xt[np] = loc.x;
            yt[np] = loc.y;
            drawing.drawPoint(xt[np], yt[np]);
            np++;
            if (np == n) {
                flag = 1;
                fn(calculation.getCurve(xt, yt));
            }
        }
        else {
            point = [];
            loc = windowToCanvas(cvs, e.pageX, e.pageY);
            for (var i = 0; i < n; i++)
                if (loc.x < xt[i] + C && loc.x > xt[i] - C &&
                    loc.y < yt[i] + C && loc.y > yt[i] - C) {
                    xt[i] = loc.x;
                    yt[i] = loc.y;
                    point[i] = true;
                }
            dragok = true;
        }
    });

    cvs.addEventListener("mousemove", function (e) {
        if (dragok) {
            for (var i = 0; i < n; i++)
                if (point[i]) {
                    loc = windowToCanvas(cvs, e.pageX, e.pageY);
                    xt[i] = loc.x;
                    yt[i] = loc.y;
                }
            clear();
            fn(calculation.getCurve(xt, yt));
        }
    });

    cvs.addEventListener("mouseup", function (e) {
        point = [];
        dragok = false;
        if (np == n) {
            clear();
            fn(calculation.getCurve(xt, yt, true), e); //continuous mouse interaction
        }
    });

    type.addEventListener("change", function (e) {
        restart();
        console.clear();
        var value = type.options[type.selectedIndex].value;
        if (value == "quadratic") {
            n = 3;
        } else if (value == "cubic") {
            n = 4;
        }
    });

    btn.addEventListener("click", function () {
        restart();
        console.clear();
    });
}