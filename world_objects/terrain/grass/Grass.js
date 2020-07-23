import {DrawableObject} from "../../../objects/DrawableObject.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {GrassShape} from "./GrassShape.js";
import {GRASS_MATERIAL, Materials} from "../../../materials/MaterialsFactory.js";

export class Grass extends DrawableObject {

    constructor(isleLength, waterLength = 5) {
        super();

        this.isleLength = isleLength;
        this.waterLength = waterLength;

        this.initialize();
    }

    initialize() {
        let length = this.isleLength + this.waterLength;
        let shape = new GrassShape(length, 100, 0.1);

        let data = new SurfacesGenerator().generateRevolutionSurface(shape, 360 / 8);

        this.setBuffers(data)
            .setMaterial(Materials.getMaterial(GRASS_MATERIAL));

    }

}