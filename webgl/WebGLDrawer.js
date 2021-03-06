export class WebGLDrawer {

    constructor(gl, shaderProgram) {
        this.gl = gl;
        this.shaderProgram = shaderProgram;
        this.useNormalMapping = true;
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

        let tangentBuffer = drawableObject.buffers.getTangentsBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, tangentBuffer);
        this.gl.vertexAttribPointer(this.shaderProgram.vertexTangentAttribute, tangentBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

        let binormalBuffer = drawableObject.buffers.getBinormalsBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, binormalBuffer);
        this.gl.vertexAttribPointer(this.shaderProgram.vertexBinormalAttribute, binormalBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, drawableObject.material.getTexture());
        this.gl.uniform1i(this.shaderProgram.samplerTextureUniform, 0);

        this.gl.uniform1i(this.shaderProgram.hasNormalMappingUniform, this.useNormalMapping && drawableObject.material.getNormalsTexture() !== undefined);
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, drawableObject.material.getNormalsTexture());
        this.gl.uniform1i(this.shaderProgram.samplerNormalsTextureUniform, 1);

        this.gl.uniform1i(this.shaderProgram.hasReflectionUniform, drawableObject.material.getReflectionTexture() !== undefined);
        this.gl.activeTexture(this.gl.TEXTURE2);
        this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, drawableObject.material.getReflectionTexture());
        this.gl.uniform1i(this.shaderProgram.samplerReflectionTextureUniform, 2);

        let indexBuffer = drawableObject.buffers.getIndicesBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        this.gl.uniform1f(this.shaderProgram.specularIntensityUniform, drawableObject.material.getSpecularIntensity());
        this.gl.uniform1f(this.shaderProgram.specularShininessUniform, drawableObject.material.getSpecularShininess());
        this.gl.uniform1i(this.shaderProgram.ignoreLightingUniform, drawableObject.material.ignoreLighting());

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
        this.gl.uniform3fv(this.shaderProgram.cameraPositionUniform, cameraOrigin);
    }

    setLighting(lightPosition, lightColor) {
        this.gl.uniform3fv(this.shaderProgram.lightPositionUniform, lightPosition);
        this.gl.uniform3fv(this.shaderProgram.lightColorUniform, lightColor.map(x => x / 255));
    }

    setPointLights(pointLightsPositions, pointLightsColor) {
        this.gl.uniform3fv(this.shaderProgram.pointLightsColorUniform, pointLightsColor.map(x => x / 255));
        for (let i = 0; i < this.shaderProgram.pointLightsPositionsUniforms.length; i++) {
            this.gl.uniform3fv(this.shaderProgram.pointLightsPositionsUniforms[i], pointLightsPositions[i]);
        }
    }

    setUseNormalMapping(useNormalMapping) {
        this.useNormalMapping = useNormalMapping;
    }
}
