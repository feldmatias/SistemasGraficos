import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Cylinder} from "../../../objects/Cylinder.js";
import {
    CATAPULT_METAL_MATERIAL,
    CATAPULT_WOOD_MATERIAL,
    Materials,
    ROPE_MATERIAL
} from "../../../materials/MaterialsFactory.js";

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
            .setMaterial(Materials.getMaterial(CATAPULT_METAL_MATERIAL))
            .rotateX(Math.PI / 2);
    }

    createHandles() {
        let handle = new Cylinder(0.03, 1)
            .setMaterial(Materials.getMaterial(CATAPULT_WOOD_MATERIAL));
        let translation = this.size / 2 * 0.85;

        this.leftHandle = handle.clone()
            .translate(0, 0, translation);

        this.rightHandle = handle.clone()
            .translate(0, 0, -translation);
    }

    createEnvelope() {
        this.envelope = new Cylinder(0.4, this.size / 4)
            .setMaterial(Materials.getMaterial(ROPE_MATERIAL))
            .rotateX(Math.PI / 2);
    }

    move(angle) {
        let velocity = 8;
        this.rotateZ(-angle * velocity);
    }
}