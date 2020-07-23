import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Cylinder} from "../../../objects/Cylinder.js";
import {Materials} from "../../../materials/MaterialsFactory.js";
import {CATAPULT_WOOD_MATERIAL} from "../../../materials/MaterialsFactory.js";

export class CatapultWheel extends DrawableObject {

    constructor() {
        super();

        this.object = new Cylinder(1, 0.2)
            .rotateX(Math.PI / 2)
            .setMaterial(Materials.getMaterial(CATAPULT_WOOD_MATERIAL));
    }

    getChildren() {
        return [
            this.object
        ];
    }

}