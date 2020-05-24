import {DrawableObject} from "../../objects/DrawableObject.js";
import {SquareShape} from "../../surfaces/shapes/SquareShape.js";
import {LinePath} from "../../surfaces/paths/LinePath.js";
import {SurfacesGenerator} from "../../surfaces/SurfacesGenerator.js";
import {Colors} from "../../scene/Colors.js";

export class CastleFloor extends DrawableObject {

    constructor(width, length, height) {
        super();
        this.initialize(width, length, height);
    }

    initialize(width, length, height) {
        let shape = new SquareShape(width, length);
        let path = new LinePath(height);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path);
        this.setBuffers(data);
        this.rotate(Math.PI  / 2, 1, 0, 0);
        this.setColor(Colors.CASTLE_YELLOW);
    }

}