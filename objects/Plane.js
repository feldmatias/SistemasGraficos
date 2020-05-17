import { DrawableObject } from "./DrawableObject.js";
import { PlaneSurface } from "../surfaces/surfaces/PlaneSurface.js";
import { SurfacesGenerator } from "../surfaces/SurfacesGenerator.js";

export class Plane extends DrawableObject {

    constructor(gl, width=1, height=1) {
        super(gl);
        this.setVerticesData(width, height);
    }

    setVerticesData(width, height) {
        let surface = new PlaneSurface(width, height);

        let data = new SurfacesGenerator().generateSurface(surface, 50, 50);
        this.setBuffers(data);
    }
}