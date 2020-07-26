import {Plane} from "../../objects/Plane.js";
import {DrawableObject} from "../../objects/DrawableObject.js";
import {Materials, WATER_MATERIAL} from "../../materials/MaterialsFactory.js";

export class Water extends DrawableObject {

    constructor(radius = 100) {
        super();

        this.object = new Plane(radius, radius, 10)
            .setMaterial(Materials.getMaterial(WATER_MATERIAL))
            .translate(0, 0.05, 0);
    }

    getChildren() {
        return [
            this.object
        ];
    }

}