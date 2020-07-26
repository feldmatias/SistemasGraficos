import {Material} from "../Material.js";
import {Colors} from "../../scene/Colors.js";

export class TorchMaterial extends Material {

    constructor() {
        super();
        this.setColor(Colors.TORCH);
    }

    getSpecularIntensity() {
        return 0.1;
    }

    getSpecularShininess() {
        return 100;
    }

}