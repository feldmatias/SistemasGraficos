import {Material} from "../Material.js";
import {Colors} from "../../scene/Colors.js";

export class CastleRoofMaterial extends Material {

    constructor() {
        super();
        this.setColor(Colors.CASTLE_BLUE);
    }

}