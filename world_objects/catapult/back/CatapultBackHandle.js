import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Cylinder} from "../../../objects/Cylinder.js";
import {Colors} from "../../../scene/Colors.js";

export class CatapultBackHandle extends DrawableObject {

    constructor(size) {
        super();

        this.size = size + 0.8;

        this.createBase();
        this.createHandles();
        this.createEnvelope();
    }

    getChildren() {
        return [
            this.base,
            this.leftHandle,
            this.rightHandle,
            this.envelope,
        ]
    }

    createBase() {
        this.base = new Cylinder(0.2, this.size)
            .setColor(Colors.CATAPULT_DARK_BROWN)
            .rotate(Math.PI / 2, 1, 0, 0);
    }

    createHandles() {
        let handle = new Cylinder(0.03, 1)
            .setColor(Colors.CATAPULT_BROWN);
        let translation = this.size / 2 * 0.85;

        this.leftHandle = handle.clone()
            .translate(0, 0, translation);

        this.rightHandle = handle.clone()
            .translate(0, 0, -translation);
    }

    createEnvelope() {
        this.envelope = new Cylinder(0.4, this.size / 4)
            .setColor(Colors.WHITE)
            .rotate(Math.PI / 2, 1, 0, 0);
    }
}