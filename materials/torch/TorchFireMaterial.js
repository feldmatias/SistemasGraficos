import {Material} from "../Material.js";

export class TorchFireMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/terrain/fire_diffuse.png');
    }

    getSpecularIntensity() {
        return 0.7;
    }

    getSpecularShininess() {
        return 100;
    }

    ignoreLighting() {
        return true;
    }


}