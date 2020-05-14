import {WebGL} from "./webgl/WebGL.js";
import {Scene} from "./scene/Scene.js";

let gl;
let scene;

function initWebGL() {
    const canvas = document.getElementById("my-canvas");
    try {
        const context = canvas.getContext("webgl");
        gl = new WebGL(context);
    } catch (e) {
        alert("Error al obtener el contexto");
    }

    if (gl) {
        gl.setup(canvas.width, canvas.height);
        scene = new Scene(gl);
        loadShaders();

    } else {
        alert("Error: Su browser no soporta WebGL.");
    }
}

function loadShaders() {
    let vertexShaderSource, fragmentShaderSource;

    $.when(loadVertexShader(), loadFragmentShader()).done(function (res1, res2) {
        //this code is executed when all ajax calls are done
        gl.initShaders(vertexShaderSource, fragmentShaderSource);
        tick();
    });

    function loadVertexShader() {
        return $.ajax({
            url: "shaders/vertex-shader.glsl",
            success: function (result) {
                vertexShaderSource = result;
            }
        });
    }

    function loadFragmentShader() {
        return $.ajax({
            url: "shaders/fragment-shader.glsl",
            success: function (result) {
                fragmentShaderSource = result;
            }
        });
    }
}

function tick() {
    requestAnimFrame(tick);
    scene.draw();
}

window.onload = initWebGL;
