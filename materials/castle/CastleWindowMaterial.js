import {Material} from "../Material.js";

export class CastleWindowMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/castle/castle_window_diffuse.jpg');
        this.setNormalMapping('textures/castle/castle_window_normals.jpg');
    }

    getSpecularIntensity() {
        return 0.9;
    }

    getSpecularShininess() {
        return 50;
    }

}