export class DrawableObject {

    constructor(gl) {
        this.gl = gl;
        this.modelMatrix = mat4.create()
    }

    getChildren() {
        return [];
    }

    draw(parentModelMatrix = undefined) {
        if (!parentModelMatrix) {
            parentModelMatrix = mat4.create();
        }

        let modelMatrix = mat4.create();
        mat4.multiply(modelMatrix, parentModelMatrix, this.modelMatrix);

        if (this.positionsBuffer) {
            let drawer = this.gl.getDrawer();
            drawer.setModelMatrix(modelMatrix);
            drawer.drawObject(this);
        }

        this.getChildren().forEach(child => child.draw(modelMatrix));
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

    setBuffers(data) {
        this.setPositionsBuffer(data.positionBuffer);
        this.setNormalsBuffer(data.normalBuffer);
        this.setUvsBuffer(data.uvBuffer);
        this.setIndicesBufer(data.indexBuffer);
    }

    rotate(angle, x, y, z) {
        mat4.rotate(this.modelMatrix, this.modelMatrix, angle, vec3.fromValues(x, y, z));
        return this;
    }

    translate(x, y, z) {
        mat4.translate(this.modelMatrix, this.modelMatrix, vec3.fromValues(x, y, z));
        return this;
    }

}
