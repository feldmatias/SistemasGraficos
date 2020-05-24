import {DrawableObject} from "../../objects/DrawableObject.js";
import {Isle} from "./Isle.js";
import {Water} from "./Water.js";
import {Grass} from "./grass/Grass.js";

export class Terrain extends DrawableObject {

    constructor() {
        super();

        this.isle = new Isle();
        this.water = new Water();
        this.grass = new Grass(this.isle.radius);

        this.translate(0, -0.1, 0);
    }

    getChildren() {
        return [
            this.isle,
            this.water,
            this.grass,
        ]
    }

}