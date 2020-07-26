import {Shape} from './Shape.js'

export class CircleShape extends Shape {

    constructor(radius = 1, angle = 360, startAngle = 0, step = 5) {
        super();
        this.radius = radius;
        this.angle = angle;
        this.startAngle = startAngle;
        this.step = step;
    }

    getVertices() {
        let vertices = [];
        for (let i = this.startAngle; i < this.angle; i += this.step) {
            let angle = i * Math.PI / 180;
            let x = this.radius * Math.cos(angle);
            let y = this.radius * Math.sin(angle);
            vertices.push(vec3.fromValues(x, y, 0));
        }
        return vertices;
    }

    isClosed() {
        return this.angle === 360;
    }
}
