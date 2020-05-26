import {DrawableObject} from "../objects/DrawableObject.js";
import {Sphere} from "../objects/Sphere.js";
import {Colors} from "../scene/Colors.js";

export class Ball extends DrawableObject {

    constructor() {
        super();

        this.radius = 1

        this.ball = new Sphere(this.radius)
            .setColor(Colors.BALL_GREY);
    }

    getChildren() {
        return [
            this.ball
        ]
    }

}