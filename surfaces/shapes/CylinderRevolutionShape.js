import {Shape} from "./Shape.js";

export class CylinderRevolutionShape extends Shape {

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

    getTextures(i) {
        return vec2.fromValues(i / 5, 0);
    }

    isClosed() {
        return false;
    }
}