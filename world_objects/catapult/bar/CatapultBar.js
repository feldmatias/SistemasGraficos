import {DrawableObject} from "../../../objects/DrawableObject.js";
import {Cube} from "../../../objects/Cube.js";
import {Colors} from "../../../scene/Colors.js";
import {CatapultBarWeight} from "./CatapultBarWeight.js";
import {Ball} from "../../Ball.js";
import {Cylinder} from "../../../objects/Cylinder.js";

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
            .setColor(Colors.CATAPULT_BROWN);
    }

    createMunitionBase() {
        let size = 2.5;
        this.munitionBase = new Cube(size, 0.4, size)
            .setColor(Colors.CATAPULT_BROWN)
            .translate(0, 0, this.length / 2);
    }

    createBarWeight() {
        this.barWeight = new CatapultBarWeight();
        this.barWeight.translate(0, -this.barWeight.height * 0.9, -this.length / 2 * 0.95)
            .rotate(Math.PI / 2, 0, 1, 0);
    }

    createBall() {
        this.ball = new Ball()
        this.ball.translate(0, this.ball.radius + 0.2, this.length / 2);
    }

    createEnvelope() {
        this.envelope = new Cylinder(0.5, 0.35)
            .setColor(Colors.WHITE)
            .translate(0, 0, 1)
            .rotate(Math.PI / 2, 1, 0, 0);
    }
}