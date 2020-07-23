import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Cylinder} from "../../../objects/Cylinder.js";
import {CatapultBar} from "./bar/CatapultBar.js";
import {CATAPULT_METAL_MATERIAL, Materials} from "../../../materials/MaterialsFactory.js";

export class CatapultFrontHandle extends DrawableObject {

    constructor(size) {
        super();

        this.size = size + 0.4;

        this.createBase();
        this.createBar();
    }

    getChildren() {
        return [
            this.base,
            this.bar,
        ]
    }

    createBase() {
        this.base = new Cylinder(0.32, this.size)
            .setMaterial(Materials.getMaterial(CATAPULT_METAL_MATERIAL))
            .rotateX(Math.PI / 2);
    }

    createBar() {
        this.bar = new CatapultBar()
            .rotateY(-Math.PI / 2);
        this.bar.translate(0, 0.25, this.bar.length / 2 * 0.7);
    }

    move(angle) {
        this.rotateZ(-angle);
        this.bar.barWeight.rotateZ(angle);
    }
}
