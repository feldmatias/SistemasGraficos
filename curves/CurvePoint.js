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
        let result = vec3.fromValues(-this.tangent[1], this.tangent[0]);
        vec3.subtract(result, result, this.point);
        return result;
    }

}