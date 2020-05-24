import {RevolutionShape} from "./RevolutionShape.js";

export class CylinderRevolutionShape extends RevolutionShape {

    constructor(radius, height) {
        super();
        this.radius = radius;
        this.height = height / 2;
    }

    getVertices() {
        return [
            vec3.fromValues(0, this.height, 0),
            vec3.fromValues(this.radius, this.height, 0),
            vec3.fromValues(this.radius, 0, 0),
            vec3.fromValues(this.radius, -this.height, 0),
            vec3.fromValues(0, -this.height, 0),
        ];
    }

    getNormals() {
        return [
            vec3.fromValues(0, this.height, 0),
            vec3.fromValues(this.radius, 0, 0),
            vec3.fromValues(this.radius, 0, 0),
            vec3.fromValues(this.radius, 0, 0),
            vec3.fromValues(0, -this.height, 0),
        ];
    }

    isClosed() {
        return false;
    }
}
