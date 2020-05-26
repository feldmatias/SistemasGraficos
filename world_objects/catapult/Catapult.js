import {DrawableObject} from "../../objects/DrawableObject.js";
import {CatapultBase} from "./base/CatapultBase.js";
import {CatapultBack} from "./back/CatapultBack.js";
import {CatapultFront} from "./front/CatapultFront.js";

export class Catapult extends DrawableObject {

    constructor() {
        super();

        this.base = new CatapultBase();

        this.back = new CatapultBack();
        this.back.translate(-this.base.length / 2 + 1, this.base.height / 2, 0);

        this.front = new CatapultFront();
        this.front.translate(this.base.length / 2 - 2.5, this.base.height / 2, 0);
    }

    getChildren() {
        return [
            this.base,
            this.back,
            this.front,
        ]
    }
}