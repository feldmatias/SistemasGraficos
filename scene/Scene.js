import {FiguraCompuesta} from "../test_figures/figuracompuesta.js";

export class Scene {

    constructor(gl) {
        this.gl = gl;
        this.createSceneObjects()
    }

    createSceneObjects() {
        this.mainObject = new FiguraCompuesta(this.gl);
    }

    draw() {
        this.mainObject.rotate(0.03 * 0.15, 0, 1, 0); // Apply angular velocity

        this.setProjection();
        this.setView();
        this.setLighting();
        this.mainObject.draw();
    }

    setProjection() {
        let verticalFieldOfView = 30;
        let aspect = 1920 / 1080;
        let near = 0.1;
        let far = 100.0;
        this.gl.setProjection(verticalFieldOfView, aspect, near, far);
    }

    setView() {
        let cameraDistance = 3;
        let cameraHeight = 0.3;
        this.gl.setView(cameraDistance, cameraHeight);
    }

    setLighting() {
        let lightPosition = [10.0, 0.0, 3.0];
        let ambientColor = [0.6, 0.6, 0.6];
        let directionalColor = [1.2, 1.1, 0.7];
        this.gl.setLighting(lightPosition, ambientColor, directionalColor);
    }
}
