import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Cube} from "../../../objects/Cube.js";
import {Colors} from "../../../scene/Colors.js";

export class CatapultBar extends DrawableObject {

    constructor() {
        super();

        this.createBar();
        this.createMunitionBase();
    }

    getChildren() {
        return [
            this.bar,
            this.munitionBase,
        ]
    }

    createBar() {
        this.length = 10;
        this.bar = new Cube(0.7, 0.4, this.length);
        this.bar.setColor(Colors.CATAPULT_BROWN);
    }

    createMunitionBase() {
        let size = 2.5;
        this.munitionBase = new Cube(size, 0.4, size);
        this.munitionBase.setColor(Colors.CATAPULT_BROWN);
        this.munitionBase.translate(0, 0, this.length / 2);
    }
}