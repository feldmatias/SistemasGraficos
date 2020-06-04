import {Animation} from "../../objects/Animation.js";

export class BallAnimation extends Animation {

    constructor(ball, catapultBall, world) {
        super();
        this.ball = ball;
        this.catapultBall = catapultBall;
        this.world = world;

        this.velocity = 25;
        this.angle = 40 * Math.PI / 180;
    }

    reset() {
        this.ball.show();
        this.catapultBall.hide();

        let matrix = mat4.create();
        mat4.translate(matrix, matrix, this.catapultBall.getPosition());
        mat4.scale(matrix, matrix, this.catapultBall.getScale());
        mat4.rotateY(matrix, matrix, Math.PI / 2);
        this.ball.setMatrix(matrix);

        this.time = 0;
        this.initialPosition = this.catapultBall.getPosition();
        this.lastPosition = this.initialPosition;
    }

    next() {

        let x = this.initialPosition[0] + this.velocity * Math.cos(this.angle) * this.time;
        let y = this.initialPosition[1] + this.velocity * Math.sin(this.angle) * this.time - 5 * this.time * this.time;
        let position = vec3.fromValues(x, y, 0);

        if (y <= 0){
            this.stop();
            return;
        }

        let translation = vec3.create();
        vec3.subtract(translation, position, this.lastPosition);
        this.lastPosition = position;

        this.ball.translate(translation[0], translation[1], 0);

        this.time += 1 / 60;
    }

    stop() {
        this.ball.hide();
        this.catapultBall.show();
        super.stop();
    }

}