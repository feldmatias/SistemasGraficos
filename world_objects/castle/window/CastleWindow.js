import {DrawableObject} from "../../../objects/DrawableObject.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {CastleWindowShape} from "./CastleWindowShape.js";
import {LinePath} from "../../../surfaces/paths/LinePath.js";
import {CASTLE_WINDOW_MATERIAL, Materials} from "../../../materials/MaterialsFactory.js";

export class CastleWindow extends DrawableObject {

    constructor(width, height) {
        super();
        this.initialize(width, height);
    }

    initialize(width, height) {
        let shape = new CastleWindowShape(width, height * 0.6);
        let path = new LinePath(0.2, 0.1);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path, true);

        this.setBuffers(data)
            .setMaterial(Materials.getMaterial(CASTLE_WINDOW_MATERIAL));
    }

    getUvsScale() {
        return [0.25, 0.25];
    }

}