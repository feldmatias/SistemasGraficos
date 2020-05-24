import {DrawableObject} from "../../objects/DrawableObject.js";
import {Isle} from "./Isle.js";

export class Terrain extends DrawableObject {

    constructor() {
        super();

        this.isle = new Isle();
    }

    getChildren() {
        return [
            this.isle,
        ]
    }

}