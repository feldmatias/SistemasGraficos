import {DrawableObject} from "../../objects/DrawableObject.js";
import {Cylinder} from "../../objects/Cylinder.js";
import {Materials, TORCH_FIRE_MATERIAL, TORCH_MATERIAL} from "../../materials/MaterialsFactory.js";
import {Sphere} from "../../objects/Sphere.js";

export class Torch extends DrawableObject {

    constructor() {
        super();

        this.height = 1.4;

        this.createTorch();
        this.createFire();
    }

    getChildren() {
        return [
            this.torch,
            this.fire,
        ]
    }


    createTorch() {
        this.torch = new Cylinder(0.1, this.height)
            .translate(0, this.height / 2, 0)
            .setMaterial(Materials.getMaterial(TORCH_MATERIAL));
    }

    createFire() {
        this.fire = new Sphere(0.3)
            .translate(0, this.height, 0)
            .setMaterial(Materials.getMaterial(TORCH_FIRE_MATERIAL));
    }
}