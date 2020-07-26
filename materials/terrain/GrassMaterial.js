import {Material} from "../Material.js";

export class GrassMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/terrain/ground_diffuse.jpg');
    }

    getSpecularIntensity() {
        return 0.2;
    }

    getSpecularShininess() {
        return 15;
    }

}