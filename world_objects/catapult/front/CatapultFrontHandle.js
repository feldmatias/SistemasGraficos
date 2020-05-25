import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Cylinder} from "../../../objects/Cylinder.js";
import {Colors} from "../../../scene/Colors.js";

export class CatapultFrontHandle extends DrawableObject {

    constructor(size) {
        super();

        this.size = size + 0.4;

        this.createBase();
    }

    getChildren() {
        return [
            this.base,
        ]
    }

    createBase() {
        this.base = new Cylinder(0.32, this.size);
        this.base.setColor(Colors.CATAPULT_DARK_BROWN);
        this.base.rotate(Math.PI / 2, 1, 0, 0);
    }
}