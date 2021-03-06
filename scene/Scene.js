import {World} from "../world_objects/World.js";
import {Menu} from "./Menu.js";
import {OrbitalCamera} from "../cameras/OrbitalCamera.js";
import {CatapultCamera} from "../cameras/CatapultCamera.js";
import {FirstPersonCamera} from "../cameras/FirstPersonCamera.js";


export class Scene {

    constructor(gl, canvas) {
        this.gl = gl;
        this.canvas = canvas;
        this.createMenu();
        this.createSceneObjects();
        this.createCameras();
    }

    createMenu() {
        this.menu = new Menu();
        this.config = this.menu.getSceneConfig();
    }

    createSceneObjects() {
        this.world = new World(this.config);
    }

    createCameras() {
        this.cameras = {
            orbital: new OrbitalCamera(),
            catapult: new CatapultCamera(this.world.catapult),
            firstPerson: new FirstPersonCamera(),
        };

        this.currentCamera = this.cameras[this.config.camera];
        this.currentCamera.activate();
    }

    draw() {
        this.getConfig();

        let skyColor = [10, 20, 85];
        this.gl.setup(this.canvas.width(), this.canvas.height(), skyColor);
        this.setProjection();
        this.setView();
        this.setLighting();
        this.world.draw();
    }

    setProjection() {
        let aspect = this.canvas.width() / this.canvas.height();
        let verticalFieldOfView = 30;
        let near = 0.1;
        let far = 200.0;
        this.gl.getDrawer().setProjection(verticalFieldOfView, aspect, near, far);
    }

    setView() {
        this.gl.getDrawer().setView(
            this.currentCamera.getViewOrigin(),
            this.currentCamera.getViewDestination());
    }

    setLighting() {
        let lightPosition = [80.0, 100.0, 80.0];
        let lightColor = this.config.ambientLight;
        this.gl.getDrawer().setLighting(lightPosition, lightColor);
        this.gl.getDrawer().setPointLights(this.world.getTorches().map(torch => torch.getPosition()), this.config.torchesLight);
        this.gl.getDrawer().setUseNormalMapping(this.config.useNormalMapping);
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

        if (this.config.cameraChanged(lastConfig)) {
            this.currentCamera.deactivate();
            this.currentCamera = this.cameras[this.config.camera];
            this.currentCamera.activate();
        }
    }
}
