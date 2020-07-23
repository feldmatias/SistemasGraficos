import {Material} from "../Material.js";
import {Colors} from "../../scene/Colors.js";

export class CastleWindowMaterial extends Material {

    constructor() {
        super();
        this.setColor(Colors.CASTLE_BLACK);
    }

}