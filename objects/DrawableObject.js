export class DrawableObject {

    constructor(gl) {
        this.gl = gl;
    }

    getChildren() {
        return [];
    }

    draw() {
        if (this.positionsBuffer) {
            this.gl.drawObject(this)
        }
        this.getChildren().forEach(child => child.draw());
    }

    getPositionsBuffer() {
        return this.positionsBuffer;
    }

    setPositionsBuffer(positionsBuffer) {
        this.positionsBuffer = this.gl.createBuffer(positionsBuffer, 3);
    }

    getNormalsBuffer() {
        return this.normalsBuffer;
    }

    setNormalsBuffer(normalsBuffer) {
        this.normalsBuffer = this.gl.createBuffer(normalsBuffer, 3);
    }

    getUvsBuffer() {
        return this.uvsBuffer;
    }

    setUvsBuffer(uvsBuffer) {
        this.uvsBuffer = this.gl.createBuffer(uvsBuffer, 2);
    }

    getIndicesBuffer() {
        return this.indicesBuffer;
    }

    setIndicesBufer(indices) {
        this.indicesBuffer = this.gl.createIndexBuffer(indices, 1);
    }

}
