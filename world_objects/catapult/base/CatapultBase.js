import {DrawableObject} from "../../../objects/DrawableObject.js";
import {CatapultAxle} from "./CatapultAxle.js";
import {Cube} from "../../../objects/Cube.js";
import {Colors} from "../../../scene/Colors.js";

export class CatapultBase extends DrawableObject {

    constructor(width = 5, length = 8) {
        super();

        this.height = 0.3;
        this.length = length;
        this.width = width;

        this.base = new Cube(this.width, this.height, this.length)
            .setColor(Colors.CATAPULT_BROWN);

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