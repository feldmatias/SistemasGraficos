import {Material} from "../Material.js";
import {Colors} from "../../scene/Colors.js";

export class WallDoorMaterial extends Material {

    constructor() {
        super();
        this.setColor(Colors.WALL_BROWN);
    }

}