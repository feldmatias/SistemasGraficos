import {InputHandler} from "../scene/InputHandler.js";
import {Camera} from "./Camera.js";

export class CatapultCamera extends Camera {

    constructor(catapult) {
        super();
        this.catapult = catapult;
        this.inputHandler = new CatapultCameraInputHandler(this);

        this.height = 5;
        this.distance = 20;
        this.scrollVelocity = 1;
    }

    scroll(direction) {
        this.distance += direction * this.scrollVelocity;

        if (this.distance < 15) {
            this.distance = 15;
        }
        if (this.distance > 45) {
            this.distance = 45;
        }
    }

    getViewOrigin() {
        let matrix = mat4.clone(this.catapult.worldModelMatrix);
        mat4.rotateY(matrix, matrix, Math.PI);
        mat4.translate(matrix, matrix, [0, this.height, -this.distance]);
        let position = vec3.create();
        mat4.getTranslation(position, matrix);
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