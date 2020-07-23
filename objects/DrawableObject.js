export class DrawableObject {

    constructor() {
        this.gl = webGL;
        this.modelMatrix = mat4.create();
        this.worldModelMatrix = mat4.create();
        this.isShowing = true;
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
            if (this.positionsBuffer) {
                let drawer = this.gl.getDrawer();
                drawer.setModelMatrix(this.worldModelMatrix);
                drawer.drawObject(this);
            }

            this.getChildren().forEach(child => child.draw(this.worldModelMatrix));
        }
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

    setMaterial(material) {
        this.material = material;
        return this;
    }

    getTexture() {
        return this.material.getTexture();
    }

    setBuffers(data) {
        this.setPositionsBuffer(data.positionBuffer);
        this.setNormalsBuffer(data.normalBuffer);
        this.setUvsBuffer(data.uvBuffer);
        this.setIndicesBuffer(data.indexBuffer);
        return this;
    }

    delete() {
        this.gl.deleteBuffer(this.positionsBuffer);
        this.gl.deleteBuffer(this.normalsBuffer);
        this.gl.deleteBuffer(this.uvsBuffer);
        this.gl.deleteBuffer(this.indicesBuffer);
        this.getChildren().forEach(child => child.delete());
    }

    clone() {
        // Clone object so it reuses buffers
        let cloned = Object.create(
            Object.getPrototypeOf(this),
            Object.getOwnPropertyDescriptors(this)
        );
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
