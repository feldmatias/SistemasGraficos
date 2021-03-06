import {DrawableObject} from "../objects/DrawableObject.js";
import {Castle} from "./castle/Castle.js";
import {Terrain} from "./terrain/Terrain.js";
import {Catapult} from "./catapult/Catapult.js";
import {Wall} from "./wall/Wall.js";
import {BallAnimation} from "./ball/BallAnimation.js";
import {Ball} from "./ball/Ball.js";

export class World extends DrawableObject {

    constructor(config) {
        super();

        this.createCastle(config);
        this.createTerrain();
        this.createCatapult();
        this.createWall(config);
        this.createBall();
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
            .scale(0.7)
            .translate(0, 1, 55);
    }

    createWall(config) {
        if (this.wall) {
            this.wall.delete();
        }
        this.wall = new Wall(config.wallColumnCount, config.wallHeight);
    }

    createBall() {
        this.ball = new Ball();
        this.ball.hide();

        let ballAnimation = new BallAnimation(this.ball, this.catapult.getBall(), this);
        this.ball.setAnimation(ballAnimation);
        this.catapult.setWorldBall(this.ball);
    }

    getChildren() {
        return [
            this.castle,
            this.terrain,
            this.catapult,
            this.wall,
            this.ball,
        ];
    }

    recreateCastle(config) {
        this.createCastle(config);
    }

    recreateWall(config) {
        this.createWall(config);
    }

    getTorches() {
        return [
            this.ball,
            this.catapult.getBall(),
            this.wall.getTorches(),
        ].flat().filter(o => o.isShowing);
    }
}
