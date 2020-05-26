import {DrawableObject} from "./DrawableObject.js";
import {CylinderRevolutionShape} from "../surfaces/shapes/CylinderRevolutionShape.js";
import {SurfacesGenerator} from "../surfaces/SurfacesGenerator.js";

export class Cylinder extends DrawableObject {

    constructor(radius = 1, height = 2) {
        super();
        this.setVerticesData(radius, height);
    }

    setVerticesData(radius, height) {
        let shape = new CylinderRevolutionShape(radius, height);

        let data = new SurfacesGenerator().generateRevolutionSurface(shape);
        this.setBuffers(data);
    }
}