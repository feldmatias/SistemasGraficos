import {DrawableObject} from "../../objects/DrawableObject.js";
import {SurfacesGenerator} from "../../surfaces/SurfacesGenerator.js";
import {WallShape} from "./WallShape.js";
import {CirclePath} from "../../surfaces/paths/CirclePath.js";
import {Colors} from "../../scene/Colors.js";
import {WallColumn} from "./WallColumn.js";

export class Wall extends DrawableObject {

    constructor(columnCount, height, width = 4) {
        super();
        this.columnCount = columnCount;
        this.height = height;
        this.width = width;
        this.radius = 12 - width / 2;
        this.angleStep = 360 / this.columnCount;

        this.initialize();
        this.createColumns();
        this.rotateToFront();
    }

    getChildren() {
        return this.columns;
    }

    initialize() {
        let shape = new WallShape(this.height, this.width);
        let path = new CirclePath(this.radius, 360 - this.angleStep, this.angleStep);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path);

        this.setBuffers(data)
            .setColor(Colors.WALL_GREY);
    }

    rotateToFront() {
        let angles = {
            4: 45,
            5: 55,
            6: 60,
            7: 65,
            8: 68,
        }
        let angle = angles[this.columnCount] * Math.PI / 180;
        this.rotate(-angle, 0, 1, 0);
    }

    createColumns() {
        this.columns = [];
        let baseColumn = new WallColumn(this.height, this.width * 1.2);

        for (let i = 0; i < this.columnCount; i++) {
            let angle = this.angleStep * i * Math.PI / 180;
            let x = Math.cos(angle) * this.radius;
            let z = Math.sin(angle) * this.radius;
            let column = baseColumn.clone()
                .translate(x, 0, z);
            this.columns.push(column);
        }
    }
}
