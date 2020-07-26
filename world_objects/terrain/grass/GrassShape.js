import {RevolutionShape} from "../../../surfaces/shapes/RevolutionShape.js";

export class GrassShape extends RevolutionShape {

    constructor(isleLength, length, height) {
        super();
        this.isleLength = isleLength;
        this.length = length;
        this.height = height;
    }

    getVertices() {
        let longLine = [];
        for (let i = this.isleLength; i <= this.length; i++) {
            longLine.push(vec3.fromValues(i, this.height, 0))
        }
        return [
            vec3.fromValues(0, 0, 0),
            vec3.fromValues(this.isleLength, 0, 0),

            vec3.fromValues(this.isleLength, 0, 0),
            vec3.fromValues(this.isleLength, this.height, 0),

            longLine,

            vec3.fromValues(this.length, this.height, 0),
            vec3.fromValues(this.length, 0, 0),

            vec3.fromValues(this.length, 0, 0),
            vec3.fromValues(0, 0, 0),
        ].flat();
    }

    getNormals() {
        let longLine = [];
        for (let i = this.isleLength; i <= this.length; i++) {
            longLine.push(vec3.fromValues(0, 1, 0))
        }
        return [
            vec3.fromValues(0, 1, 0),
            vec3.fromValues(0, 1, 0),

            vec3.fromValues(-1, 0, 0),
            vec3.fromValues(-1, 0, 0),

            longLine,

            vec3.fromValues(1, 0, 0),
            vec3.fromValues(1, 0, 0),

            vec3.fromValues(0, -1, 0),
            vec3.fromValues(0, -1, 0),
        ].flat();
    }

    isClosed() {
        return false;
    }

}