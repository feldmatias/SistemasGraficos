import {Material} from "../Material.js";

export class WaterMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/terrain/water_diffuse.png');
    }

    getSpecularIntensity() {
        return 0.5;
    }

    getSpecularShininess() {
        return 50;
    }

}