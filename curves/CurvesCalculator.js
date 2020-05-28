import {CurvePoint} from "./CurvePoint.js";

export class CurvesCalculator {

    constructor(step = 0.1) {
        this.step = step;
    }

    getBases() {
        return [];
    }

    getDerivativeBases() {
        return [];
    }

    calculateForPoints(points) {
        return [];
    }

    _calculateForPoints(points) {
        let bases = this.getBases();
        let derivativeBases = this.getDerivativeBases();
        let curve_points = [];

        for (let i = 0; i <= 1; i += this.step) {
            let point = this._applyBases(points, bases, i);
            let tangent = this._applyBases(points, derivativeBases, i);
            curve_points.push(new CurvePoint(point, tangent));
        }

        return curve_points;
    }

    _applyBases(points, bases, u) {
        let x = 0;
        let y = 0;
        let z = 0;
        for (let i = 0; i < bases.length; i++) {
            let base = bases[i](u);
            x += base * points[i][0];
            y += base * points[i][1];
            z += base * points[i][2];
        }
        return vec3.fromValues(x, y, z);
    }

}