import {Animation} from "../../../objects/Animation.js";

export class CatapultBarAnimation extends Animation {

    constructor(catapultBar, catapultBackHandle) {
        super();

        this.velocity = 30;
        this.maxAngle = 60;

        this.currentAngle = 0;
        this.catapultBar = catapultBar;
        this.catapultBackHandle = catapultBackHandle;
    }

    next() {
        let angle = this.velocity / 60;
        this.currentAngle += angle;

        this.catapultBar.move(angle * Math.PI / 180);
        this.catapultBackHandle.move(angle * Math.PI / 180);

        this.checkNextAnimation();
    }

    checkNextAnimation() {
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
}