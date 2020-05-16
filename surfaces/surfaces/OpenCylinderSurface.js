import { Surface } from './Surface.js'

export class OpenCylinderSurface extends Surface {

    constructor(radius, height) {
        super();
        this.radius = radius;
        this.height = height;
    }

    getPosition(u, v) {
        let angle = (u - 0.5) * 2 * Math.PI;

        let x = this.radius * Math.cos(angle);
        let y = (v - 0.5) * this.height * 0.5;
        let z = this.radius * Math.sin(angle);

        return vec3.fromValues(x, y, z);
    }

    getNormal(u, v) {
        let position = this.getPosition(u, v);
        return [position[0], 0, position[2]];
    }

}