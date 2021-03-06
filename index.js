import {WebGL} from "./webgl/WebGL.js";
import {Scene} from "./scene/Scene.js";
import {InputManager} from "./scene/InputManager.js";

let scene;

function initWebGL() {
    const canvas = document.getElementById("my-canvas");
    try {
        const context = canvas.getContext("webgl");
        webGL = new WebGL(context);
    } catch (e) {
        alert("Error al obtener el contexto");
    }

    if (webGL) {
        inputManager = new InputManager();
        scene = new Scene(webGL, $("#my-canvas"));
        loadShaders();

    } else {
        alert("Error: Su browser no soporta WebGL.");
    }
}

function loadShaders() {
    let vertexShaderSource, fragmentShaderSource;

    $.when(loadVertexShader(), loadFragmentShader()).done(function (res1, res2) {
        //this code is executed when all ajax calls are done
        webGL.initShaders(vertexShaderSource, fragmentShaderSource);
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
