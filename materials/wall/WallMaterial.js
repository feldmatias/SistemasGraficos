import {Material} from "../Material.js";

export class WallMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/wall/wall_diffuse.jpg');
        this.setNormalMapping('textures/wall/wall_normals.jpg');
    }

    getSpecularIntensity() {
        return 0.4;
    }

    getSpecularShininess() {
        return 32;
    }

}