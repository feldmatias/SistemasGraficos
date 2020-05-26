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

        let trapezium = new Trapezium(0.6, 0.2, this.height, 0.1);
        trapezium.setColor(Colors.CATAPULT_BROWN);

        this.leftTrapezium = trapezium.clone();
        this.leftTrapezium.translate(0, this.height / 2, this.separation / 2);

        this.rightTrapezium = trapezium.clone();
        this.rightTrapezium.translate(0, this.height / 2, -this.separation / 2);
    }

    createHandle() {
        this.handle = new Cylinder(0.07, this.separation + 0.4);
        this.handle.setColor(Colors.CATAPULT_DARK_BROWN);
        this.handle.translate(0,  this.height * 0.85, 0);
        this.handle.rotate(Math.PI / 2, 1, 0, 0);
    }

    createWeight() {
        let size = 1.4;
        this.weight = new Cube(size, size, size);
        this.weight.setColor(Colors.CATAPULT_GREY);
        this.weight.translate(0, -size / 2, 0);
    }
}
