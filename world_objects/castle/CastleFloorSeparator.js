import {DrawableObject} from "../../objects/DrawableObject.js";
import {SquareShape} from "../../surfaces/shapes/SquareShape.js";
import {LinePath} from "../../surfaces/paths/LinePath.js";
import {SurfacesGenerator} from "../../surfaces/SurfacesGenerator.js";
import {CASTLE_WALL_MATERIAL, Materials} from "../../materials/MaterialsFactory.js";

export class CastleFloorSeparator extends DrawableObject {

    constructor(width, length) {
        super();
        this.initialize(width, length);
    }

    initialize(width, length) {
        let shape = new SquareShape(width * 2, width);
        let path = new LinePath(length);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path);

        this.setBuffers(data)
            .setMaterial(Materials.getMaterial(CASTLE_WALL_MATERIAL));
    }

    getUvsScale() {
        return [5, 0.3];
    }

}