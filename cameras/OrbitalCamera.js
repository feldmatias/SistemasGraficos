import {InputHandler} from "../scene/InputHandler.js";
import {Camera} from "./Camera.js";

export class OrbitalCamera extends Camera {

    constructor() {
        super();
        this.inputHandler = new OrbitalCameraInputHandler(this);

        this.alpha = 0;
        this.beta = 1.3;
        this.distance = 40;

        this.moveVelocity = 0.003;
        this.scrollVelocity = 2;
    }

    move(deltaX, deltaY) {
        this.alpha += deltaX * this.moveVelocity;
        this.beta += deltaY * this.moveVelocity;

        if (this.beta > Math.PI / 2 - 0.02) {
            this.beta = Math.PI / 2 - 0.02;
        }
        if (this.beta < 0.01) {
            this.beta = 0.01;
        }
    }

    scroll(direction) {
        this.distance += direction * this.scrollVelocity;

        if (this.distance < 10) {
            this.distance = 10;
        }
        if (this.distance > 100) {
            this.distance = 100;
        }
    }

    getViewOrigin() {
        return vec3.fromValues(
            this.distance * Math.sin(this.alpha) * Math.sin(this.beta),
            this.distance * Math.cos(this.beta) ,
            this.distance * Math.cos(this.alpha) * Math.sin(this.beta)
        );
    }

    getViewDestination() {
        return vec3.fromValues(0, 0, 0);
    }

}

class OrbitalCameraInputHandler extends InputHandler {

    constructor(camera) {
        super();
        this.camera = camera;
    }

    onMouseMoved(deltaX, deltaY) {
        if (this.camera.isActive()) {
            this.camera.move(deltaX, -deltaY);
        }
    }

    onScroll(direction) {
        if (this.camera.isActive()) {
            this.camera.scroll(-direction);
        }
    }

}