export class ShaderProgram {

    constructor(gl, shaderProgram) {
        this.setAttributes(gl, shaderProgram);
        this.setUniforms(gl, shaderProgram);
    }

    setAttributes(gl, shaderProgram) {
        this.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aPosition");
        gl.enableVertexAttribArray(this.vertexPositionAttribute);

        this.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aUv");
        gl.enableVertexAttribArray(this.textureCoordAttribute);

        this.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aNormal");
        gl.enableVertexAttribArray(this.vertexNormalAttribute);
    }

    setUniforms(gl, shaderProgram) {
        this.projectionMatrixUniform = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
        this.modelMatrixUniform = gl.getUniformLocation(shaderProgram, "uModelMatrix");
        this.viewMatrixUniform = gl.getUniformLocation(shaderProgram, "uViewMatrix");
        this.normalMatrixUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");

        this.samplerTextureUniform = gl.getUniformLocation(shaderProgram, "uSampler");

        this.lightPositionUniform = gl.getUniformLocation(shaderProgram, "uLightPosition");
        this.lightColorUniform = gl.getUniformLocation(shaderProgram, "uLightColor");

        this.cameraPositionUniform = gl.getUniformLocation(shaderProgram, "uCameraPosition");

        this.specularIntensityUniform = gl.getUniformLocation(shaderProgram, "uSpecularIntensity");
        this.specularShininessUniform = gl.getUniformLocation(shaderProgram, "uSpecularShininess");
    }
}
