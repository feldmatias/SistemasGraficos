import {Material} from "../Material.js";

export class WallDoorMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/wall/wall_door_diffuse.jpg');
        this.setNormalMapping('textures/wall/wall_door_normals.jpg');
    }

    getSpecularIntensity() {
        return 0.2;
    }

    getSpecularShininess() {
        return 100;
    }

}