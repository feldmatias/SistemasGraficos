import {Material} from "../Material.js";

export class CastleColumnMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/castle/castle_column_diffuse.png');
    }

    getSpecularIntensity() {
        return 0.75;
    }

    getSpecularShininess() {
        return 56;
    }

}