import {ShaderProgram} from "./ShaderProgram.js";
import {WebGLDrawer} from "./WebGLDrawer.js";

export class WebGL {

    constructor(context) {
        this.gl = context;
    }

    setup(width, height, backgroundColor) {
        this.gl.canvas.width = width;
        this.gl.canvas.height = height;
        this.gl.clearColor(backgroundColor[0] / 255, backgroundColor[1] / 255, backgroundColor[2] / 255, 1);
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
        let shaderProgram = new ShaderProgram(this.gl, glProgram);
        this.glDrawer = new WebGLDrawer(this.gl, shaderProgram);
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

    getDrawer() {
        return this.glDrawer;
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

    deleteBuffer(buffer) {
        if (buffer) {
            this.gl.deleteBuffer(buffer);
        }
    }

    createColorTexture(colors, width, height) {
        let texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        let colorsArray = new Uint8Array(colors.flat());
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, colorsArray);
        return texture;
    }

    createImageTexture(imagePath) {
        let texture = this.gl.createTexture();
        let image = new Image();

        image.onload = () => {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
            this.gl.generateMipmap(this.gl.TEXTURE_2D);
        };

        image.src = imagePath;
        return texture;
    }

    createCubeMapTexture(imagePaths) {
        let targets = [
            this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,
            this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
            this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
            this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
            this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
        ];

        let texture = this.gl.createTexture();

        for(let i = 0; i < targets.length; i++) {
            let target = targets[i];
            let imagePath = imagePaths[i];

            let image = new Image();

            image.onload = () => {
                this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, texture);
                this.gl.texImage2D(target, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
                this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
                this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
                this.gl.generateMipmap(this.gl.TEXTURE_CUBE_MAP);
            };

            image.src = imagePath;
        }
        return texture;
    }
}
