import {DrawableObject} from "../../../objects/DrawableObject.js";
import {WallShape} from "./WallShape.js";
import {CirclePath} from "../../../surfaces/paths/CirclePath.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {WallColumn} from "./WallColumn.js";
import {Materials, WALL_MATERIAL} from "../../../materials/MaterialsFactory.js";

export class WallBorder extends DrawableObject {

    constructor(columnCount, height, width, radius) {
        super();
        this.columnCount = columnCount;
        this.height = height;
        this.width = width;
        this.radius = radius;
        this.angleStep = 360 / this.columnCount;

        this.initialize();
        this.createColumns();
        this.rotateToFront();
    }

    getChildren() {
        return this.columns;
    }

    getUvsScale() {
        return [this.height >= 5 ? 2 : 1, 4];
    }

    invertUvs() {
        return true;
    }

    initialize() {
        let shape = new WallShape(this.height, this.width);
        let path = new CirclePath(this.radius, 360 - this.angleStep, this.angleStep);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path);

        this.setBuffers(data)
            .setMaterial(Materials.getMaterial(WALL_MATERIAL));
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

    rotateToFront() {
        let angles = {
            4: 45,
            5: 55,
            6: 60,
            7: 65,
            8: 68,
        }
        let angle = angles[this.columnCount] * Math.PI / 180;
        this.rotateY(-angle);
    }

}