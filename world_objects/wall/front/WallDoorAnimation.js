import {Animation} from "../../../objects/Animation.js";

export class WallDoorAnimation extends Animation {

    constructor(door) {
        super();

        this.velocity = 15;
        this.maxTimeStopped = 200;

        this.currentAngle = 0;
        this.timeStopped = 0;
        this.door = door;

        this.start();
    }

    next() {
        if (this.timeStopped === 0) {
            let angle = this.velocity / 60;
            this.currentAngle += angle;

            this.door.move(angle * Math.PI / 180);
        }

        this.checkNextAnimation();
    }

    checkNextAnimation() {
        if (this.currentAngle >= 90 || this.currentAngle < 0) {
            this.timeStopped += 1;
        }

        if (this.timeStopped > this.maxTimeStopped) {
            this.timeStopped = 0;

            if (this.currentAngle >= 90) {
                this.currentAngle = 90;
                this.velocity *= -1;
            }

            if (this.currentAngle < 0) {
                this.currentAngle = 0;
                this.velocity *= -1;
            }
        }
    }

}