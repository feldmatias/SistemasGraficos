import { Path } from './Path.js'

export class LinePath extends Path {

    constructor(withCaps=false, length=2, step=0.5) {
        super();
        this.length = length;
        this.step = step;
        this.withCaps = withCaps;
    }

    getLevelsCount() {
        let levels = this.length / this.step + 1;
        if (this.withCaps) {
            levels += 2;
        }
        return levels;
    }

    getLevelMatrix(level) {
        if (this.withCaps && (level === 0 || level === this.getLevelsCount() - 1)) {
            return this.getCapsMatrix(level);
        }

        let currentLevel = this.withCaps ? level - 1 : level;
        let translation = currentLevel * this.step - this.length / 2;

        let matrix = mat4.create();
        mat4.translate(matrix, matrix, vec3.fromValues(0, 0, translation));
        return matrix;
    }

    getCapsMatrix(level) {
        let capLevel = level === 0 ? level + 1 : level - 1;
        let matrix = this.getLevelMatrix(capLevel);

        let capsScale = 0.00001;
        mat4.scale(matrix, matrix, vec3.fromValues(capsScale, capsScale, capsScale));
        return matrix;
    }

}