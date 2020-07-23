import {DrawableObject} from "../../../../objects/DrawableObject.js";
import {Cube} from "../../../../objects/Cube.js";
import {Colors} from "../../../../scene/Colors.js";
import {CatapultBarWeight} from "./CatapultBarWeight.js";
import {Ball} from "../../../ball/Ball.js";
import {Cylinder} from "../../../../objects/Cylinder.js";
import {Materials} from "../../../../materials/Materials.js";
import {CATAPULT_WOOD_MATERIAL} from "../../../../materials/Materials.js";

export class CatapultBar extends DrawableObject {

    constructor() {
        super();

        this.createBar();
        this.createMunitionBase();
        this.createBarWeight();
        this.createBall();
        this.createEnvelope();
    }

    getChildren() {
        return [
            this.bar,
            this.munitionBase,
            this.barWeight,
            this.ball,
            this.envelope,
        ]
    }

    createBar() {
        this.length = 9;
        this.bar = new Cube(0.7, 0.4, this.length)
            .setMaterial(Materials.getMaterial(CATAPULT_WOOD_MATERIAL));
    }

    createMunitionBase() {
        let size = 2.5;
        this.munitionBase = new Cube(size, 0.4, size)
            .setMaterial(Materials.getMaterial(CATAPULT_WOOD_MATERIAL))
            .translate(0, 0, this.length / 2);
    }

    createBarWeight() {
        this.barWeight = new CatapultBarWeight();
        this.barWeight.translate(0, 0, -this.length / 2 * 0.95)
            .rotateY(Math.PI / 2);
    }

    createBall() {
        this.ball = new Ball()
        this.ball.translate(0, this.ball.radius + 0.2, this.length / 2);
    }

    createEnvelope() {
        this.envelope = new Cylinder(0.5, 0.35)
            .setColor(Colors.WHITE)
            .translate(0, 0, 1)
            .rotateX(Math.PI / 2);
    }
}
