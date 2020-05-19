import { Path } from "./Path.js";

export class CirclePath extends Path {

    constructor(radius, angle = 360, step = 5) {
        super();
        this.radius = radius;
        this.angle = angle;
        this.step = step;
    }

    getLevelsCount() {
        return this.angle / this.step + 1;
    }

    getLevelMatrix(level) {
        let angle = level * this.step * Math.PI / 180;
        let matrix = mat4.create();
        mat4.rotateY(matrix, matrix, angle);
        mat4.translate(matrix, matrix, [this.radius, 0, 0]);
        return matrix;
    }

}

export class RevolutionPath extends CirclePath {
    constructor(step = 1) {
        super(0.00001, 360, step);
    }
}
