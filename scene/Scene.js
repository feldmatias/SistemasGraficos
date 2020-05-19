import { FiguraCompuesta } from "../test_figures/figuracompuesta.js";

export class Scene {

    constructor(gl, canvas) {
        this.gl = gl;
        this.canvas = canvas;
        this.createSceneObjects()
    }

    createSceneObjects() {
        this.mainObject = new FiguraCompuesta(this.gl);
    }

    draw() {
        this.mainObject.rotate(0.03 * 0.15, 0, 1, 0); // Apply angular velocity

        this.gl.setup(this.canvas.width(), this.canvas.height());
        this.setProjection();
        this.setView();
        this.setLighting();
        this.mainObject.draw();
    }

    setProjection() {
        let aspect = this.canvas.width() / this.canvas.height();
        let verticalFieldOfView = 30;
        let near = 0.1;
        let far = 100.0;
        this.gl.getDrawer().setProjection(verticalFieldOfView, aspect, near, far);
    }

    setView() {
        let cameraDistance = 3;
        let cameraHeight = 0.3;
        this.gl.getDrawer().setView(cameraDistance, cameraHeight);
    }

    setLighting() {
        let lightPosition = [10.0, 0.0, 3.0];
        let ambientColor = [0.6, 0.6, 0.6];
        let directionalColor = [1.2, 1.1, 0.7];
        this.gl.getDrawer().setLighting(lightPosition, ambientColor, directionalColor);
    }
}
