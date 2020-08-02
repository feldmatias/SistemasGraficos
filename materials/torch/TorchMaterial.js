import {Material} from "../Material.js";

export class TorchMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/terrain/torch_diffuse.jpg');
        this.setNormalMapping('textures/terrain/torch_normals.jpg');
    }

    getSpecularIntensity() {
        return 0.1;
    }

    getSpecularShininess() {
        return 100;
    }

}