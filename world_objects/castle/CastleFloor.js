import {DrawableObject} from "../../objects/DrawableObject.js";
import {SquareShape} from "../../surfaces/shapes/SquareShape.js";
import {LinePath} from "../../surfaces/paths/LinePath.js";
import {SurfacesGenerator} from "../../surfaces/SurfacesGenerator.js";
import {CastleWindow} from "./window/CastleWindow.js";
import {CASTLE_WALL_MATERIAL, Materials} from "../../materials/MaterialsFactory.js";

export class CastleFloor extends DrawableObject {

    constructor(width, length, height) {
        super();
        this.initialize(width, length, height);
    }

    getChildren() {
        return this.windows;
    }

    initialize(width, length, height) {
        let shape = new SquareShape(width, length);
        let path = new LinePath(height);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path);

        this.setBuffers(data)
            .rotateX(-Math.PI / 2)
            .setMaterial(Materials.getMaterial(CASTLE_WALL_MATERIAL));

        this.createWindows(width, length, height);
    }

    getUvsScale() {
        return [3, 0.5];
    }

    createWindows(width, length, height) {
        this.windows = [];
        let windowWidth = 0.6;
        let windowHeight = height / 2;
        let window = new CastleWindow(windowWidth, windowHeight);

        for (let i = 0; i < width - 1; i++) {
            let windowFront = window.clone()
                .rotateX(Math.PI / 2)
                .translate(width / 2 - 1 - i, 0, length / 2);

            let windowBack = window.clone()
                .rotateX(Math.PI / 2)
                .translate(width / 2 - 1 - i, 0, -length / 2);

            this.windows.push(windowFront, windowBack);
        }

        for (let i = 0; i < length - 1; i++) {
            let windowLeft = window.clone()
                .rotateX(Math.PI / 2)
                .translate(width / 2, 0, length / 2 - 1 - i)
                .rotateY(Math.PI / 2);

            let windowRight = window.clone()
                .rotateX(Math.PI / 2)
                .translate(-width / 2, 0, length / 2 - 1 - i)
                .rotateY(Math.PI / 2);

            this.windows.push(windowLeft, windowRight);
        }
    }
}