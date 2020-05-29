import {Shape} from "../../../surfaces/shapes/Shape.js";
import {BezierCubicCurves} from "../../../curves/BezierCubicCurves.js";

export class CastleColumnRoofShape extends Shape {

    constructor(height, width) {
        super();
        this.height = height;
        this.width = width;

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
        let bezierCurvesCalculator = new BezierCubicCurves();
        let curveControlPoints = [
            vec3.fromValues(this.width, 0, 0),
            vec3.fromValues(this.width * 0.2, this.height * 0.5, 0),
            vec3.fromValues(0.03, this.height * 0.8, 0),
            vec3.fromValues(0.03, this.height, 0),
        ]
        this.curvePoints = bezierCurvesCalculator.calculateForPoints(curveControlPoints);
    }

}