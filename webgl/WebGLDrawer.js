export class WebGLDrawer {

    constructor(gl, shaderProgram) {
        this.gl = gl;
        this.shaderProgram = shaderProgram;
    }

    drawObject(drawableObject) {
        let positionBuffer = drawableObject.buffers.getPositionsBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, positionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

        let uvBuffer = drawableObject.buffers.getUvsBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, uvBuffer);
        this.gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, uvBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

        let normalBuffer = drawableObject.buffers.getNormalsBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalBuffer);
        this.gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, normalBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, drawableObject.getTexture());
        this.gl.uniform1i(this.shaderProgram.samplerTextureUniform, 0);

        let indexBuffer = drawableObject.buffers.getIndicesBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        this.gl.drawElements(this.gl.TRIANGLE_STRIP, indexBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);
    }

    setModelMatrix(modelMatrix) {
        this.gl.uniformMatrix4fv(this.shaderProgram.modelMatrixUniform, false, modelMatrix);

        let normalMatrix = mat3.create();
        mat3.normalFromMat4(normalMatrix, modelMatrix);
        this.gl.uniformMatrix3fv(this.shaderProgram.normalMatrixUniform, false, normalMatrix);
    }

    setProjection(verticalFieldOfView, aspect, near, far) {
        let projectionMatrix = mat4.create();
        mat4.identity(projectionMatrix);
        mat4.perspective(projectionMatrix, verticalFieldOfView, aspect, near, far);
        mat4.scale(projectionMatrix, projectionMatrix, [1, -1, 1]); // flip Y, because of a glmatrix bug
        this.gl.uniformMatrix4fv(this.shaderProgram.projectionMatrixUniform, false, projectionMatrix);
    }

    setView(cameraOrigin, cameraDestination) {
        let viewMatrix = mat4.create();
        mat4.lookAt(viewMatrix,
            cameraOrigin,
            cameraDestination,
            vec3.fromValues(0, 1, 0)
        );
        this.gl.uniformMatrix4fv(this.shaderProgram.viewMatrixUniform, false, viewMatrix);
    }

    setLighting(lightPosition, lightColor) {
        this.gl.uniform3fv(this.shaderProgram.lightPositionUniform, lightPosition);
        this.gl.uniform3fv(this.shaderProgram.lightColorUniform, lightColor.map(x => x / 255));
    }
}
