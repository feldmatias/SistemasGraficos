import {DrawableObject} from "../../../objects/DrawableObject.js";
import {WallEntranceShape} from "./WallEntranceShape.js";
import {LinePath} from "../../../surfaces/paths/LinePath.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {Colors} from "../../../scene/Colors.js";

export class WallEntrance extends DrawableObject {

    constructor(width, length, height) {
        super();
        this.width = width;
        this.length = length;
        this.height = height;

        this.initialize();
    }

    initialize() {
        let shape = new WallEntranceShape(this.height, this.length);
        let path = new LinePath(this.width);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path, false);

        this.setBuffers(data)
            .setColor(Colors.WALL_GREY);
    }

}