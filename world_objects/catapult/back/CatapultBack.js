import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Trapezium} from "../../../objects/Trapezium.js";
import {Colors} from "../../../scene/Colors.js";
import {CatapultBackHandle} from "./CatapultBackHandle.js";

export class CatapultBack extends DrawableObject {

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
        this.height = 1.5;
        this.separation = 1.2;

        let trapezium = new Trapezium(1.2, 0.4, this.height, 0.1)
            .setColor(Colors.CATAPULT_BROWN);

        this.leftTrapezium = trapezium.clone()
            .translate(0, this.height / 2, this.separation / 2);

        this.rightTrapezium = trapezium.clone()
            .translate(0, this.height / 2, -this.separation / 2);
    }

    createHandle() {
        this.handle = new CatapultBackHandle(this.separation)
            .translate(0, this.height * 0.6, 0);
    }
}