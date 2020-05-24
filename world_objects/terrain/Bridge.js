import {DrawableObject} from "../../objects/DrawableObject.js";
import {Cube} from "../../objects/Cube.js";
import {Colors} from "../../scene/Colors.js";

export class Bridge extends DrawableObject {

    constructor(width, length) {
        super();

        this.object = new Cube(width, 0.1, length);

        this.object.setColor(Colors.GRASS_GREEN);

        this.object.translate(0, 0.05, 0);
    }

    getChildren() {
        return [
            this.object
        ];
    }

}