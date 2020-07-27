import {Material} from "../Material.js";

export class WallDoorMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/wall/wall_door_diffuse.png');
        this.setNormalMapping('textures/wall/wall_door_normals.png');
    }

    getSpecularIntensity() {
        return 0.2;
    }

    getSpecularShininess() {
        return 100;
    }

}