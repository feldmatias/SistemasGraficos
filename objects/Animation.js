export class Animation {

    constructor() {
        this.animating = false;
    }

    start() {
        this.animating = true;
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

    }
}