import { Shape } from './Shape.js'

export class SquareShape extends Shape {

    constructor(size = 1) {
        super();
        this.size = size / 2;
    }

    getVertices() {
        return [
            vec3.fromValues(-this.size, -this.size, 0),
            vec3.fromValues(-this.size, 0, 0),
            vec3.fromValues(-this.size, this.size, 0),
            vec3.fromValues(0, this.size, 0),
            vec3.fromValues(this.size, this.size, 0),
            vec3.fromValues(this.size, 0, 0),
            vec3.fromValues(this.size, -this.size, 0),
            vec3.fromValues(0, -this.size, 0),
        ];
    }

    getNormals() {
        return this.getVertices();
    }

    isClosed() {
        return true;
    }
}
