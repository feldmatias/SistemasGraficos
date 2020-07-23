import {DrawableObject} from "../../../objects/DrawableObject.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {WallColumnShape} from "./WallColumnShape.js";
import {Materials, WALL_MATERIAL} from "../../../materials/MaterialsFactory.js";

export class WallColumn extends DrawableObject {

    constructor(height, width) {
        super();
        this.height = height;
        this.width = width;

        this.initialize();
    }

    initialize() {
        let shape = new WallColumnShape(this.height, this.width);

        let data = new SurfacesGenerator().generateRevolutionSurface(shape, 10);

        this.setBuffers(data)
            .setMaterial(Materials.getMaterial(WALL_MATERIAL));
    }

}