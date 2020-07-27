import {Material} from "../Material.js";

export class CatapultWoodMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/catapult/catapult_wood_diffuse.jpg');
        this.setNormalMapping('textures/catapult/catapult_wood_normals.jpg');
    }

    getSpecularIntensity() {
        return 0.3;
    }

    getSpecularShininess() {
        return 67;
    }

}