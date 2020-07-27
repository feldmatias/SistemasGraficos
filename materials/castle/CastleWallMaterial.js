import {Material} from "../Material.js";

export class CastleWallMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/castle/castle_diffuse.png');
        this.setNormalMapping('textures/castle/castle_normals.png');
    }

    getSpecularIntensity() {
        return 0.28;
    }

    getSpecularShininess() {
        return 45;
    }

}