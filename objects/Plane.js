import {DrawableObject} from "./DrawableObject.js";
import {PlaneSurface} from "../surfaces/surfaces/PlaneSurface.js";
import {SurfacesGenerator} from "../surfaces/SurfacesGenerator.js";

export class Plane extends DrawableObject {

    constructor(width = 1, height = 1) {
        super();
        this.setVerticesData(width, height);
    }

    setVerticesData(width, height) {
        let surface = new PlaneSurface(width, height);

        let data = new SurfacesGenerator().generateSurface(surface, 10, 10);
        this.setBuffers(data);
    }
}