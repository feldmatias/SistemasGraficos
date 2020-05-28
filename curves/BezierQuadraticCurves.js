import {CurvesCalculator} from "./CurvesCalculator.js";

export class BezierQuadraticCurves extends CurvesCalculator {

    getBases() {
        let base0 = (u) => (1 - u) * (1 - u);
        let base1 = (u) => 2 * u * (1 - u);
        let base2 = (u) => u * u;

        return [base0, base1, base2];
    }

    getDerivativeBases() {
        let base0 = (u) => -2 + 2 * u;
        let base1 = (u) => 2 - 4 * u;
        let base2 = (u) => 2 * u;

        return [base0, base1, base2];
    }

    calculateForPoints(points) {
        let result = [];
        for (let i = 0; i < points.length; i += 3) {
            let current_points = [points[i], points[i + 1], points[i + 2]];
            let current_curve_points = this._calculateForPoints(current_points);
            result.push(current_curve_points);
        }
        return result.flat();
    }
}
