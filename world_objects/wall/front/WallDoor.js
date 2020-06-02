import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Cube} from "../../../objects/Cube.js";
import {Colors} from "../../../scene/Colors.js";
import {WallDoorAnimation} from "./WallDoorAnimation.js";

export class WallDoor extends DrawableObject {

    constructor(width, height) {
        super();

        this.door = new Cube(width, height, 0.3)
            .setColor(Colors.WALL_BROWN)
            .translate(0, height / 2, 0);

        this.animation = new WallDoorAnimation(this);
    }

    getChildren() {
        return [
            this.door,
        ];
    }

    getAnimations() {
        return [
            this.animation,
        ];
    }

    move(angle) {
        this.rotateX(angle);
    }

}