import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Cylinder} from "../../../objects/Cylinder.js";
import {CatapultWheel} from "./CatapultWheel.js";
import {CATAPULT_METAL_MATERIAL, Materials} from "../../../materials/MaterialsFactory.js";

export class CatapultAxle extends DrawableObject {

    constructor(size) {
        super();

        this.size = size + 0.2;

        this.axle = new Cylinder(0.1, this.size + 0.46)
            .rotateX(Math.PI / 2)
            .setMaterial(Materials.getMaterial(CATAPULT_METAL_MATERIAL))
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

        this.leftWheel = wheel.clone()
            .translate(0, 0, this.size / 2);

        this.rightWheel = wheel.clone()
            .translate(0, 0, -this.size / 2);
    }

}