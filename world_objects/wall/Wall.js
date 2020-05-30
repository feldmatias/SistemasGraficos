import {DrawableObject} from "../../objects/DrawableObject.js";
import {SurfacesGenerator} from "../../surfaces/SurfacesGenerator.js";
import {WallShape} from "./WallShape.js";
import {CirclePath} from "../../surfaces/paths/CirclePath.js";
import {Colors} from "../../scene/Colors.js";

export class Wall extends DrawableObject {

    constructor(columns, height, width = 4) {
        super();
        this.columns = columns;
        this.height = height;
        this.width = width;
        this.radius = 12 - width / 2;
        this.angleStep = 360 / this.columns;

        this.initialize();
        this.rotateToFront();
    }

    initialize() {
        let shape = new WallShape(this.height, this.width);
        let path = new CirclePath(this.radius, 360 - this.angleStep, this.angleStep);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path);

        this.setBuffers(data)
            .setColor(Colors.WALL_GREY);
    }

    rotateToFront() {
        let angles = {
            4: 45,
            5: 55,
            6: 60,
            7: 65,
            8: 68,
        }
        let angle = angles[this.columns] * Math.PI / 180;
        this.rotate(-angle, 0, 1, 0);
    }
}
