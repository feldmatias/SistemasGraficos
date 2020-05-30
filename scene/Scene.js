import {World} from "../world_objects/World.js";
import {Menu} from "./Menu.js";
import {Colors} from "./Colors.js";


export class Scene {

    constructor(gl, canvas) {
        this.gl = gl;
        this.canvas = canvas;
        this.createMenu();
        this.createSceneObjects();
    }

    createMenu() {
        this.menu = new Menu();
        this.config = this.menu.getSceneConfig();
    }

    createSceneObjects() {
        this.world = new World(this.config);
    }

    draw() {
        this.getConfig();

        //this.world.rotate(0.03 * 0.15 * this.config.angularVelocity, 0, 1, 0); // Apply angular velocity

        this.gl.setup(this.canvas.width(), this.canvas.height(), Colors.SKY_BLUE);
        this.setProjection();
        this.setView();
        this.setLighting();
        this.world.draw();
    }

    setProjection() {
        let aspect = this.canvas.width() / this.canvas.height();
        let verticalFieldOfView = 30;
        let near = 0.1;
        let far = 100.0;
        this.gl.getDrawer().setProjection(verticalFieldOfView, aspect, near, far);
    }

    setView() {
        this.gl.getDrawer().setView(this.config.cameraDistance, this.config.cameraHeight);
    }

    setLighting() {
        let lightPosition = [0.0, 19.0, 15.0];
        this.gl.getDrawer().setLighting(lightPosition);
    }

    getConfig() {
        let lastConfig = this.config;
        this.config = this.menu.getSceneConfig();

        if (this.config.castleConfigChanged(lastConfig)) {
            this.world.recreateCastle(this.config);
        }

        if (this.config.wallConfigChanged(lastConfig)) {
            this.world.recreateWall(this.config);
        }
    }
}
