import {DrawableObject} from "../../objects/DrawableObject.js";
import {FrontWall} from "./front/FrontWall.js";
import {WallBorder} from "./border/WallBorder.js";

export class Wall extends DrawableObject {

    constructor(columnCount, height, width = 4) {
        super();
        this.columnCount = columnCount;
        this.height = height;
        this.width = width;
        this.radius = 16 - width / 2;
        this.angleStep = 360 / this.columnCount;

        this.createBorderWall();
        this.createFrontWall();
    }

    getChildren() {
        return [
            this.borderWall,
            this.frontWall,
        ].flat();
    }

    createBorderWall() {
        this.borderWall = new WallBorder(this.columnCount, this.height, this.width, this.radius);
    }

    createFrontWall() {
        let length = Math.sqrt(2 * this.radius * this.radius * (1 - Math.cos(this.angleStep * Math.PI / 180)));
        let translation = Math.sqrt(this.radius * this.radius - length * length / 4);
        this.frontWall = new FrontWall(this.height, this.width, length)
            .translate(-translation - 0.25, 0, 0);
    }
}
