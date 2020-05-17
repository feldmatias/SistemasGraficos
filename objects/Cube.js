import { DrawableObject } from "./DrawableObject.js";
import { SquareShape } from "../surfaces/shapes/SquareShape.js"
import { LinePath } from "../surfaces/paths/LinePath.js"
import { SurfacesGenerator } from "../surfaces/SurfacesGenerator.js"

export class Cube extends DrawableObject {

    constructor(gl, size=1) {
        super(gl);
        this.setVerticesData(size);
    }

    setVerticesData(size) {
        let shape = new SquareShape(size);
        let path = new LinePath(size);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path, true);
        this.setBuffers(data);
    }
}