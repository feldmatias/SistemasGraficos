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
        this.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        this.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uMMatrix");
        this.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
        this.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
        this.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
        this.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
        this.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
        this.frameUniform = gl.getUniformLocation(shaderProgram, "time");
        this.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, "uLightPosition");
        this.directionalColorUniform = gl.getUniformLocation(shaderProgram, "uDirectionalColor");
    }
}
