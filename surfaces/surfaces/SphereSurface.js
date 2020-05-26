import {Surface} from './Surface.js'

export class SphereSurface extends Surface {

    constructor(radius) {
        super();
        this.radius = radius;
    }

    getPosition(u, v) {
        let theta = (1 - v) * Math.PI;
        let sinTheta = Math.sin(theta);
        let cosTheta = Math.cos(theta);

        let phi = u * 2 * Math.PI;
        let sinPhi = Math.sin(phi);
        let cosPhi = Math.cos(phi);

        let x = cosPhi * sinTheta * this.radius;
        let y = cosTheta * this.radius;
        let z = sinPhi * sinTheta * this.radius;

        return vec3.fromValues(x, y, z);
    }

}