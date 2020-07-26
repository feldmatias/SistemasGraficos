import {Material} from "../Material.js";

export class CatapultCementMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/catapult/catapult_cement_diffuse.png');
    }

    getSpecularIntensity() {
        return 0.1;
    }

    getSpecularShininess() {
        return 45;
    }

}