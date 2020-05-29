export class CurvePoint {

    constructor(point, tangent) {
        this.point = point;
        this.tangent = tangent;
    }

    getPoint() {
        return this.point;
    }

    getTangent() {
        let result = vec3.create();
        vec3.subtract(result, this.tangent, this.point);
        return result;
    }

    getNormal() {
        let result = vec3.fromValues(this.tangent[0], this.tangent[1], 0);
        vec3.cross(result, result, vec3.fromValues(0, 0, 1));
        return result;
    }

}