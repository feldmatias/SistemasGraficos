import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Trapezium} from "../../../objects/Trapezium.js";
import {Colors} from "../../../scene/Colors.js";

export class CatapultBack extends DrawableObject {

    constructor() {
        super();

        this.rotate(Math.PI / 2, 0, 1, 0);

        this.createTrapeziums();
    }

    getChildren() {
        return [
            this.leftTrapezium,
            this.rightTrapezium,
        ]
    }

    createTrapeziums() {
        let height = 1.5;
        let separation = 1.2;

        let trapezium = new Trapezium(1.2, 0.4, height, 0.1);
        trapezium.setColor(Colors.CATAPULT_BROWN);

        this.leftTrapezium = trapezium.clone();
        this.leftTrapezium.translate(0, height / 2, separation / 2);

        this.rightTrapezium = trapezium.clone();
        this.rightTrapezium.translate(0, height / 2, -separation / 2);
    }
}