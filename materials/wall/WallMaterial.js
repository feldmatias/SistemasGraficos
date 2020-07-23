import {Material} from "../Material.js";
import {Colors} from "../../scene/Colors.js";

export class WallMaterial extends Material {

    constructor() {
        super();
        this.setColor(Colors.WALL_GREY);
    }

}