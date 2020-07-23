import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Trapezium} from "../../../objects/Trapezium.js";
import {CatapultBackHandle} from "./CatapultBackHandle.js";
import {Materials} from "../../../materials/MaterialsFactory.js";
import {CATAPULT_WOOD_MATERIAL} from "../../../materials/MaterialsFactory.js";

export class CatapultBack extends DrawableObject {

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
        this.height = 1.5;
        this.separation = 1.2;

        let trapezium = new Trapezium(1.2, 0.4, this.height, 0.1)
            .setMaterial(Materials.getMaterial(CATAPULT_WOOD_MATERIAL));

        this.leftTrapezium = trapezium.clone()
            .translate(0, this.height / 2, this.separation / 2);

        this.rightTrapezium = trapezium.clone()
            .translate(0, this.height / 2, -this.separation / 2);
    }

    createHandle() {
        this.handle = new CatapultBackHandle(this.separation)
            .translate(0, this.height * 0.6, 0);
    }

    getEnvelope() {
        return this.handle.envelope;
    }
}