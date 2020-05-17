import { Path } from "./Path.js";

export class CirclePath extends Path {

    constructor(radius, angle = 360, step = 1) {
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
        let x = this.radius * Math.cos(angle);
        let z = this.radius * Math.sin(angle);
        let matrix = mat4.create();
        mat4.rotateY(matrix, matrix, angle);
        mat4.translate(matrix, matrix, [x, 0, z]);
        return matrix;
    }

}

export class RevolutionPath extends CirclePath {
    constructor(step = 1) {
        super(0.00001, 360, step);
    }
}
