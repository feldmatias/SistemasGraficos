import {DrawableObject} from "../../objects/DrawableObject.js";
import {Cylinder} from "../../objects/Cylinder.js";
import {Colors} from "../../scene/Colors.js";
import {CatapultWheel} from "./CatapultWheel.js";

export class CatapultAxle extends DrawableObject {

    constructor(size) {
        super();

        this.size = size;

        this.axle = new Cylinder(0.1, size + 0.4);
        this.axle.rotate(Math.PI / 2, 1, 0, 0);
        this.axle.setColor(Colors.CATAPULT_DARK_BROWN);
        this.createWheels();
    }

    getChildren() {
        return [
            this.axle,
            this.leftWheel,
            this.rightWheel
        ];
    }

    createWheels() {
        let wheel = new CatapultWheel();

        this.leftWheel = wheel.clone();
        this.leftWheel.translate(0, 0, this.size / 2);

        this.rightWheel = wheel.clone();
        this.rightWheel.translate(0, 0, -this.size / 2);
    }

}