import {DrawableObject} from "../../../objects/DrawableObject.js";
import {WallEntranceShape} from "./WallEntranceShape.js";
import {LinePath} from "../../../surfaces/paths/LinePath.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {Colors} from "../../../scene/Colors.js";
import {WallDoor} from "./WallDoor.js";

export class WallEntrance extends DrawableObject {

    constructor(width, length, height) {
        super();
        this.width = width;
        this.length = length;
        this.height = height;

        this.initialize();
        this.createDoor();
    }

    getChildren() {
        return [
            this.door,
        ];
    }

    initialize() {
        let shape = new WallEntranceShape(this.height, this.length);
        let path = new LinePath(this.width);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path, true);

        this.setBuffers(data)
            .setColor(Colors.WALL_GREY);
    }

    createDoor() {
        this.door = new WallDoor(this.length - 0.4, this.height - 0.2);
    }
}