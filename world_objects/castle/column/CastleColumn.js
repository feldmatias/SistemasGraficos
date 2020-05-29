import {DrawableObject} from "../../../objects/DrawableObject.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {Colors} from "../../../scene/Colors.js";
import {CastleColumnShape} from "./CastleColumnShape.js";
import {CastleColumnRoof} from "./CastleColumnRoof.js";

export class CastleColumn extends DrawableObject {

    constructor(height, topHeight) {
        super();

        this.height = height;
        this.topHeight = topHeight;
        this.width = 0.4;

        this.initialize();
        this.createRoof();
    }

    getChildren() {
        return [
            this.roof
        ];
    }

    initialize() {
        let shape = new CastleColumnShape(this.height, this.topHeight, this.width);

        let data = new SurfacesGenerator().generateRevolutionSurface(shape);

        this.setBuffers(data)
            .setColor(Colors.CASTLE_YELLOW);
    }

    createRoof() {
        this.roof = new CastleColumnRoof(this.topHeight, this.width * 1.2 + 0.1)
            .translate(0, this.height, 0);
    }

}