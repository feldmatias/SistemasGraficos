import {Shape} from "../surfaces/Shape.js";
import {Surface} from "../surfaces/Surface.js";
import {Path} from "../surfaces/paths/Path.js";

export class Plano extends Surface {

    constructor(ancho, largo) {
        super();
        this.ancho = ancho;
        this.largo = largo;
    }

    getPosition(u, v) {
        let x = (u - 0.5) * this.ancho;
        let z = (v - 0.5) * this.largo;
        return vec3.fromValues(x, 0, -z);
    }

    getNormal(u, v) {
        return vec3.fromValues(0, 1, 0);
    }

    getTextures(u, v) {
        return vec2.fromValues(u, v);
    }
}

export class Esfera extends Surface {

    constructor(radio) {
        super();
        this.radio = radio;
    }

    getPosition(u, v) {
        let theta = (1 - v) * Math.PI;
        let sinTheta = Math.sin(theta);
        let cosTheta = Math.cos(theta);

        let phi = u * 2 * Math.PI;
        let sinPhi = Math.sin(phi);
        let cosPhi = Math.cos(phi);

        let x = cosPhi * sinTheta * this.radio;
        let y = cosTheta * this.radio;
        let z = sinPhi * sinTheta * this.radio;

        return vec3.fromValues(x, y, z);
    }

    getNormal(u, v) {
        return this.getPosition(u, v);
    }

    getTextures(u, v) {
        return vec2.fromValues(u, v);
    }
}

export class TuboSenoidal extends Surface {

    constructor(radio, altura, longitudOnda, amplitudOnda) {
        super();
        this.radio = radio;
        this.altura = altura;
        this.longitudOnda = longitudOnda;
        this.amplitudOnda = amplitudOnda;
    }

    getPosition(u, v) {
        let angulo = (u - 0.5) * 2 * Math.PI;

        let onda = 1 + this.amplitudOnda * Math.cos(this.longitudOnda * v * 2 * Math.PI);

        let x = this.radio * Math.cos(angulo) * onda;
        let y = (v - 0.5) * this.altura;
        let z = this.radio * Math.sin(angulo) * onda;

        return vec3.fromValues(x, y, z);
    }

    getNormal(u, v) {
        let posicion = this.getPosition(u, v);
        return [posicion[0], 0, posicion[2]];
    }

    getTextures(u, v) {
        return vec2.fromValues(1, 0);
    }
}


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
