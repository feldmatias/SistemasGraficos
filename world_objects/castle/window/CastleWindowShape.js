import {Shape} from "../../../surfaces/shapes/Shape.js";
import {BezierQuadraticCurves} from "../../../curves/BezierQuadraticCurves.js";


export class CastleWindowShape extends Shape {

    constructor(width, height) {
        super();
        this.width = width / 2 * 0.8;
        this.height = height / 2;
        this.curveStart = this.height / 3;
        this.createCurveVertices();
    }

    getVertices() {
        let left = [
            vec3.fromValues(-this.width, -this.height, 0),
            vec3.fromValues(-this.width, 0, 0),
            vec3.fromValues(-this.width, this.curveStart, 0),
        ];

        let right = [
            vec3.fromValues(this.width, this.curveStart, 0),
            vec3.fromValues(this.width, 0, 0),
            vec3.fromValues(this.width, -this.height, 0),
        ];

        let bottom = [
            vec3.fromValues(this.width, -this.height, 0),
            vec3.fromValues(0, -this.height, 0),
            vec3.fromValues(-this.width, -this.height, 0),
        ];

        let curve = this.curvePoints.map(point => point.getPoint());

        return [
            left,
            curve,
            right,
            bottom,
        ].flat();
    }

    getNormals() {
        let left = [
            vec3.fromValues(-1, 0, 0),
            vec3.fromValues(-1, 0, 0),
            vec3.fromValues(-1, 0, 0),
        ];

        let right = [
            vec3.fromValues(1, 0, 0),
            vec3.fromValues(1, 0, 0),
            vec3.fromValues(1, 0, 0),
        ];

        let bottom = [
            vec3.fromValues(0, -1, 0),
            vec3.fromValues(0, -1, 0),
            vec3.fromValues(0, -1, 0),
        ];

        let curve = this.curvePoints.map(point => point.getNormal());

        return [
            left,
            curve,
            right,
            bottom,
        ].flat();
    }

    isClosed() {
        return true;
    }

    createCurveVertices() {
        let bezierCurvesCalculator = new BezierQuadraticCurves();
        let curveControlPoints = [
            vec3.fromValues(-this.width, this.curveStart, 0),
            vec3.fromValues(0, this.height, 0),
            vec3.fromValues(this.width, this.curveStart, 0),
        ]
        this.curvePoints = bezierCurvesCalculator.calculateForPoints(curveControlPoints);
    }
}