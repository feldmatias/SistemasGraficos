import {Material} from "../Material.js";
import {Colors} from "../../scene/Colors.js";

export class WaterMaterial extends Material {

    constructor() {
        super();
        this.setColor(Colors.WATER_BLUE);
    }

}