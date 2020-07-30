import {DrawableObject} from "../../objects/DrawableObject.js";
import {SurfacesGenerator} from "../../surfaces/SurfacesGenerator.js";
import {GRASS_MATERIAL, Materials} from "../../materials/MaterialsFactory.js";
import {CircleShape} from "../../surfaces/shapes/CircleShape.js";
import {LinePath} from "../../surfaces/paths/LinePath.js";

export class Isle extends DrawableObject {

    constructor(radius = 20, step = 10) {
        super();
        this.radius = radius;
        this.initialize(radius, step);
    }

    initialize(radius, step) {
        let shape = new CircleShape(radius + 0.4, 360, 0, step);
        let path = new LinePath(0.2);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path, true);

        this.setBuffers(data)
            .setMaterial(Materials.getMaterial(GRASS_MATERIAL))
            .translate(0, 0.02, 0)
            .rotateX(Math.PI / 2);
    }

    invertUvs() {
        return true;
    }

}