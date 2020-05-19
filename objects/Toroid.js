import {DrawableObject} from "./DrawableObject.js";
import {SurfacesGenerator} from "../surfaces/SurfacesGenerator.js"
import {CircleShape} from "../surfaces/shapes/CircleShape.js";
import {CirclePath} from "../surfaces/paths/CirclePath.js";

export class Toroid extends DrawableObject {

    constructor(gl, radius = 2, width = 1) {
        super(gl);
        this.setVerticesData(radius, width);
    }

    setVerticesData(radius, width) {
        let shape = new CircleShape(width);
        let path = new CirclePath(radius);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path);
        this.setBuffers(data);
    }
}
