import {CircleShape} from "../../../surfaces/shapes/CircleShape.js";
import {Shape} from "../../../surfaces/shapes/Shape.js";

export class GrassShape extends Shape {

    constructor(isleLength, length) {
        super();
        this.isleLength = isleLength;
        this.length = length;

        this.outerShape = new CircleShape(this.length, 361, 0, 360 / 8);
        this.innerShape = new CircleShape(this.isleLength, 361, 0, 360 / 8);
    }

    getVertices() {
        let outerShape = this.outerShape.getVertices();
        let innerShape = this.innerShape.getVertices().reverse();
        return [
            outerShape,
            innerShape
        ].flat();
    }

    getNormals() {
        let outerShape = this.outerShape.getNormals();
        let innerShape = this.innerShape.getNormals().reverse();
        return [
            outerShape,
            innerShape
        ].flat();
    }

    getCapVertices() {
        let shape = new CircleShape((this.length + this.isleLength) / 2, 361, 0, 360 / 8);
        return [
            shape.getVertices(),
            shape.getVertices().reverse()
        ].flat();
    }

    getCenterCapUvs() {
        let vertices = this.getVertices();

        let minX = Math.min( ...vertices.map(v => v[0]));
        let maxX = Math.max( ...vertices.map(v => v[0]));
        let minY = Math.min( ...vertices.map(v => v[1]));
        let maxY = Math.max( ...vertices.map(v => v[1]));

        return this.getCapVertices().map(vertex => {
            let x = (vertex[0] - minX) / (maxX - minX);
            let y = (vertex[1] - minY) / (maxY - minY);
            return vec2.fromValues(x, y);
        });
    }

    isClosed() {
        return true;
    }

}