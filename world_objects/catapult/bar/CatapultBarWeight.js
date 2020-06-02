import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Trapezium} from "../../../objects/Trapezium.js";
import {Colors} from "../../../scene/Colors.js";
import {Cylinder} from "../../../objects/Cylinder.js";
import {Cube} from "../../../objects/Cube.js";

export class CatapultBarWeight extends DrawableObject {

    constructor() {
        super();

        this.createTrapeziums();
        this.createHandle();
        this.createWeight();
    }

    getChildren() {
        return [
            this.leftTrapezium,
            this.rightTrapezium,
            this.handle,
            this.weight,
        ]
    }

    createTrapeziums() {
        this.height = 0.75;
        this.separation = 1;

        let trapezium = new Trapezium(0.6, 0.2, this.height, 0.1)
            .setColor(Colors.CATAPULT_BROWN);

        this.leftTrapezium = trapezium.clone()
            .translate(0, -this.height / 2 * 0.7, this.separation / 2);

        this.rightTrapezium = trapezium.clone()
            .translate(0, -this.height / 2 * 0.7, -this.separation / 2);
    }

    createHandle() {
        this.handle = new Cylinder(0.07, this.separation + 0.4)
            .setColor(Colors.CATAPULT_DARK_BROWN)
            .rotate(Math.PI / 2, 1, 0, 0);
    }

    createWeight() {
        let size = 1.4;
        this.weight = new Cube(size, size, size)
            .setColor(Colors.CATAPULT_GREY)
            .translate(0, -size, 0);
    }
}
