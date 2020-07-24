import {DrawableObject} from "../../../objects/DrawableObject.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {CastleColumnShape} from "./CastleColumnShape.js";
import {CastleColumnRoof} from "./CastleColumnRoof.js";
import {CASTLE_COLUMN_MATERIAL, Materials} from "../../../materials/MaterialsFactory.js";

export class CastleColumn extends DrawableObject {

    constructor(height, topHeight, floorsCount) {
        super();

        this.height = height;
        this.topHeight = topHeight;
        this.floorsCount = floorsCount;
        this.width = 0.4;
        this.topWidth = this.width * 1.8;

        this.initialize();
        this.createRoof();
    }

    getChildren() {
        return [
            this.roof
        ];
    }

    initialize() {
        let shape = new CastleColumnShape(this.height, this.topHeight, this.width, this.topWidth);

        let data = new SurfacesGenerator().generateRevolutionSurface(shape);

        this.setBuffers(data)
            .setMaterial(Materials.getMaterial(CASTLE_COLUMN_MATERIAL));
    }

    getUvsScale() {
        return [this.floorsCount, 1];
    }

    invertUvs() {
        return true;
    }

    createRoof() {
        this.roof = new CastleColumnRoof(this.topHeight, this.topWidth + 0.15)
            .translate(0, this.height, 0);
    }

}