import {DrawableObject} from "../../objects/DrawableObject.js";
import {SurfacesGenerator} from "../../surfaces/SurfacesGenerator.js";
import {CylinderRevolutionShape} from "../../surfaces/shapes/CylinderRevolutionShape.js";
import {GRASS_MATERIAL, Materials} from "../../materials/MaterialsFactory.js";

export class Isle extends DrawableObject {

    constructor(radius = 17, step = 10) {
        super();
        this.radius = radius;
        this.initialize(radius, step);
    }

    initialize(radius, step) {
        let shape = new CylinderRevolutionShape(radius, 0.1);

        let data = new SurfacesGenerator().generateRevolutionSurface(shape, step);

        this.setBuffers(data)
            .setMaterial(Materials.getMaterial(GRASS_MATERIAL))
            .translate(0, 0.05, 0);
    }

    invertUvs() {
        return true;
    }

}