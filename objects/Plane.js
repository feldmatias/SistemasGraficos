import {DrawableObject} from "./DrawableObject.js";
import {SurfacesGenerator} from "../surfaces/SurfacesGenerator.js";
import {LinePath} from "../surfaces/paths/LinePath.js";
import {SquareShape} from "../surfaces/shapes/SquareShape.js";

export class Plane extends DrawableObject {

    constructor(width = 1, height = 1, uvsScale = 1) {
        super();
        this.uvsScale = [uvsScale, uvsScale];
        this.setVerticesData(width, height);
    }

    setVerticesData(width, height) {
        let shape = new SquareShape(width, height);
        let path = new LinePath(0.05);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path, true);
        this.setBuffers(data);

        this.rotateX(Math.PI / 2);
    }

    getUvsScale() {
        return this.uvsScale;
    }
}