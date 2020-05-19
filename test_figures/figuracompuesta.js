import { DrawableObject } from "../objects/DrawableObject.js";
import { Cylinder } from "../objects/Cylinder.js";
import { Sphere } from "../objects/Sphere.js";
import { Cube } from "../objects/Cube.js"
import { Plane } from "../objects/Plane.js";
import {Colors} from "../scene/Colors.js";

export class FiguraCompuesta extends DrawableObject {

    constructor(gl) {
        super(gl);
        this.initialize();
    }

    initialize() {
        this.cilindro = new Cylinder(this.gl, 0.5, 1);
        this.cilindro.translate(2, 0, 0);
        this.cilindro.rotate(Math.PI / 4, 1, 0, 0);
        this.cilindro.setColors([Colors.RED]);

        this.cubo = new Cube(this.gl, 1);
        this.cubo.rotate(Math.PI / 4, 0, 1, 0);
        this.cubo.setColors([Colors.GREEN]);

        this.plano = new Plane(this.gl, 2, 2);
        this.plano.translate(0, -1, 0);
        this.plano.setImage('img/eifel.jpg');

        this.esfera = new Sphere(this.gl, 0.5);
        this.esfera.translate(-1, -0.5, 0);
        this.esfera.setColors([Colors.YELLOW]);
    }

    getChildren() {
        return [
            this.cilindro,
            this.cubo,
            this.plano,
            this.esfera,
        ];
    }

}
