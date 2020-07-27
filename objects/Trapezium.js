import {DrawableObject} from "./DrawableObject.js";
import {SurfacesGenerator} from "../surfaces/SurfacesGenerator.js";
import {TrapeziumShape} from "../surfaces/shapes/TrapeziumShape.js";
import {LinePath} from "../surfaces/paths/LinePath.js";

export class Trapezium extends DrawableObject {

    constructor(longWidth, shortWidth, height, length, uvsScale = 1) {
        super();
        this.uvsScale = uvsScale;
        this.setVerticesData(longWidth, shortWidth, height, length);
    }

    setVerticesData(longWidth, shortWidth, height, length) {
        let shape = new TrapeziumShape(longWidth, shortWidth, height);
        let path = new LinePath(length);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path, true);
        this.setBuffers(data);
    }

    getUvsScale() {
        return [this.uvsScale, this.uvsScale];
    }
}