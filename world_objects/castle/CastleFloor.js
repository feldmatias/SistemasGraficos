import {DrawableObject} from "../../objects/DrawableObject.js";
import {SquareShape} from "../../surfaces/shapes/SquareShape.js";
import {LinePath} from "../../surfaces/paths/LinePath.js";
import {SurfacesGenerator} from "../../surfaces/SurfacesGenerator.js";
import {Colors} from "../../scene/Colors.js";
import {CastleWindow} from "./window/CastleWindow.js";

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
        this.setBuffers(data);
        this.rotate(-Math.PI / 2, 1, 0, 0);
        this.setColor(Colors.CASTLE_YELLOW);

        this.createWindows(width, length, height);
    }

    createWindows(width, length, height) {
        this.windows = [];
        let windowWidth = 0.6;
        let windowHeight = height / 2;

        for (let i = 0; i < width - 1; i++) {
            let windowFront = new CastleWindow(windowWidth, windowHeight);
            windowFront.rotate(Math.PI / 2, 1, 0, 0);
            windowFront.translate(width / 2 - 1 - i, 0, length / 2);

            let windowBack = new CastleWindow(windowWidth, windowHeight);
            windowBack.rotate(Math.PI / 2, 1, 0, 0);
            windowBack.translate(width / 2 - 1 - i, 0, -length / 2);

            this.windows.push(windowFront, windowBack);
        }

        for (let i = 0; i < length - 1; i++) {
            let windowLeft = new CastleWindow(windowWidth, windowHeight);
            windowLeft.rotate(Math.PI / 2, 1, 0, 0);
            windowLeft.translate(width / 2, 0, length / 2 - 1 - i);
            windowLeft.rotate(Math.PI / 2, 0, 1, 0);

            let windowRight = new CastleWindow(windowWidth, windowHeight);
            windowRight.rotate(Math.PI / 2, 1, 0, 0);
            windowRight.translate(-width / 2, 0, length / 2 - 1 - i);
            windowRight.rotate(Math.PI / 2, 0, 1, 0);

            this.windows.push(windowLeft, windowRight);
        }
    }
}