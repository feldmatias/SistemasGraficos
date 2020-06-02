import {DrawableObject} from "../../objects/DrawableObject.js";
import {Cylinder} from "../../objects/Cylinder.js";
import {Colors} from "../../scene/Colors.js";

export class CatapultRope extends DrawableObject {

    constructor(frontEnvelope, backEnvelope) {
        super();
        this.frontEnvelope = frontEnvelope;
        this.backEnvelope = backEnvelope;

        this.rope = new Cylinder(0.015, 1)
            .setColor(Colors.WHITE);
    }

    draw() {
        this.initialize();
        this.rope.draw();
    }

    initialize() {
        let origin = this.getOrigin();
        let destination = this.getDestination();

        let distance = vec3.distance(destination, origin);

        let lookMatrix = mat4.create();
        mat4.targetTo(lookMatrix, origin, destination, vec3.fromValues(0, 1, 0));

        this.rope.setModelMatrix(lookMatrix)
            .rotateX(Math.PI / 2)
            .scaleY(distance)
            .translate(0, -0.5, 0);
    }

    getOrigin() {
        let origin = vec3.create();
        mat4.translate(this.frontEnvelope.worldModelMatrix, this.frontEnvelope.worldModelMatrix, [0, 0, 0.5]);
        mat4.getTranslation(origin, this.frontEnvelope.worldModelMatrix);
        mat4.translate(this.frontEnvelope.worldModelMatrix, this.frontEnvelope.worldModelMatrix, [0, 0, -0.5]);
        return origin;
    }

    getDestination() {
        let destination = vec3.create();
        mat4.getTranslation(destination, this.backEnvelope.worldModelMatrix);
        return destination;
    }
}