import {Shape} from "../../../surfaces/shapes/Shape.js";
import {BezierCubicCurves} from "../../../curves/BezierCubicCurves.js";

export class CastleColumnShape extends Shape {

    constructor(height, topHeight = 2, width = 0.5) {
        super();
        this.height = height;
        this.topHeight = topHeight;
        this.width = width;

        this.topWidth = this.width * 1.2;
        this.curveHeight = 0.6;

        this.createCurveVertices();
    }

    getVertices() {
        let bottom = [
            vec3.fromValues(0, 0, 0),
            vec3.fromValues(this.width, 0, 0),
            vec3.fromValues(this.width, 0, 0),
        ];

        let top = [
            vec3.fromValues(this.topWidth, this.height, 0),
            vec3.fromValues(this.topWidth, this.height, 0),
            vec3.fromValues(0, this.height, 0),
        ];

        let curve = this.curvePoints.map(point => point.getPoint());

        return [
            bottom,
            curve,
            top
        ].flat();
    }

    getNormals() {
        let bottom = [
            vec3.fromValues(0, -1, 0),
            vec3.fromValues(0, -1, 0),
            vec3.fromValues(1, 0, 0),
        ];

        let top = [
            vec3.fromValues(1, 0, 0),
            vec3.fromValues(0, 1, 0),
            vec3.fromValues(0, 1, 0),
        ];

        let curve = this.curvePoints.map(point => point.getNormal());

        return [
            bottom,
            curve,
            top
        ].flat();
    }

    createCurveVertices() {
        let bezierCurvesCalculator = new BezierCubicCurves();
        let curveControlPoints = [
            vec3.fromValues(this.width, this.height - this.topHeight, 0),
            vec3.fromValues(this.width, this.height - this.topHeight + this.curveHeight / 2, 0),
            vec3.fromValues(this.topWidth, this.height - this.topHeight + this.curveHeight / 2, 0),
            vec3.fromValues(this.topWidth, this.height - this.topHeight + this.curveHeight, 0),
        ]
        this.curvePoints = bezierCurvesCalculator.calculateForPoints(curveControlPoints);
    }

}