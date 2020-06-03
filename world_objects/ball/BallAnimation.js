import {Animation} from "../../objects/Animation.js";

export class BallAnimation extends Animation {

    constructor(ball, catapultBall, world) {
        super();
        this.ball = ball;
        this.catapultBall = catapultBall;
        this.world = world;
        this.i = 0;
    }

    reset() {
        this.ball.show();
        this.catapultBall.hide();

        let matrix = mat4.clone(this.catapultBall.worldModelMatrix);
        let parentMatrix = mat4.clone(this.world.modelMatrix);
        mat4.invert(parentMatrix, parentMatrix);
        mat4.multiply(matrix, parentMatrix, matrix); // Remove world transformations because it will be applied in each draw
        this.ball.setMatrix(matrix);

        this.i = 0;
    }

    next() {
        this.i ++;
        if (this.i > 300){
            this.stop();
        }
    }

    stop() {
        this.ball.hide();
        this.catapultBall.show();
        super.stop();
    }

}