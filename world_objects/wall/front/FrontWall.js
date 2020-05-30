import {DrawableObject} from "../../../objects/DrawableObject.js";
import {WallEntrance} from "./WallEntrance.js";
import {FrontWallBorder} from "./FrontWallBorder.js";

export class FrontWall extends DrawableObject {

    constructor(height, width, length) {
        super();
        this.height = height;
        this.width = width * 0.9;
        this.length = Math.round(length);
        this.entranceLength = 5;

        this.createBorders();
        this.createEntrance();
    }

    getChildren() {
        return [
            this.borders,
            this.entrance,
        ].flat();
    }

    createBorders() {
        let border = new FrontWallBorder(this.height, this.width, (this.length - this.entranceLength) / 2);

        let leftBorder = border.clone()
            .translate(0, 0, (border.length + this.entranceLength) / 2);

        let rightBorder = border.clone()
            .translate(0, 0, -(border.length + this.entranceLength) / 2);

        this.borders = [leftBorder, rightBorder];
    }

    createEntrance() {
        this.entrance = new WallEntrance(this.width * 0.5, this.entranceLength, this.height + 0.3);
    }
}