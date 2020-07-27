import {Material} from "../Material.js";

export class CatapultWoodMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/catapult/catapult_wood_diffuse.png');
        this.setNormalMapping('textures/catapult/catapult_wood_normals.png');
    }

    getSpecularIntensity() {
        return 0.3;
    }

    getSpecularShininess() {
        return 67;
    }

}