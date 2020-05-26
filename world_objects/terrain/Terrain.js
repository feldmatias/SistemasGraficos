import {DrawableObject} from "../../objects/DrawableObject.js";
import {Isle} from "./Isle.js";
import {Water} from "./Water.js";
import {Grass} from "./grass/Grass.js";
import {Bridge} from "./Bridge.js";

export class Terrain extends DrawableObject {

    constructor() {
        super();

        this.isle = new Isle();
        this.water = new Water();
        this.grass = new Grass(this.isle.radius);
        this.createBridge();

        this.translate(0, -0.1, 0);
    }

    getChildren() {
        return [
            this.isle,
            this.water,
            this.grass,
            this.bridge,
        ]
    }

    createBridge() {
        let length = this.grass.waterLength;
        this.bridge = new Bridge(2, length + 1)
            .translate(0, 0, this.isle.radius + length / 2);
    }
}