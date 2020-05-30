import {CurvesCalculator} from "./CurvesCalculator.js";

export class BSplineQuadraticCurves extends CurvesCalculator {

    getBases() {
        let base0 = (u) => 0.5 * (1 - u) * (1 - u);
        let base1 = (u) => 0.5 + u * (1 - u);
        let base2 = (u) => 0.5 * u * u;

        return [base0, base1, base2];
    }

    getDerivativeBases() {
        let base0 = (u) => -1 + u;
        let base1 = (u) => 1 - 2 * u;
        let base2 = (u) => u;

        return [base0, base1, base2];
    }

    calculateForPoints(points) {
        let curvePoints = [];
        for (let i = 0; i < points.length - 2; i++) {
            let currentPoints = [points[i], points[i + 1], points[i + 2]];
            let currentCurvePoints = this._calculateForPoints(currentPoints);
            curvePoints.push(currentCurvePoints);
        }
        return curvePoints.flat();
    }
}
