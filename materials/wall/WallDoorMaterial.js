import {Material} from "../Material.js";

export class WallDoorMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/wall/wall_door_diffuse.jpg');
    }

    getSpecularIntensity() {
        return 0.2;
    }

    getSpecularShininess() {
        return 100;
    }

}