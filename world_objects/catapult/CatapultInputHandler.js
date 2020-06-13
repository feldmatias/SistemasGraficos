import {InputHandler} from "../../scene/InputHandler.js";

export class CatapultInputHandler extends InputHandler {

    constructor(catapult) {
        super();
        this.catapult = catapult;
    }

    onKeyPressed(key) {
        switch (key) {
            case 'u':
            case 'ArrowUp':
                this.catapult.moveForward();
                break;
            case 'h':
            case 'ArrowLeft':
                this.catapult.moveLeft();
                break;
            case 'j':
            case 'ArrowDown':
                this.catapult.moveBack();
                break;
            case 'k':
            case 'ArrowRight':
                this.catapult.moveRight();
                break;
            case ' ':
                this.catapult.startShooting();
                break;
        }
    }

}