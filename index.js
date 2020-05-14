import {WebGL} from "./webgl/WebGL.js";
import {FiguraCompuesta} from "./objects/figuracompuesta.js";

let gl;
let figura;

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
        figura = new FiguraCompuesta(gl);
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

function drawScene() {

    gl.setProjection(30, 1920 / 1080, 0.1, 100.0);

    let lightPosition = [10.0, 0.0, 3.0];
    let ambientColor = [0.6, 0.6, 0.6];
    let directionalColor = [1.2, 1.1, 0.7];
    gl.setLighting(lightPosition, ambientColor, directionalColor);

    var cameraDistance = 3;
    var cameraHeight = 0.3;
    gl.setView(cameraDistance, cameraHeight);

    figura.draw();
}

function tick() {
    requestAnimFrame(tick);

    // acumulo rotaciones en matrizModelado
    figura.rotate(0.03 * 0.15, 0, 1, 0);

    drawScene();
}

window.onload = initWebGL;
