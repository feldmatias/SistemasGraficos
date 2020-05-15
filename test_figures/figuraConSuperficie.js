import {DrawableObject} from "../objects/DrawableObject.js";
import {Forma} from "./figuras.js";
import {Recorrido} from "./figuras.js";
import {SurfacesGenerator} from "../surfaces/SurfacesGenerator.js";
import {Plano} from "./figuras.js";
import {CilindroRevolutionShape} from "./figuras.js";

export class FiguraConSuperficie extends DrawableObject {

    constructor(gl) {
        super(gl);
        this.setVerticesData();
    }

    setVerticesData() {
        let forma = new Forma();
        let recorrido = new Recorrido();

        let data = new SurfacesGenerator().generateSweepSurface(forma, recorrido);
        this.setBuffers(data);
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
        this.setBuffers(data);
    }
}

export class FiguraConRevoluciones extends DrawableObject {

    constructor(gl) {
        super(gl);
        this.setVerticesData();
    }

    setVerticesData() {
        let forma = new CilindroRevolutionShape();

        let data = new SurfacesGenerator().generateRevolutionSurface(forma);
        this.setBuffers(data);
    }
}
