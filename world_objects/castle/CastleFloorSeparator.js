import {DrawableObject} from "../../objects/DrawableObject.js";
import {SquareShape} from "../../surfaces/shapes/SquareShape.js";
import {LinePath} from "../../surfaces/paths/LinePath.js";
import {SurfacesGenerator} from "../../surfaces/SurfacesGenerator.js";
import {Colors} from "../../scene/Colors.js";

export class CastleFloorSeparator extends DrawableObject {

    constructor(width, length) {
        super();
        this.initialize(width, length);
    }

    initialize(width, length) {
        let shape = new SquareShape(width, width);
        let path = new LinePath(length);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path);
        this.setBuffers(data);
        this.setColor(Colors.CASTLE_YELLOW);
    }

}