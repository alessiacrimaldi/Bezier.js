export default class CodeArea {
    static count = 0;
    #w;
    #h;
    #cvs;
    #ctx;

    constructor(w, h, target, type, restart, params) {
        const id = ++CodeArea.count;
        this.#w = w;
        this.#h = h;

        let sliders = "";
        params?.forEach(p => {
            sliders += `<div class="slider">
                <label class="slider-value">${p.name}: <span>${p.value}</span></label>
                <input class="slide-control" type="range" min="${p.min}" max="${p.max}" step="${p.step}" value="${p.value}" />
            </div>`
        })

        const container = document.querySelector(target);
        container.insertAdjacentHTML('beforeend', `
            <div class="demo-example" id="example-${id}">
                <p class="example-type">${type}</p>
                <canvas width=${w} height=${h}></canvas>
                <div class="example-attributes">
                    <button class="restart-btn">Restart</button>
                    ${sliders}
                </div>
            </div>`);

        const example = container.querySelector(`#example-${id}`);
        const cvs = (this.#cvs = example.querySelector("canvas"));
        this.#ctx = cvs.getContext("2d");

        example.querySelector("button").addEventListener("click", () => {
            example.querySelectorAll(".slider").forEach((slider, i) => {
                slider.querySelector("span").innerHTML = slider.querySelector("input").value =  params[i].value;
            })
            restart()
        })
        example.querySelectorAll(".slider").forEach((slider, i) => {
            const span = slider.querySelector("span");
            slider.querySelector("input").addEventListener("input", (e) => {
                const currValue = e.target.value;
                span.innerHTML = currValue;
                params[i].handler(currValue);
            })
        })
    }

    get canvas() {
        return this.#cvs;
    }

    get context() {
        return this.#ctx;
    }

    clear() {
        this.context.clearRect(0, 0, this.#w, this.#h);
    }
}