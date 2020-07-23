import {Material} from "../Material.js";
import {Colors} from "../../scene/Colors.js";

export class GrassMaterial extends Material {

    constructor() {
        super();
        this.setColor(Colors.GRASS_GREEN);
    }

}