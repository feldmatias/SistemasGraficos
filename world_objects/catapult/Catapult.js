import {DrawableObject} from "../../objects/DrawableObject.js";
import {CatapultBase} from "./base/CatapultBase.js";
import {CatapultBack} from "./back/CatapultBack.js";
import {CatapultFront} from "./front/CatapultFront.js";
import {CatapultBarAnimation} from "./front/bar/CatapultBarAnimation.js";
import {CatapultRope} from "./CatapultRope.js";
import {CatapultInputHandler} from "./CatapultInputHandler.js";

export class Catapult extends DrawableObject {

    constructor() {
        super();

        this.base = new CatapultBase();

        this.back = new CatapultBack()
            .translate(-this.base.length / 2 + 1, this.base.height / 2, 0);

        this.front = new CatapultFront()
            .translate(this.base.length / 2 - 2.5, this.base.height / 2, 0);

        this.rope = new CatapultRope(this.front.getEnvelope(), this.back.getEnvelope());

        this.animation = new CatapultBarAnimation(this.front.handle, this.back.handle, this);
        this.inputHandler = new CatapultInputHandler(this);

        this.moveVelocity = 0.3;
        this.rotationVelocity = 0.01;
        this.rotation = 0;
    }

    getChildren() {
        return [
            this.base,
            this.back,
            this.front,
            this.rope,
        ]
    }

    getAnimations() {
        return [
            this.animation,
        ]
    }

    getBall() {
        return this.front.handle.bar.ball;
    }

    setWorldBall(worldBall) {
        this.worldBall = worldBall;
    }

    startShooting() {
        if (this.worldBall.isShowing) {
            return;
        }
        this.animation.start();
    }

    shoot() {
        this.worldBall.shoot();
    }

    moveForward() {
        this.translate(0, 0, -this.moveVelocity);
        this.base.axleFront.rotateZ(-this.moveVelocity);
        this.base.axleBack.rotateZ(-this.moveVelocity);
    }

    moveBack() {
        this.translate(0, 0, this.moveVelocity);
        this.base.axleFront.rotateZ(this.moveVelocity);
        this.base.axleBack.rotateZ(this.moveVelocity);
    }

    moveLeft() {
        this.rotation -= this.rotationVelocity;
        this.rotateY(-this.rotationVelocity);
    }

    moveRight() {
        this.rotation += this.rotationVelocity;
        this.rotateY(this.rotationVelocity);
    }
}