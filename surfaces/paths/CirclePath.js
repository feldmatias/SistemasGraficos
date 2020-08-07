import {Path} from "./Path.js";

export class CirclePath extends Path {

    constructor(radius, angle = 360, step = 5) {
        super();
        this.radius = radius;
        this.angle = angle;
        this.step = step;
    }

    getLevelsCount() {
        return Math.round(this.angle / this.step) + 1;
    }

    getLevelMatrix(level) {
        let angle = level * this.step * Math.PI / 180;
        let matrix = mat4.create();
        mat4.rotateY(matrix, matrix, angle);
        mat4.translate(matrix, matrix, [this.radius, 0, 0]);
        return matrix;
    }

}

export class CirclePathFaceted extends Path {

    constructor(radius, step) {
        super();
        this.radius = radius;
        this.step = step;

        this.angles = [];
        for (let i = 0; i < step - 1; i++) {
            let angle = 360 / step * i;
            this.angles.push(angle);
            this.angles.push(angle);
        }
        this.angles = this.angles.slice(1);
        this.angles.push(360 - 360 / step); // not closed
    }

    getLevelsCount() {
        return this.angles.length;
    }

    getLevelMatrix(level) {
        let angle = this.angles[level] * Math.PI / 180;
        let matrix = mat4.create();
        mat4.rotateY(matrix, matrix, angle);
        mat4.translate(matrix, matrix, [this.radius, 0, 0]);
        return matrix;
    }

    getLevelNormalMatrix(level) {
        let isStart = level % 2 === 0;
        let startAngle = isStart ? this.angles[level] : this.angles[level - 1];
        let endAngle = isStart ? this.angles[level + 1] : this.angles[level];

        let normalAngle = (endAngle + startAngle) / 2 * Math.PI / 180;
        let matrix = mat4.create();
        mat4.rotateY(matrix, matrix, normalAngle);
        mat4.translate(matrix, matrix, [this.radius, 0, 0]);

        let normalMatrix = mat3.create();
        mat3.normalFromMat4(normalMatrix, matrix);
        return normalMatrix;
    }

}

export class RevolutionPath extends CirclePath {
    constructor(step = 1) {
        super(0.00001, 360, step);
    }
}
