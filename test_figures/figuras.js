import {Shape} from "../surfaces/Shape.js";


export class Forma extends Shape {

    getVertices() {
        return [
            vec3.fromValues(0, 0, 0),
            vec3.fromValues(0, 1, 0),
            vec3.fromValues(1, 1, 0),
            vec3.fromValues(1, 0, 0)
        ];
    }

    getNormals() {
        return this.getVertices();
    }

    getTextures(i) {
        return vec2.fromValues(i / 4, i / 4);
    }

    isClosed() {
        return true;
    }
}

export class CilindroRevolutionShape extends Shape {

    getVertices() {
        return [
            vec3.fromValues(0, 1, 0),
            vec3.fromValues(1, 1, 0),
            vec3.fromValues(1, 0, 0),
            vec3.fromValues(1, -1, 0),
            vec3.fromValues(0, -1, 0),
        ];
    }

    getNormals() {
        return [
            vec3.fromValues(0, 1, 0),
            vec3.fromValues(1, 0, 0),
            vec3.fromValues(1, 0, 0),
            vec3.fromValues(1, 0, 0),
            vec3.fromValues(0, -1, 0),
        ];
    }

    getTextures(i) {
        return vec2.fromValues(i / 5, 0);
    }

    isClosed() {
        return false;
    }
}
