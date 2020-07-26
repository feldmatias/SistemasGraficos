import {Material} from "../Material.js";
import {Colors} from "../../scene/Colors.js";

export class RopeMaterial extends Material {

    constructor() {
        super();
        this.setColor(Colors.WHITE);
    }

    getSpecularIntensity() {
        return 0.05;
    }

    getSpecularShininess() {
        return 200;
    }

}