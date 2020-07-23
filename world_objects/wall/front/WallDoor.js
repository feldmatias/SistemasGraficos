import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Cube} from "../../../objects/Cube.js";
import {WallDoorAnimation} from "./WallDoorAnimation.js";
import {Materials, WALL_DOOR_MATERIAL} from "../../../materials/MaterialsFactory.js";

export class WallDoor extends DrawableObject {

    constructor(width, height) {
        super();

        this.door = new Cube(width, height, 0.3)
            .setMaterial(Materials.getMaterial(WALL_DOOR_MATERIAL))
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