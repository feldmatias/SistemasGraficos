import {DrawableObject} from "../../objects/DrawableObject.js";
import {Isle} from "./Isle.js";
import {Water} from "./Water.js";

export class Terrain extends DrawableObject {

    constructor() {
        super();

        this.isle = new Isle();
        this.water = new Water();
    }

    getChildren() {
        return [
            this.isle,
            this.water,
        ]
    }

}