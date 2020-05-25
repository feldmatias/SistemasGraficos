import {DrawableObject} from "../objects/DrawableObject.js";
import {Castle} from "./castle/Castle.js";
import {Terrain} from "./terrain/Terrain.js";
import {Catapult} from "./catapult/Catapult.js";

export class World extends DrawableObject {

    constructor(config) {
        super();

        this.createCastle(config);
        this.createTerrain();
        this.createCatapult();
    }

    createCastle(config) {
        if (this.castle) {
            this.castle.delete();
        }
        this.castle = new Castle(config.castleWidth, config.castleLength, config.castleFloorsCount);
    }

    createTerrain() {
        this.terrain = new Terrain();
    }

    createCatapult() {
        this.catapult = new Catapult();
    }

    getChildren() {
        return [
            //this.castle,
            //this.terrain,
            this.catapult,
        ];
    }

    recreate(config) {
        this.createCastle(config);
    }
}