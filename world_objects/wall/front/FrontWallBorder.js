import {DrawableObject} from "../../../objects/DrawableObject.js";
import {WallShape} from "../border/WallShape.js";
import {LinePath} from "../../../surfaces/paths/LinePath.js";
import {SurfacesGenerator} from "../../../surfaces/SurfacesGenerator.js";
import {Materials, WALL_MATERIAL} from "../../../materials/MaterialsFactory.js";
import {Torch} from "../../torches/Torch.js";

export class FrontWallBorder extends DrawableObject {

    constructor(height, width, length) {
        super();
        this.height = height;
        this.width = width * 0.9;
        this.length = length;

        this.initialize();
        this.rotateY(Math.PI / 2);

        this.createTorch();
    }

    getChildren() {
        return [
            this.torch,
        ];
    }

    initialize() {
        let shape = new WallShape(this.height, this.width);
        let path = new LinePath(this.length);

        let data = new SurfacesGenerator().generateSweepSurface(shape, path, true);

        this.setBuffers(data)
            .setMaterial(Materials.getMaterial(WALL_MATERIAL));
    }

    getUvsScale() {
        return [this.height >= 5 ? 2 : 1, 1];
    }

    invertUvs() {
        return true;
    }

    createTorch() {
        this.torch = new Torch()
            .translate(this.width / 4, this.height / 2, 0)
            .rotateZ(-Math.PI / 4);
    }

}