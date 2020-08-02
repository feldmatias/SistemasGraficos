import {Material} from "../Material.js";

export class RopeMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/catapult/catapult_rope_diffuse.png');
        this.setNormalMapping('textures/catapult/catapult_rope_normals.png');
    }

    getSpecularIntensity() {
        return 0.05;
    }

    getSpecularShininess() {
        return 200;
    }

}