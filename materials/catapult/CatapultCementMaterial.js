import {Material} from "../Material.js";
import {Colors} from "../../scene/Colors.js";

export class CatapultCementMaterial extends Material {

    constructor() {
        super();
        this.setColor(Colors.CATAPULT_GREY);
    }

}