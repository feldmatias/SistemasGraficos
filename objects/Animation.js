export class Animation {

    constructor() {
        this.animating = false;
    }

    start() {
        if (!this.animating) {
            this.reset();
            this.animating = true;
        }
    }

    stop() {
        this.animating = false;
    }

    animate() {
        if (this.animating) {
            this.next();
        }
    }

    next() {
        throw "Not implemented";
    }

    reset() {
        // Do nothing
    }
}