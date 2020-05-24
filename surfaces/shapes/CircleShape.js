import {Shape} from './Shape.js'

export class CircleShape extends Shape {

    constructor(radius = 1, angle = 360, step = 5) {
        super();
        this.radius = radius;
        this.angle = angle;
        this.step = step;
    }

    getVertices() {
        let vertices = [];
        for (let i = 0; i < this.angle; i += this.step) {
            let angle = i * Math.PI / 180;
            let x = this.radius * Math.cos(angle);
            let y = this.radius * Math.sin(angle);
            vertices.push(vec3.fromValues(x, y, 0));
        }
        return vertices;
    }

    isClosed() {
        return true;
    }
}
