import {DrawableObject} from "../../objects/DrawableObject.js";
import {CatapultBase} from "./base/CatapultBase.js";

export class Catapult extends DrawableObject {

    constructor() {
        super();

        this.base = new CatapultBase();
    }

    getChildren() {
        return [
            this.base,
        ]
    }
}