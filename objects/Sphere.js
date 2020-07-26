import {DrawableObject} from "./DrawableObject.js";
import {SurfacesGenerator} from "../surfaces/SurfacesGenerator.js";
import {CircleShape} from "../surfaces/shapes/CircleShape.js";

export class Sphere extends DrawableObject {

    constructor(radius = 1) {
        super();
        this.setVerticesData(radius);
    }

    setVerticesData(radius) {
        let shape = new CircleShape(radius, 90, -90);

        let data = new SurfacesGenerator().generateRevolutionSurface(shape);
        this.setBuffers(data);
    }
}