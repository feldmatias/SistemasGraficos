import {DrawableObject} from "../../../objects/DrawableObject.js";
import {SquareShape} from "../../../surfaces/shapes/SquareShape.js";
import {CastleRoofPath} from "./CastleRoofPath.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {Colors} from "../../../scene/Colors.js";

export class CastleRoof extends DrawableObject {

    constructor(width, length, height) {
        super();
        this.initialize(width, length, height);
    }

    initialize(width, length, height) {
        let shape = new SquareShape(width + 0.1, length + 0.1);
        let path = new CastleRoofPath(height);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path, true);

        this.setBuffers(data)
            .setColor(Colors.CASTLE_BLUE)
            .rotateX(-Math.PI / 2);
    }

}