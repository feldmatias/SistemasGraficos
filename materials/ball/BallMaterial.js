import {Material} from "../Material.js";
import {Colors} from "../../scene/Colors.js";

export class BallMaterial extends Material {

    constructor() {
        super();
        this.setColor(Colors.BALL_GREY);
    }

    getSpecularIntensity() {
        return 0.7;
    }

    getSpecularShininess() {
        return 100;
    }

}