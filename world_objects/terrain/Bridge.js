import {DrawableObject} from "../../objects/DrawableObject.js";
import {Cube} from "../../objects/Cube.js";
import {GRASS_MATERIAL, Materials} from "../../materials/MaterialsFactory.js";

export class Bridge extends DrawableObject {

    constructor(width, length) {
        super();

        this.object = new Cube(width, 0.1, length, 0.5)
            .setMaterial(Materials.getMaterial(GRASS_MATERIAL))
            .translate(0, 0.052, 0);
    }

    getChildren() {
        return [
            this.object
        ];
    }

}