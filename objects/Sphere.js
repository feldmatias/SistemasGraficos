import { DrawableObject } from "./DrawableObject.js";
import { SurfacesGenerator } from "../surfaces/SurfacesGenerator.js";
import { SphereSurface } from "../surfaces/surfaces/SphereSurface.js";

export class Sphere extends DrawableObject {

    constructor(gl, radius=1) {
        super(gl);
        this.setVerticesData(radius);
    }

    setVerticesData(radius) {
        let surface = new SphereSurface(radius);

        let data = new SurfacesGenerator().generateSurface(surface, 50, 50);
        this.setBuffers(data);
    }
}