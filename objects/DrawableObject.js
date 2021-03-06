export class DrawableObject {

    constructor() {
        this.gl = webGL;
        this.modelMatrix = mat4.create();
        this.worldModelMatrix = mat4.create();
        this.isShowing = true;
        this.buffers = new DrawableObjectBuffers();
    }

    getChildren() {
        return [];
    }

    getAnimations() {
        return [];
    }

    draw(parentModelMatrix = undefined) {
        if (!parentModelMatrix) {
            parentModelMatrix = mat4.create();
        }

        this.getAnimations().forEach(animation => animation.animate());

        this.worldModelMatrix = mat4.create();
        mat4.multiply(this.worldModelMatrix, parentModelMatrix, this.modelMatrix);


        if (this.isShowing) {
            if (this.buffers.hasBuffers()) {
                let drawer = this.gl.getDrawer();
                drawer.setModelMatrix(this.worldModelMatrix);
                drawer.drawObject(this);
            }

            this.getChildren().forEach(child => child.draw(this.worldModelMatrix));
        }
    }

    setMaterial(material) {
        this.material = material;
        return this;
    }

    getUvsScale() {
        return [1, 1];
    }

    invertUvs() {
        return false;
    }

    setBuffers(data) {
        let [xScale, yScale] = this.getUvsScale();
        let invert = this.invertUvs();
        for (let i = 0; i < data.uvBuffer.length; i += 2) {
            let x = data.uvBuffer[i] * xScale;
            let y = data.uvBuffer[i + 1] * yScale;
            data.uvBuffer[i] = invert ? y : x;
            data.uvBuffer[i + 1] = invert ? x : y;
        }

        this.buffers.setBuffers(data);
        return this;
    }

    delete() {
        this.buffers.delete();
        this.getChildren().forEach(child => child.delete());
    }

    clone() {
        // Clone object so it reuses buffers
        let cloned = Object.create(
            Object.getPrototypeOf(this),
            Object.getOwnPropertyDescriptors(this)
        );

        Object.keys(cloned).forEach(key => {
            // Clone children
            if (this[key] instanceof DrawableObject) {
                cloned[key] = this[key].clone();
            }
        })
        cloned.modelMatrix = mat4.clone(this.modelMatrix);
        return cloned;
    }

    setModelMatrix(modelMatrix) {
        this.modelMatrix = modelMatrix;
        return this;
    }

    translate(x, y, z) {
        mat4.translate(this.modelMatrix, this.modelMatrix, vec3.fromValues(x, y, z));
        return this;
    }

    scale(scale) {
        mat4.scale(this.modelMatrix, this.modelMatrix, vec3.fromValues(scale, scale, scale));
        return this;
    }

    scaleY(scale) {
        mat4.scale(this.modelMatrix, this.modelMatrix, vec3.fromValues(1, scale, 1));
        return this;
    }

    rotateX(angle) {
        mat4.rotate(this.modelMatrix, this.modelMatrix, angle, vec3.fromValues(1, 0, 0));
        return this;
    }

    rotateY(angle) {
        mat4.rotate(this.modelMatrix, this.modelMatrix, angle, vec3.fromValues(0, 1, 0));
        return this;
    }

    rotateZ(angle) {
        mat4.rotate(this.modelMatrix, this.modelMatrix, angle, vec3.fromValues(0, 0, 1));
        return this;
    }

    show() {
        this.isShowing = true;
    }

    hide() {
        this.isShowing = false;
    }

    getPosition() {
        let position = vec3.create();
        mat4.getTranslation(position, this.worldModelMatrix);
        return position;
    }

    getScale() {
        let scale = vec3.create();
        mat4.getScaling(scale, this.worldModelMatrix);
        return scale;
    }

}

class DrawableObjectBuffers {

    constructor() {
        this.gl = webGL;
    }

    hasBuffers() {
        return this.positionsBuffer !== undefined;
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

    setIndicesBuffer(indices) {
        this.indicesBuffer = this.gl.createIndexBuffer(indices, 1);
    }

    getTangentsBuffer() {
        return this.tangentsBuffer;
    }

    setTangentsBuffer(tangentsBuffer) {
        this.tangentsBuffer = this.gl.createBuffer(tangentsBuffer, 3);
    }

    getBinormalsBuffer() {
        return this.binormalsBuffer;
    }

    setBinormalsBuffer(binormalsBuffer) {
        this.binormalsBuffer = this.gl.createBuffer(binormalsBuffer, 3);
    }

    setBuffers(data) {
        this.setPositionsBuffer(data.positionBuffer);
        this.setNormalsBuffer(data.normalBuffer);
        this.setTangentsBuffer(data.tangentBuffer);
        this.setBinormalsBuffer(data.binormalBuffer);
        this.setUvsBuffer(data.uvBuffer);
        this.setIndicesBuffer(data.indexBuffer);
    }

    delete() {
        this.gl.deleteBuffer(this.positionsBuffer);
        this.gl.deleteBuffer(this.normalsBuffer);
        this.gl.deleteBuffer(this.tangentsBuffer);
        this.gl.deleteBuffer(this.binormalsBuffer);
        this.gl.deleteBuffer(this.uvsBuffer);
        this.gl.deleteBuffer(this.indicesBuffer);
    }

}
