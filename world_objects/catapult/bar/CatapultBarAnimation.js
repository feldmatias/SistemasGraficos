import {Animation} from "../../../objects/Animation.js";

export class CatapultBarAnimation extends Animation {

    constructor(catapultBar) {
        super();

        this.velocity = 30;
        this.maxAngle = 60;

        this.currentAngle = 0;
        this.catapultBar = catapultBar;
    }

    next() {
        this.moveCatapultBar();

        if (this.currentAngle >= this.maxAngle) {
            this.velocity *= -1;
        }
        if (this.currentAngle < 0) {
            this.velocity *= -1;
            this.stop();
        }
    }

    moveCatapultBar() {
        let angle = this.velocity / 60 * Math.PI / 180;
        this.currentAngle += this.velocity / 60;
        this.catapultBar.move(angle);
    }
}