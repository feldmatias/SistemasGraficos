import {DrawableObject} from "../../../objects/DrawableObject.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {Colors} from "../../../scene/Colors.js";
import {CastleColumnRoofShape} from "./CastleColumnRoofShape.js";

export class CastleColumnRoof extends DrawableObject {

    constructor(height, width) {
        super();

        this.initialize(height, width);
    }

    initialize(height, width) {
        let shape = new CastleColumnRoofShape(height * 0.6, width);

        let data = new SurfacesGenerator().generateRevolutionSurface(shape);

        this.setBuffers(data)
            .setColor(Colors.CASTLE_BLUE);
    }

}