import {Colors} from "../../scene/Colors.js";
import {Plane} from "../../objects/Plane.js";
import {DrawableObject} from "../../objects/DrawableObject.js";

export class Water extends DrawableObject {

    constructor(radius = 50) {
        super();

        this.object = new Plane(radius, radius);

        this.object.setColor(Colors.WATER_BLUE);

        this.object.translate(0, 0.025, 0);
    }

    getChildren() {
        return [
            this.object
        ];
    }

}