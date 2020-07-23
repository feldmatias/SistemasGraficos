import {Material} from "../Material.js";
import {Colors} from "../../scene/Colors.js";

export class CatapultMetalMaterial extends Material {

    constructor() {
        super();
        this.setColor(Colors.CATAPULT_DARK_BROWN);
    }

}