import {Material} from "../Material.js";

export class CastleWallMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/castle/castle_diffuse.jpg');
    }

}