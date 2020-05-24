import {Shape} from './Shape.js'

export class SquareShape extends Shape {

    constructor(width, height) {
        super();
        this.width = width / 2;
        this.height = height / 2;
    }

    getVertices() {
        return [
            vec3.fromValues(-this.width, -this.height, 0),
            vec3.fromValues(-this.width, 0, 0),
            vec3.fromValues(-this.width, this.height, 0),
            vec3.fromValues(0, this.height, 0),
            vec3.fromValues(this.width, this.height, 0),
            vec3.fromValues(this.width, 0, 0),
            vec3.fromValues(this.width, -this.height, 0),
            vec3.fromValues(0, -this.height, 0),
        ];
    }

    getNormals() {
        return this.getVertices();
    }

    isClosed() {
        return true;
    }
}
