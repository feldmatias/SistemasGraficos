import {ShaderProgram} from "./ShaderProgram.js";

export class WebGL {

    constructor(context) {
        this.gl = context;
    }

    setup(width, height) {
        this.gl.clearColor(0.2,0.2,0.2,1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.viewport(0, 0, width, height);
    }

    initShaders(vertexShaderSource, fragmentShaderSource) {
        //compile shaders
        let vertexShader = this._compileShader(vertexShaderSource, this.gl.VERTEX_SHADER);
        let fragmentShader = this._compileShader(fragmentShaderSource, this.gl.FRAGMENT_SHADER);

        //create program
        let glProgram = this.gl.createProgram();

        //attach and link shaders to the program
        this.gl.attachShader(glProgram, vertexShader);
        this.gl.attachShader(glProgram, fragmentShader);
        this.gl.linkProgram(glProgram);

        if (!this.gl.getProgramParameter(glProgram, this.gl.LINK_STATUS)) {
            console.log("Unable to initialize the shader program.");
        }

        //use program
        this.gl.useProgram(glProgram);
        this.shaderProgram = new ShaderProgram(this.gl, glProgram);
    }

    _compileShader(src, type) {
        let shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, src);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.log("Error compiling shader: " + this.gl.getShaderInfoLog(shader));
        }
        return shader;
    }

    createBuffer(data, itemSize) {
        if (!data) {
            return null;
        }
        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
        buffer.itemSize = itemSize;
        buffer.numItems = data.length / itemSize;
        return buffer;
    }

    createIndexBuffer(data, itemSize) {
        if (!data) {
            return null;
        }
        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), this.gl.STATIC_DRAW);
        buffer.itemSize = itemSize;
        buffer.numItems = data.length / itemSize;
        return buffer;
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

        let indexBuffer = drawableObject.getIndicesBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        this.gl.drawElements(this.gl.TRIANGLE_STRIP, indexBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);
    }
}
