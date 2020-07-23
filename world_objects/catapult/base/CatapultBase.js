import {DrawableObject} from "../../../objects/DrawableObject.js";
import {CatapultAxle} from "./CatapultAxle.js";
import {Cube} from "../../../objects/Cube.js";
import {Materials} from "../../../materials/Materials.js";
import {CATAPULT_WOOD_MATERIAL} from "../../../materials/Materials.js";

export class CatapultBase extends DrawableObject {

    constructor(width = 5, length = 8) {
        super();

        this.height = 0.3;
        this.length = length;
        this.width = width;

        this.base = new Cube(this.width, this.height, this.length)
            .setMaterial(Materials.getMaterial(CATAPULT_WOOD_MATERIAL));

        this.createAxles(width, length);
    }

    getChildren() {
        return [
            this.base,
            this.axleFront,
            this.axleBack
        ];
    }

    createAxles(size, length) {
        let axle = new CatapultAxle(size);
        let translation = length / 2 - 1.25;

        this.axleFront = axle.clone()
            .translate(0, 0, translation)
            .rotateY(Math.PI / 2);

        this.axleBack = axle.clone()
            .translate(0, 0, -translation)
            .rotateY(Math.PI / 2);
    }
}