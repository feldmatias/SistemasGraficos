import {Shape} from "../../../surfaces/shapes/Shape.js";

export class WallEntranceShape extends Shape {

    constructor(height, width) {
        super();
        this.width = width / 2;
        this.height = height;
        this.wallWidth = 0.2;
    }

    getVertices() {
        return [
            vec3.fromValues(-this.width, 0, 0),
            vec3.fromValues(-this.width, this.height, 0),
            vec3.fromValues(-this.width, this.height, 0),
            vec3.fromValues(this.width, this.height, 0),
            vec3.fromValues(this.width, this.height, 0),
            vec3.fromValues(this.width, 0, 0),

            vec3.fromValues(this.width, 0, 0),
            vec3.fromValues(this.width - this.wallWidth, 0, 0),

            vec3.fromValues(this.width - this.wallWidth, 0, 0),
            vec3.fromValues(this.width - this.wallWidth, this.height - this.wallWidth, 0),
            vec3.fromValues(this.width - this.wallWidth, this.height - this.wallWidth, 0),
            vec3.fromValues(-this.width + this.wallWidth, this.height - this.wallWidth, 0),
            vec3.fromValues(-this.width + this.wallWidth, this.height - this.wallWidth, 0),
            vec3.fromValues(-this.width + this.wallWidth, 0, 0),

            vec3.fromValues(-this.width + this.wallWidth, 0, 0),
            vec3.fromValues(-this.width, 0, 0),

        ];
    }

    getNormals() {
        return [
            vec3.fromValues(-1, 0, 0),
            vec3.fromValues(-1, 0, 0),
            vec3.fromValues(0, 1, 0),
            vec3.fromValues(0, 1, 0),
            vec3.fromValues(1, 0, 0),
            vec3.fromValues(1, 0, 0),

            vec3.fromValues(0, -1, 0),
            vec3.fromValues(0, -1, 0),

            vec3.fromValues(-1, 0, 0),
            vec3.fromValues(-1, 0, 0),
            vec3.fromValues(0, -1, 0),
            vec3.fromValues(0, -1, 0),
            vec3.fromValues(1, 0, 0),
            vec3.fromValues(1, 0, 0),

            vec3.fromValues(0, -1, 0),
            vec3.fromValues(0, -1, 0),

        ];
    }

    getCapVertices() {
        let width = this.width - this.wallWidth / 2;
        let height = this.height - this.wallWidth / 2;
        return [
            vec3.fromValues(-width, 0, 0),
            vec3.fromValues(-width, height, 0),
            vec3.fromValues(-width, height, 0),
            vec3.fromValues(width, height, 0),
            vec3.fromValues(width, height, 0),
            vec3.fromValues(width, 0, 0),

            vec3.fromValues(width, 0, 0),
            vec3.fromValues(width, 0, 0),

            vec3.fromValues(width, 0, 0),
            vec3.fromValues(width, height, 0),
            vec3.fromValues(width, height, 0),
            vec3.fromValues(-width, height, 0),
            vec3.fromValues(-width, height, 0),
            vec3.fromValues(-width, 0, 0),

            vec3.fromValues(-width, 0, 0),
            vec3.fromValues(-width, 0, 0),

        ];
    }

    isClosed() {
        return true;
    }

}