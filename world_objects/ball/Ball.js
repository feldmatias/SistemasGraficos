import {DrawableObject} from "../../objects/DrawableObject.js";
import {Sphere} from "../../objects/Sphere.js";
import {TORCH_FIRE_MATERIAL, Materials} from "../../materials/MaterialsFactory.js";

export class Ball extends DrawableObject {

    constructor() {
        super();

        this.radius = 1

        this.ball = new Sphere(this.radius)
            .setMaterial(Materials.getMaterial(TORCH_FIRE_MATERIAL));
    }

    getChildren() {
        return [
            this.ball
        ]
    }

    setAnimation(ballAnimation) {
        this.animation = ballAnimation;
    }

    getAnimations() {
        return this.animation ? [this.animation] : [];
    }

    shoot() {
        if (this.animation) {
            this.animation.start();
        }
    }

}