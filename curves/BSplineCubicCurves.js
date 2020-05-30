import {CurvesCalculator} from "./CurvesCalculator.js";

export class BSplineCubicCurves extends CurvesCalculator {

    getBases() {
        let base0 = (u) => (1 - 3 * u + 3 * u * u - u * u * u) / 6;
        let base1 = (u) => (4 - 6 * u * u + 3 * u * u * u) / 6;
        let base2 = (u) => (1 + 3 * u + 3 * u * u - 3 * u * u * u) / 6;
        let base3 = (u) => (u * u * u) / 6;

        return [base0, base1, base2, base3];
    }

    getDerivativeBases() {
        let base0 = (u) => (-3 + 6 * u - 3 * u * u) / 6;
        let base1 = (u) => (-12 * u + 9 * u * u) / 6;
        let base2 = (u) => (3 + 6 * u - 9 * u * u) / 6;
        let base3 = (u) => (3 * u * u) / 6;

        return [base0, base1, base2, base3];
    }

    calculateForPoints(points) {
        let curvePoints = [];
        for (let i = 0; i < points.length - 3; i++) {
            let currentPoints = [points[i], points[i + 1], points[i + 2], points[i + 3]];
            let currentCurvePoints = this._calculateForPoints(currentPoints);
            curvePoints.push(currentCurvePoints);
        }
        return curvePoints.flat();
    }
}
