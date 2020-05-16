import { DrawableObject } from "../objects/DrawableObject.js";
import { FiguraConEsfera, FiguraConPlano, FiguraConRevoluciones, FiguraConSuperficie, FiguraConCilindroAbierto } from "./figuraConSuperficie.js";

export class FiguraCompuesta extends DrawableObject {

    constructor(gl) {
        super(gl);
        this.initialize();
    }

    initialize() {
        this.figura1 = new FiguraConRevoluciones(this.gl);
        this.figura1.translate(3, 0, 0)
        this.figura1.rotate(Math.PI / 4, 1, 0, 0)

        this.figura2 = new FiguraConSuperficie(this.gl);
        this.figura2.rotate(Math.PI / 4, 0, 1, 0)

        this.plano = new FiguraConPlano(this.gl);
        this.plano.translate(0, -1, 0);

        this.esfera = new FiguraConEsfera(this.gl);
        this.esfera.translate(-1, -0.5, 0);

        this.cilindroabierto = new FiguraConCilindroAbierto(this.gl);
        this.cilindroabierto.translate(1.5, -1, 0);
    }

    getChildren() {
        return [
            this.figura1,
            this.figura2,
            this.plano,
            this.esfera,
            this.cilindroabierto,
        ];
    }

}
