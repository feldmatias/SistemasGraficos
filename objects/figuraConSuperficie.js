import {DrawableObject} from "./DrawableObject.js";
import {Forma} from "../surfaces/figuras.js";
import {Recorrido} from "../surfaces/figuras.js";
import {SurfacesGenerator} from "../surfaces/SurfacesGenerator.js";
import {Plano} from "../surfaces/figuras.js";

export class FiguraConSuperficie extends DrawableObject {

    constructor(gl) {
        super(gl);
        this.setVerticesData();
    }

    setVerticesData() {
        let forma = new Forma();
        let recorrido = new Recorrido();

        let data = new SurfacesGenerator().generateSweepSurface(forma, recorrido);
        this.setPositionsBuffer(data.positionBuffer);
        this.setNormalsBuffer(data.normalBuffer);
        this.setUvsBuffer(data.uvBuffer);
        this.setIndicesBufer(data.indexBuffer);
    }
}

export class FiguraConPlano extends DrawableObject {

    constructor(gl) {
        super(gl);
        this.setVerticesData();
    }

    setVerticesData() {
        let forma = new Plano(3, 3);

        let data = new SurfacesGenerator().generateSurface(forma, 50, 50);
        this.setPositionsBuffer(data.positionBuffer);
        this.setNormalsBuffer(data.normalBuffer);
        this.setUvsBuffer(data.uvBuffer);
        this.setIndicesBufer(data.indexBuffer);
    }
}
