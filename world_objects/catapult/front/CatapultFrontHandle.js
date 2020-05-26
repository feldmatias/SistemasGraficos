import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Cylinder} from "../../../objects/Cylinder.js";
import {Colors} from "../../../scene/Colors.js";
import {CatapultBar} from "../bar/CatapultBar.js";

export class CatapultFrontHandle extends DrawableObject {

    constructor(size) {
        super();

        this.size = size + 0.4;

        this.createBase();
        this.createBar();
    }

    getChildren() {
        return [
            this.base,
            this.bar,
        ]
    }

    createBase() {
        this.base = new Cylinder(0.32, this.size)
            .setColor(Colors.CATAPULT_DARK_BROWN)
            .rotate(Math.PI / 2, 1, 0, 0);
    }

    createBar() {
        this.bar = new CatapultBar()
            .rotate(Math.PI / 2, 0, -1, 0);
        this.bar.translate(0, 0.25, this.bar.length / 2 * 0.7);
    }

    move(angle) {
        this.rotate(angle, 0, 0, -1);
        this.bar.barWeight.rotate(angle, 0, 0, 1);
    }
}