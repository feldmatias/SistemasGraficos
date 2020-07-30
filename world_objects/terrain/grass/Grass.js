import {DrawableObject} from "../../../objects/DrawableObject.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {GrassShape} from "./GrassShape.js";
import {GRASS_MATERIAL, Materials} from "../../../materials/MaterialsFactory.js";
import {LinePath} from "../../../surfaces/paths/LinePath.js";

export class Grass extends DrawableObject {

    constructor(isleLength, waterLength = 30) {
        super();

        this.isleLength = isleLength;
        this.waterLength = waterLength;

        this.initialize();
    }

    initialize() {
        let length = this.isleLength + this.waterLength;
        let shape = new GrassShape(length, 150);
        let path = new LinePath(0.1);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path, true);

        this.setBuffers(data)
            .setMaterial(Materials.getMaterial(GRASS_MATERIAL))
            .translate(0, 0.06, 0)
            .rotateX(-Math.PI / 2);
    }

    getUvsScale() {
        return [3, 3];
    }

}