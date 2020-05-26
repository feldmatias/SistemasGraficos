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
            this.currentAngle = this.maxAngle;
            this.velocity *= -0.5;
        }
        if (this.currentAngle < 0) {
            this.currentAngle = 0;
            this.velocity *= -2;
            this.stop();
        }
    }

    moveCatapultBar() {
        let angle = this.velocity / 60;
        this.currentAngle += angle;
        this.catapultBar.move(angle * Math.PI / 180);
    }
}