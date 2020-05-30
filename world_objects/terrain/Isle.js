import {DrawableObject} from "../../objects/DrawableObject.js";
import {SurfacesGenerator} from "../../surfaces/SurfacesGenerator.js";
import {Colors} from "../../scene/Colors.js";
import {CylinderRevolutionShape} from "../../surfaces/shapes/CylinderRevolutionShape.js";

export class Isle extends DrawableObject {

    constructor(radius = 12, step = 10) {
        super();
        this.radius = radius;
        this.initialize(radius, step);
    }

    initialize(radius, step) {
        let shape = new CylinderRevolutionShape(radius, 0.1);

        let data = new SurfacesGenerator().generateRevolutionSurface(shape, step);

        this.setBuffers(data)
            .setColor(Colors.GRASS_GREEN)
            .translate(0, 0.05, 0);
    }

}