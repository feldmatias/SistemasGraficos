import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Trapezium} from "../../../objects/Trapezium.js";
import {Colors} from "../../../scene/Colors.js";
import {Cylinder} from "../../../objects/Cylinder.js";

export class CatapultFront extends DrawableObject {

    constructor() {
        super();

        this.rotate(Math.PI / 2, 0, 1, 0);

        this.createTrapeziums();
        this.createHandle();
    }

    getChildren() {
        return [
            this.leftTrapezium,
            this.rightTrapezium,
            this.handle,
        ]
    }

    createTrapeziums() {
        this.height = 4;
        this.separation = 3;

        let trapezium = new Trapezium(2.4, 0.8, this.height, 0.2);
        trapezium.setColor(Colors.CATAPULT_BROWN);

        this.leftTrapezium = trapezium.clone();
        this.leftTrapezium.translate(0, this.height / 2, this.separation / 2);

        this.rightTrapezium = trapezium.clone();
        this.rightTrapezium.translate(0, this.height / 2, -this.separation / 2);
    }

    createHandle() {
        this.handle = new Cylinder(0.32, this.separation + 0.4);
        this.handle.setColor(Colors.CATAPULT_DARK_BROWN);
        this.handle.translate(0,  this.height * 0.9, 0);
        this.handle.rotate(Math.PI / 2, 1, 0, 0);
    }
}