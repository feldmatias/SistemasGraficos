import {DrawableObject} from "../../../objects/DrawableObject.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {Colors} from "../../../scene/Colors.js";
import {CastleWindowShape} from "./CastleWindowShape.js";
import {LinePath} from "../../../surfaces/paths/LinePath.js";

export class CastleWindow extends DrawableObject {

    constructor(width, height) {
        super();
        this.initialize(width, height);
    }

    initialize(width, height) {
        let shape = new CastleWindowShape(width, height);
        let path = new LinePath(0.2, 0.1);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path, true);
        this.setBuffers(data);
        this.setColor(Colors.CASTLE_BLACK);
    }

}