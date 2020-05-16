import { Surface } from './Surface.js'

export class PlaneSurface extends Surface {

    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    getPosition(u, v) {
        let x = (u - 0.5) * this.width;
        let z = (v - 0.5) * this.height;
        return vec3.fromValues(x, 0, z);
    }

    getNormal(u, v) {
        return vec3.fromValues(0, 1, 0);
    }

}