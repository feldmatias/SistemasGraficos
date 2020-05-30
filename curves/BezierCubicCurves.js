import {CurvesCalculator} from "./CurvesCalculator.js";

export class BezierCubicCurves extends CurvesCalculator {

    getBases() {
        let base0 = (u) => (1 - u) * (1 - u) * (1 - u);
        let base1 = (u) => 3 * (1 - u) * (1 - u) * u;
        let base2 = (u) => 3 * (1 - u) * u * u;
        let base3 = (u) => u * u * u;

        return [base0, base1, base2, base3];
    }

    getDerivativeBases() {
        let base0 = (u) => -3 * u * u + 6 * u - 3;
        let base1 = (u) => 9 * u * u - 12 * u + 3;
        let base2 = (u) => -9 * u * u + 6 * u;
        let base3 = (u) => 3 * u * u;

        return [base0, base1, base2, base3];
    }

    calculateForPoints(points) {
        let curvePoints = [];
        for (let i = 0; i < points.length; i += 4) {
            let currentPoints = [points[i], points[i + 1], points[i + 2], points[i + 3]];
            let currentCurvePoints = this._calculateForPoints(currentPoints);
            curvePoints.push(currentCurvePoints);
        }
        return curvePoints.flat();
    }
}
