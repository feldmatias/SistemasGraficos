import {DrawableObject} from "./DrawableObject.js";
import {FiguraConPlano, FiguraConSuperficie} from "./figuraConSuperficie.js";

export class FiguraCompuesta extends DrawableObject {

    constructor(gl) {
        super(gl);
        this.initialize();
    }

    initialize() {
        this.figura1 = new FiguraConSuperficie(this.gl);
        this.figura1.rotate(Math.PI / 4, 0, 1, 0)
        this.plano = new FiguraConPlano(this.gl);
        this.plano.translate(0, -1, 0);
    }

    getChildren() {
        return [
            this.figura1,
            this.plano
        ];
    }

}
