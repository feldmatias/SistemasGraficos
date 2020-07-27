import {Material} from "../Material.js";

export class CastleRoofMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/castle/castle_roof_diffuse.png');
        this.setNormalMapping('textures/castle/castle_roof_normals.png');
    }

    getSpecularIntensity() {
        return 0.9;
    }

    getSpecularShininess() {
        return 32;
    }

}