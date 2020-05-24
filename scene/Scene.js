import {World} from "../world_objects/World.js";


export class Scene {

    constructor(gl, canvas) {
        this.gl = gl;
        this.canvas = canvas;
        this.createSceneObjects()
    }

    createSceneObjects() {
        this.world = new World();
    }

    draw() {
        this.world.rotate(0.03 * 0.15, 0, 1, 0); // Apply angular velocity

        this.gl.setup(this.canvas.width(), this.canvas.height());
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
        let cameraDistance = 12;
        let cameraHeight = 6;
        this.gl.getDrawer().setView(cameraDistance, cameraHeight);
    }

    setLighting() {
        let lightPosition = [0.0, 3.0, 5.0];
        this.gl.getDrawer().setLighting(lightPosition);
    }
}
