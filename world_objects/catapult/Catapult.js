import {DrawableObject} from "../../objects/DrawableObject.js";
import {CatapultAxle} from "./CatapultAxle.js";

export class Catapult extends DrawableObject {

    constructor() {
        super();

        this.createAxles();
    }

    createAxles() {
        this.wheels = [];
        let wheel_base = new CatapultAxle(5);
        for (let i = 0; i < 1; i++) {
            let wheel = wheel_base.clone();
            wheel.translate(0, 0, i * 5);
            this.wheels.push(wheel);
        }
    }

    getChildren() {
        return this.wheels;
    }
}