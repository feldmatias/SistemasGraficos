import {DrawableObject} from "../../../objects/DrawableObject.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {Colors} from "../../../scene/Colors.js";
import {CastleColumnShape} from "./CastleColumnShape.js";

export class CastleColumn extends DrawableObject {

    constructor(height) {
        super();
        this.initialize(height);
    }

    initialize(height) {
        let shape = new CastleColumnShape(height);

        let data = new SurfacesGenerator().generateRevolutionSurface(shape);

        this.setBuffers(data)
            .setColor(Colors.CASTLE_YELLOW);
    }

}