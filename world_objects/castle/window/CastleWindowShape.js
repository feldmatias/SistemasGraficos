import {Shape} from "../../../surfaces/shapes/Shape.js";


export class CastleWindowShape extends Shape {

    constructor(width, height) {
        super();
        this.width = width / 2;
        this.height = height / 2;
    }

    getVertices() {
        let left = [
            vec3.fromValues(-this.width, -this.height, 0),
            vec3.fromValues(-this.width, 0, 0),
            vec3.fromValues(-this.width, this.height / 2, 0),
        ];

        let right = [
            vec3.fromValues(this.width, this.height / 2, 0),
            vec3.fromValues(this.width, 0, 0),
            vec3.fromValues(this.width, -this.height, 0),
            vec3.fromValues(0, -this.height, 0),
        ];

        let top = vec3.fromValues(0, this.height, 0);

        let leftTop = [];
        for (let i = 0.9; i > 0; i -= 0.1) {
            let v = vec3.fromValues(-this.width * i, this.height / 2 + this.height * 0.5 * (1 - i), 0);
            leftTop.push(v);
        }

        let rightTop = [];
        for (let i = 0.9; i > 0; i -= 0.1) {
            let v = vec3.fromValues(this.width * (1 - i), this.height / 2 + this.height * 0.5 * i, 0);
            rightTop.push(v);
        }

        return [
            left,
            leftTop,
            top,
            rightTop,
            right
        ].flat()
    }

    isClosed() {
        return true;
    }

}