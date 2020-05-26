import {DrawableObject} from "./DrawableObject.js";
import {SquareShape} from "../surfaces/shapes/SquareShape.js"
import {LinePath} from "../surfaces/paths/LinePath.js"
import {SurfacesGenerator} from "../surfaces/SurfacesGenerator.js"

export class Cube extends DrawableObject {

    constructor(width, height, length) {
        super();
        this.setVerticesData(width, height, length);
    }

    setVerticesData(width, height, length) {
        let shape = new SquareShape(width, height);
        let path = new LinePath(length);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path, true);
        this.setBuffers(data);
    }
}