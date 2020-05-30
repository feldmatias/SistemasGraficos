import {DrawableObject} from "../../../objects/DrawableObject.js";
import {WallShape} from "../border/WallShape.js";
import {LinePath} from "../../../surfaces/paths/LinePath.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {Colors} from "../../../scene/Colors.js";

export class FrontWallBorder extends DrawableObject {

    constructor(height, width, length) {
        super();
        this.height = height;
        this.width = width * 0.9;
        this.length = length;

        this.initialize();
        this.rotate(Math.PI / 2, 0, 1, 0);
    }

    initialize() {
        let shape = new WallShape(this.height, this.width);
        let path = new LinePath(this.length);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path);

        this.setBuffers(data)
            .setColor(Colors.WALL_GREY);
    }

}