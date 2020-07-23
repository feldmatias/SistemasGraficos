import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Trapezium} from "../../../objects/Trapezium.js";
import {CatapultFrontHandle} from "./CatapultFrontHandle.js";
import {Materials} from "../../../materials/Materials.js";
import {CATAPULT_WOOD_MATERIAL} from "../../../materials/Materials.js";

export class CatapultFront extends DrawableObject {

    constructor() {
        super();

        this.rotateY(Math.PI / 2);

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

        let trapezium = new Trapezium(2.4, 0.8, this.height, 0.2)
            .setMaterial(Materials.getMaterial(CATAPULT_WOOD_MATERIAL));

        this.leftTrapezium = trapezium.clone()
            .translate(0, this.height / 2, this.separation / 2);

        this.rightTrapezium = trapezium.clone()
            .translate(0, this.height / 2, -this.separation / 2);
    }

    createHandle() {
        this.handle = new CatapultFrontHandle(this.separation)
            .translate(0, this.height * 0.9, 0);
    }

    getEnvelope() {
        return this.handle.bar.envelope;
    }
}