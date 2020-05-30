import {DrawableObject} from "../objects/DrawableObject.js";
import {Castle} from "./castle/Castle.js";
import {Terrain} from "./terrain/Terrain.js";
import {Catapult} from "./catapult/Catapult.js";
import {Wall} from "./wall/Wall.js";

export class World extends DrawableObject {

    constructor(config) {
        super();

        this.createCastle(config);
        this.createTerrain();
        this.createCatapult();
        this.createWall(config);
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
        this.catapult = new Catapult()
            .scale(0.3)
            .translate(0, 1, 55);
    }

    createWall(config) {
        if (this.wall) {
            this.wall.delete();
        }
        this.wall = new Wall(config.wallColumnCount, config.wallHeight);
    }

    getChildren() {
        return [
            this.castle,
            this.terrain,
            this.catapult,
            this.wall,
        ];
    }

    recreateCastle(config) {
        this.createCastle(config);
        this.catapult.animation.start(); // TODO: do this on button press
    }

    recreateWall(config) {
        this.createWall(config);
    }
}