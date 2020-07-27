import {Material} from "../Material.js";

export class CatapultMetalMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/catapult/catapult_metal_diffuse.png');
        this.setNormalMapping('textures/catapult/catapult_metal_normals.png');
    }

    getSpecularIntensity() {
        return 0.8;
    }

    getSpecularShininess() {
        return 150;
    }

}