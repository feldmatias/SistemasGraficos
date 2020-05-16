import {DrawableObject} from "../objects/DrawableObject.js";
import {SurfacesGenerator} from "../surfaces/SurfacesGenerator.js";
import { LinePath } from "../surfaces/paths/LinePath.js";
import { PlaneSurface } from "../surfaces/surfaces/PlaneSurface.js";
import { SphereSurface } from "../surfaces/surfaces/SphereSurface.js";
import { OpenCylinderSurface } from "../surfaces/surfaces/OpenCylinderSurface.js"
import { SquareShape } from "../surfaces/shapes/SquareShape.js";
import { CylinderRevolutionShape } from "../surfaces/shapes/CylinderRevolutionShape.js";

export class FiguraConSuperficie extends DrawableObject {

    constructor(gl) {
        super(gl);
        this.setVerticesData();
    }

    setVerticesData() {
        let forma = new SquareShape(1);
        let recorrido = new LinePath(true, 2);

        let data = new SurfacesGenerator().generateSweepSurface(forma, recorrido);
        this.setBuffers(data);
    }
}

export class FiguraConEsfera extends DrawableObject {

    constructor(gl) {
        super(gl);
        this.setVerticesData();
    }

    setVerticesData() {
        let forma = new SphereSurface(0.5);

        let data = new SurfacesGenerator().generateSurface(forma, 50, 50);
        this.setBuffers(data);
    }
}

export class FiguraConPlano extends DrawableObject {

    constructor(gl) {
        super(gl);
        this.setVerticesData();
    }

    setVerticesData() {
        let forma = new PlaneSurface(2, 2);

        let data = new SurfacesGenerator().generateSurface(forma, 50, 50);
        this.setBuffers(data);
    }
}

export class FiguraConCilindroAbierto extends DrawableObject {

    constructor(gl) {
        super(gl);
        this.setVerticesData();
    }

    setVerticesData() {
        let forma = new OpenCylinderSurface(0.5, 1);

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
        let forma = new CylinderRevolutionShape(0.5, 1);

        let data = new SurfacesGenerator().generateRevolutionSurface(forma);
        this.setBuffers(data);
    }
}
