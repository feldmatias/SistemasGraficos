import {Material} from "../Material.js";

export class CastleColumnMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/castle/castle_column_diffuse.png');
        this.setNormalMapping('textures/castle/castle_column_normals.png');
    }

    getSpecularIntensity() {
        return 0.75;
    }

    getSpecularShininess() {
        return 56;
    }

}