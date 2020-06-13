import {InputHandler} from "../scene/InputHandler.js";
import {Camera} from "./Camera.js";

export class FirstPersonCamera extends Camera {

    constructor() {
        super();
        this.inputHandler = new FirstPersonCameraInputHandler(this);

        this.position = vec3.fromValues(0, 2, 50);
        this.forward = vec3.fromValues(0, 0, 1);
        this.right = vec3.fromValues(1, 0, 0);

        this.alpha = Math.PI;
        this.beta = 1.5;
        this.rotate(this.alpha);

        this.lookVelocity = 0.002;
        this.moveVelocity = 0.5;
    }

    moveLook(deltaX, deltaY) {
        this.alpha += deltaX * this.lookVelocity;
        this.beta += deltaY * this.lookVelocity;

        if (this.beta > 3) {
            this.beta = 3;
        }
        if (this.beta < 0) {
            this.beta = 0;
        }

        this.rotate(deltaX * this.lookVelocity);
    }

    moveForward() {
        this.position[2] += this.moveVelocity * this.forward[2];
        this.position[0] += this.moveVelocity * this.forward[0];
    }

    moveBack() {
        this.position[2] -= this.moveVelocity * this.forward[2];
        this.position[0] -= this.moveVelocity * this.forward[0];
    }

    moveLeft() {
        this.position[2] -= this.moveVelocity * this.right[2];
        this.position[0] -= this.moveVelocity * this.right[0];
    }

    moveRight() {
        this.position[2] += this.moveVelocity * this.right[2];
        this.position[0] += this.moveVelocity * this.right[0];
    }

    rotate(angle) {
        let rotation = mat4.create();
        mat4.fromRotation(rotation, angle, [0, 1, 0]);
        vec3.transformMat4(this.forward, this.forward, rotation);
        vec3.transformMat4(this.right, this.right, rotation);
    }

    getViewOrigin() {
        return this.position;
    }

    getViewDestination() {
        let destination = vec3.fromValues(
            Math.sin(this.alpha) * Math.sin(this.beta),
            Math.cos(this.beta),
            Math.cos(this.alpha) * Math.sin(this.beta)
        );
        vec3.add(destination, this.getViewOrigin(), destination);
        return destination;
    }

}

class FirstPersonCameraInputHandler extends InputHandler {

    constructor(camera) {
        super();
        this.camera = camera;
    }

    onMouseMoved(deltaX, deltaY) {
        if (this.camera.isActive()) {
            this.camera.moveLook(deltaX, deltaY);
        }
    }

    onKeyPressed(key) {
        switch (key) {
            case 'w':
                this.camera.moveForward();
                break;
            case 'a':
                this.camera.moveLeft();
                break;
            case 's':
                this.camera.moveBack();
                break;
            case 'd':
                this.camera.moveRight();
                break;
        }
    }

}