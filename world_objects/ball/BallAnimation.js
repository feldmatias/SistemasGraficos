import {Animation} from "../../objects/Animation.js";

export class BallAnimation extends Animation {

    constructor(ball, catapultBall, world) {
        super();
        this.ball = ball;
        this.catapultBall = catapultBall;
        this.world = world;

        this.velocity = 25;
        this.angle = 30 * Math.PI / 180;
    }

    reset() {
        this.ball.show();
        this.catapultBall.hide();

        this.setBallInitialMatrix();

        this.time = 0;
        this.initialPosition = this.catapultBall.getPosition();
        this.lastPosition = this.initialPosition;

    }

    next() {
        this.time += 1 / 60;

        let x = this.initialPosition[0] + this.velocity * Math.cos(this.angle) * this.time;
        let y = this.initialPosition[1] + this.velocity * Math.sin(this.angle) * this.time - 5 * this.time * this.time;
        let position = vec3.fromValues(x, y, 0);

        if (y < 0){
            this.stop();
            return;
        }

        let translation = vec3.create();
        vec3.subtract(translation, position, this.lastPosition);
        this.lastPosition = position;

        this.ball.translate(translation[0], translation[1], 0);
    }

    stop() {
        this.ball.hide();
        this.catapultBall.show();
        super.stop();
    }

    setBallInitialMatrix() {
        let matrix = mat4.clone(this.catapultBall.worldModelMatrix);  // Copy other ball's matrix

        let parentMatrix = mat4.clone(this.world.modelMatrix);
        mat4.invert(parentMatrix, parentMatrix);
        mat4.multiply(matrix, parentMatrix, matrix); // Remove world transformations because they will be applied in each draw

        let position = vec3.create();
        mat4.getTranslation(position, matrix);  // Get current position of catapult ball

        matrix = mat4.create();
        mat4.translate(matrix, matrix, position);  // Translate world ball to current position
        mat4.scale(matrix, matrix, this.catapultBall.getScale());
        mat4.rotateY(matrix, matrix, Math.PI / 2);

        this.ball.setMatrix(matrix);
    }
}