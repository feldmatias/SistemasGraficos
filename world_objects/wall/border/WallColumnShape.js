import {RevolutionShape} from "../../../surfaces/shapes/RevolutionShape.js";
import {BSplineQuadraticCurves} from "../../../curves/BSplineQuadraticCurves.js";

export class WallColumnShape extends RevolutionShape {

    constructor(height, width) {
        super();
        this.height = height;
        this.width = width / 2;
        this.topHeight = 2;
        this.topWidth = 0.5;

        this.createCurveVertices();
    }

    getVertices() {
        return this.curvePoints.map(point => point.getPoint());
    }

    getNormals() {
        return this.curvePoints.map(point => point.getNormal());
    }

    isClosed() {
        return false;
    }

    createCurveVertices() {
        let curvesCalculator = new BSplineQuadraticCurves();
        let curveControlPoints = [
            vec3.fromValues(this.width, 0, 0),
            vec3.fromValues(this.width * 0.9, 0, 0),
            vec3.fromValues(this.width * 0.8, this.height * 0.5, 0),
            vec3.fromValues(this.width * 0.55, this.height * 0.9, 0),
            vec3.fromValues(this.width * 0.55, this.height + this.topHeight / 4, 0),
            vec3.fromValues(this.width * 0.65, this.height + this.topHeight / 2, 0),
            vec3.fromValues(this.width * 0.65, this.height + this.topHeight, 0),
            vec3.fromValues(this.width * 0.65 - this.topWidth * 0.4, this.height + this.topHeight, 0),
            vec3.fromValues(this.width * 0.65 - this.topWidth * 0.6, this.height + this.topHeight, 0),
            vec3.fromValues(this.width * 0.65 - this.topWidth, this.height + this.topHeight, 0),
            vec3.fromValues(this.width * 0.65 - this.topWidth, this.height + this.topHeight * 3 / 4, 0),
            vec3.fromValues(this.width * 0.55 - this.topWidth, this.height + this.topHeight * 3 / 4, 0),
            vec3.fromValues(-this.width * 0.7 + this.topWidth, this.height + this.topHeight * 3 / 4, 0),
        ];
        this.curvePoints = curvesCalculator.calculateForPoints(curveControlPoints);
    }
}