import {DrawableObject} from "../../../objects/DrawableObject.js";
import {CatapultAxle} from "./CatapultAxle.js";
import {Cube} from "../../../objects/Cube.js";
import {Colors} from "../../../scene/Colors.js";

export class CatapultBase extends DrawableObject {

    constructor(width = 4, length = 8) {
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

        this.axleFront = axle.clone();
        this.axleFront.translate(0, 0, length / 4);
        this.axleFront.rotate(Math.PI / 2, 0, 1, 0);

        this.axleBack = axle.clone();
        this.axleBack.translate(0, 0, -length / 4);
        this.axleBack.rotate(Math.PI / 2, 0, 1, 0);
    }
}