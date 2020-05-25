import { Path } from './Path.js'

export class LinePath extends Path {

    constructor(length = 2, step = undefined) {
        super();
        this.length = length;
        this.step = step || (length / 4);
    }

    getLevelsCount() {
        return this.length / this.step + 1;
    }

    getLevelMatrix(level) {
        let translation = level * this.step - this.length / 2;

        let matrix = mat4.create();
        mat4.translate(matrix, matrix, vec3.fromValues(0, 0, translation));
        return matrix;
    }

}
