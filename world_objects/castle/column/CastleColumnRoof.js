import {DrawableObject} from "../../../objects/DrawableObject.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {CastleColumnRoofShape} from "./CastleColumnRoofShape.js";
import {CASTLE_ROOF_MATERIAL, Materials} from "../../../materials/MaterialsFactory.js";

export class CastleColumnRoof extends DrawableObject {

    constructor(height, width) {
        super();

        this.initialize(height, width);
    }

    initialize(height, width) {
        let shape = new CastleColumnRoofShape(height * 0.8, width);

        let data = new SurfacesGenerator().generateRevolutionSurface(shape);

        this.setBuffers(data)
            .setMaterial(Materials.getMaterial(CASTLE_ROOF_MATERIAL));
    }

}