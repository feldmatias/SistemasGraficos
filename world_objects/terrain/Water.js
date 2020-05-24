import {Colors} from "../../scene/Colors.js";
import {Plane} from "../../objects/Plane.js";

export class Water extends Plane {

    constructor(radius = 50) {
        super(radius, radius);

        this.setColor(Colors.WATER_BLUE);

        this.translate(0, 0.025, 0);
    }

}