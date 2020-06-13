import {InputHandler} from "../scene/InputHandler.js";
import {Camera} from "./Camera.js";

export class CatapultCamera extends Camera {

    constructor(catapult) {
        super();
        this.catapult = catapult;
        this.inputHandler = new CatapultCameraInputHandler(this);

        this.height = 5;
        this.distance = 14;
        this.scrollVelocity = 1;
    }

    scroll(direction) {
        this.distance += direction * this.scrollVelocity;

        if (this.distance < 10) {
            this.distance = 10;
        }
        if (this.distance > 30) {
            this.distance = 30;
        }
    }

    getViewOrigin() {
        let position = this.catapult.getPosition();
        position[1] += this.height;
        position[2] += this.distance;
        return position;
    }

    getViewDestination() {
        return this.catapult.getPosition();
    }

}

class CatapultCameraInputHandler extends InputHandler {

    constructor(camera) {
        super();
        this.camera = camera;
    }

    onScroll(direction) {
        if (this.camera.isActive()) {
            this.camera.scroll(-direction);
        }
    }

}