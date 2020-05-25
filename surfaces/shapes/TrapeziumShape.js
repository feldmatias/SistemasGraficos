import {Shape} from './Shape.js'

export class TrapeziumShape extends Shape {

    constructor(longWidth, shortWidth, height) {
        super();
        this.longWidth = longWidth / 2;
        this.shortWidth = shortWidth / 2;
        this.height = height / 2;
    }

    getVertices() {
        return [
            vec3.fromValues(-this.longWidth, -this.height, 0),
            vec3.fromValues(-(this.longWidth + this.shortWidth) / 2, 0, 0),
            vec3.fromValues(-this.shortWidth, this.height, 0),

            vec3.fromValues(-this.shortWidth, this.height, 0),
            vec3.fromValues(0, this.height, 0),
            vec3.fromValues(this.shortWidth, this.height, 0),

            vec3.fromValues(this.shortWidth, this.height, 0),
            vec3.fromValues((this.longWidth + this.shortWidth) / 2, 0, 0),
            vec3.fromValues(this.longWidth, -this.height, 0),

            vec3.fromValues(this.longWidth, -this.height, 0),
            vec3.fromValues(0, -this.height, 0),
            vec3.fromValues(-this.longWidth, -this.height, 0),
        ];
    }

    getNormals() {
        let diagonalNormal = -(this.shortWidth - this.longWidth) / (this.height * 2);

        return [
            vec3.fromValues(-1, diagonalNormal, 0),
            vec3.fromValues(-1, diagonalNormal, 0),
            vec3.fromValues(-1, diagonalNormal, 0),

            vec3.fromValues(0, 1, 0),
            vec3.fromValues(0, 1, 0),
            vec3.fromValues(0, 1, 0),

            vec3.fromValues(1, diagonalNormal, 0),
            vec3.fromValues(1, diagonalNormal, 0),
            vec3.fromValues(1, diagonalNormal, 0),

            vec3.fromValues(0, -1, 0),
            vec3.fromValues(0, -1, 0),
            vec3.fromValues(0, -1, 0),
        ];
    }

    isClosed() {
        return true;
    }
}
