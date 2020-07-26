import {Material} from "../Material.js";
import {Colors} from "../../scene/Colors.js";

export class TorchFireMaterial extends Material {

    constructor() {
        super();
        this.setColor(Colors.TORCH_FIRE);
    }

    getSpecularIntensity() {
        return 0.7;
    }

    getSpecularShininess() {
        return 100;
    }

}