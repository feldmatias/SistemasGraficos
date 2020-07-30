import {Material} from "../Material.js";

export class GrassMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/terrain/ground_diffuse.jpg');
        this.setNormalMapping('textures/terrain/ground_normals.jpg');
    }

    getSpecularIntensity() {
        return 0.4;
    }

    getSpecularShininess() {
        return 35;
    }

}