import {DrawableObject} from "../../../objects/DrawableObject.js";
import {CatapultAxle} from "./CatapultAxle.js";
import {Cube} from "../../../objects/Cube.js";
import {Colors} from "../../../scene/Colors.js";

export class CatapultBase extends DrawableObject {

    constructor(width = 5, length = 10) {
        super();

        this.base = new Cube(width, 0.3, length);
        this.base.setColor(Colors.CATAPULT_BROWN);

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

        this.axleFront = axle.clone();
        this.axleFront.translate(0, 0, translation);
        this.axleFront.rotate(Math.PI / 2, 0, 1, 0);

        this.axleBack = axle.clone();
        this.axleBack.translate(0, 0, -translation);
        this.axleBack.rotate(Math.PI / 2, 0, 1, 0);
    }
}