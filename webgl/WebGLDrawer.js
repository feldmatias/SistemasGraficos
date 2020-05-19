export class WebGLDrawer {

    constructor(gl, shaderProgram) {
        this.gl = gl;
        this.shaderProgram = shaderProgram;
    }

    drawObject(drawableObject) {
        let positionBuffer = drawableObject.getPositionsBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, positionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

        let uvBuffer = drawableObject.getUvsBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, uvBuffer);
        this.gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, uvBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

        let normalBuffer = drawableObject.getNormalsBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalBuffer);
        this.gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, normalBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, drawableObject.getTexture());
        this.gl.uniform1i(this.shaderProgram.samplerUniform, 0);

        let indexBuffer = drawableObject.getIndicesBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        this.gl.drawElements(this.gl.TRIANGLE_STRIP, indexBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);
    }

    setModelMatrix(modelMatrix) {
        this.gl.uniformMatrix4fv(this.shaderProgram.mMatrixUniform, false, modelMatrix);

        let normalMatrix = mat3.create();
        mat3.normalFromMat4(normalMatrix, modelMatrix);
        this.gl.uniformMatrix3fv(this.shaderProgram.nMatrixUniform, false, normalMatrix);
    }

    setProjection(verticalFieldOfView, aspect, near, far) {
        let projectionMatrix = mat4.create();
        mat4.identity(projectionMatrix);
        mat4.perspective(projectionMatrix, verticalFieldOfView, aspect, near, far);
        mat4.scale(projectionMatrix, projectionMatrix, [1, -1, 1]); // flip Y, because of a glmatrix bug
        this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, projectionMatrix);
    }

    setView(cameraDistance, cameraHeight) {
        let viewMatrix = mat4.create();
        mat4.lookAt(viewMatrix,
            vec3.fromValues(0, cameraHeight, cameraDistance),
            vec3.fromValues(0, 0, 0),
            vec3.fromValues(0, 1, 0)
        );
        this.gl.uniformMatrix4fv(this.shaderProgram.vMatrixUniform, false, viewMatrix);
    }

    setLighting(lightPosition, ambientColor, directionalColor) {
        this.gl.uniform3f(this.shaderProgram.ambientColorUniform, ambientColor[0], ambientColor[1], ambientColor[2]);
        this.gl.uniform3f(this.shaderProgram.directionalColorUniform, directionalColor[0], directionalColor[1], directionalColor[2]);
        this.gl.uniform1i(this.shaderProgram.useLightingUniform, true);

        this.gl.uniform3fv(this.shaderProgram.lightingDirectionUniform, lightPosition);
    }
}
