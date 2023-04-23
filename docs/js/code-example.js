class CodeExample {
    constructor() {
        var cvs = (this.cvs = document.querySelector("canvas"));
        cvs.width = 350;
        cvs.height = 300;
        this.ctx = cvs.getContext("2d");
        this.curveType = document.getElementById("curve-type");
        this.restartBtn = document.getElementById("restart-btn");
    }

    getCanvas() {
        return this.cvs;
    }

    getContext() {
        return this.ctx;
    }

    getCurveType() {
        return this.curveType;
    }

    getRestartBtn() {
        return this.restartBtn;
    }
}

export { CodeExample }