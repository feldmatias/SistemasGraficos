import {DrawableObject} from "../../objects/DrawableObject.js";
import {Cylinder} from "../../objects/Cylinder.js";
import {Colors} from "../../scene/Colors.js";

export class CatapultWheel extends DrawableObject {

    constructor() {
        super();

        this.object = new Cylinder(1, 0.2);
        this.object.rotate(Math.PI / 2, 1, 0, 0);
        this.object.setColor(Colors.CATAPULT_BROWN);
    }

    getChildren() {
        return [
            this.object
        ];
    }

}