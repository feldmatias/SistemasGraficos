import {DrawableObject} from "../objects/DrawableObject.js";
import {Castle} from "./castle/Castle.js";

export class World extends DrawableObject {

    constructor(config) {
        super();

        this.createCastle(config);
    }

    createCastle(config) {
        if (this.castle) {
            this.castle.delete();
        }
        this.castle = new Castle(config.castleWidth, config.castleLength, config.castleFloorsCount);
    }

    getChildren() {
        return [
            this.castle
        ];
    }

    recreate(config) {
        this.createCastle(config);
    }
}