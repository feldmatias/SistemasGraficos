export class DrawableObject {

    constructor() {
        this.gl = webGL;
        this.modelMatrix = mat4.create()
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

    setIndicesBuffer(indices) {
        this.indicesBuffer = this.gl.createIndexBuffer(indices, 1);
    }

    getTexture() {
        return this.texture;
    }

    setColors(colors, width = 1, height = 1) {
        colors = colors.map(color => {
            if (color.length === 3) {
                color.push(255); // Append alpha=1 for all colors that don't have alpha
            }
            return color;
        });
        this.texture = this.gl.createColorTexture(colors, width, height);
    }

    setColor(color) {
        this.setColors([color], 1, 1);
        return this;
    }

    setImage(image) {
        this.texture = this.gl.createImageTexture(image);
        return this;
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
        this.gl.deleteTexture(this.texture);
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

    rotate(angle, x, y, z) {
        mat4.rotate(this.modelMatrix, this.modelMatrix, angle, vec3.fromValues(x, y, z));
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

}
