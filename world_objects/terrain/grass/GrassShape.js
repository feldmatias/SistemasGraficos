import {RevolutionShape} from "../../../surfaces/shapes/RevolutionShape.js";

export class GrassShape extends RevolutionShape {

    constructor(isleLength, length, height) {
        super();
        this.isleLength = isleLength;
        this.length = length;
        this.height = height;
    }

    getVertices() {
        return [
            vec3.fromValues(0, 0, 0),
            vec3.fromValues(this.isleLength, 0, 0),

            vec3.fromValues(this.isleLength, 0, 0),
            vec3.fromValues(this.isleLength, this.height, 0),

            vec3.fromValues(this.isleLength, this.height, 0),
            vec3.fromValues(this.length, this.height, 0),
        ];
    }

    getNormals() {
        return [
            vec3.fromValues(0, 1, 0),
            vec3.fromValues(0, 1, 0),

            vec3.fromValues(-1, 0, 0),
            vec3.fromValues(-1, 0, 0),

            vec3.fromValues(0, 1, 0),
            vec3.fromValues(0, 1, 0),
        ];
    }

    isClosed() {
        return false;
    }

}