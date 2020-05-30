import {DrawableObject} from "../../../objects/DrawableObject.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {Colors} from "../../../scene/Colors.js";
import {WallColumnShape} from "./WallColumnShape.js";

export class WallColumn extends DrawableObject {

    constructor(height, width) {
        super();
        this.height = height;
        this.width = width;

        this.initialize();
    }

    initialize() {
        let shape = new WallColumnShape(this.height, this.width);

        let data = new SurfacesGenerator().generateRevolutionSurface(shape, 10);

        this.setBuffers(data)
            .setColor(Colors.WALL_GREY);
    }

}