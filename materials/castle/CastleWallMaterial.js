import {Material} from "../Material.js";

export class CastleWallMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/castle/castle_diffuse.png');
    }

    getSpecularIntensity() {
        return 0.28;
    }

    getSpecularShininess() {
        return 45;
    }

}