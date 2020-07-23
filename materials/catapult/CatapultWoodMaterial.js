import {Material} from "../Material.js";
import {Colors} from "../../scene/Colors.js";

export class CatapultWoodMaterial extends Material {

    constructor() {
        super();
        this.setColor(Colors.CATAPULT_BROWN);
    }

}