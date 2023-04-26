export default class CodeArea {
    static count = 0;

    constructor(w, h, title, type, target) {
        const id = ++CodeArea.count;
        this.w = w;
        this.h = h;
        const container = document.querySelector(target);
        container.insertAdjacentHTML('beforeend', `
        <section id="demo-${id}" class="demo">
            <h3 class="demo-title">${title}</h3>
            <div class="demo-example">
                <p class="example-type">${type}</p>
                <canvas width=${w} height=${h}></canvas>
                <div class="example-attributes">
                    <div class="slider">
                        <div class="slider-value">t: 0.5</div>
                        <input type="range" min="0" max="1" step="0.01" value="0.5" class="slide-control" />
                    </div>
                    <button class="restart-btn">Restart</button>
                </div>
            </div>
        </section>`)

        const section = container.querySelector(`#demo-${id}`);
        this.cvs = section.querySelector("canvas");
        this.ctx = this.cvs.getContext("2d");
        section.querySelector("button").addEventListener("click", () => {
            this.restart()
        })
    }

    get canvas() {
        return this.cvs;
    }

    get context() {
        return this.ctx;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.w, this.h);
    }

    restart() {
        // to do
    }
}