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

    var matrizProyeccion = mat4.create();
    var matrizVista = mat4.create();


    // Se configura la matriz de proyección
    mat4.identity(matrizProyeccion);
    mat4.perspective(matrizProyeccion, 30, 1920 / 1080, 0.1, 100.0);
    mat4.scale(matrizProyeccion, matrizProyeccion, [1, -1, 1]); // parche para hacer un flip de Y, parece haber un bug en glmatrix

    // Se inicializan las variables asociadas con la Iluminación

    gl.gl.uniform1f(gl.shaderProgram.frameUniform, 1);
    gl.gl.uniform3f(gl.shaderProgram.ambientColorUniform, 0.6, 0.6, 0.6);
    gl.gl.uniform3f(gl.shaderProgram.directionalColorUniform, 1.2, 1.1, 0.7);
    gl.gl.uniform1i(gl.shaderProgram.useLightingUniform, 1);

    // Definimos la ubicación de la camara

    var distanciaCamara = 3;
    var alturaCamara = 0.3;
    mat4.lookAt(matrizVista,
        vec3.fromValues(0, alturaCamara, distanciaCamara),
        vec3.fromValues(0, 0, 0),
        vec3.fromValues(0, 1, 0)
    );

    var lightPosition = [10.0, 0.0, 3.0];
    gl.gl.uniform3fv(gl.shaderProgram.lightingDirectionUniform, lightPosition);

    gl.gl.uniformMatrix4fv(gl.shaderProgram.vMatrixUniform, false, matrizVista);
    gl.gl.uniformMatrix4fv(gl.shaderProgram.pMatrixUniform, false, matrizProyeccion);

    figura.draw();
}

function tick() {
    requestAnimFrame(tick);

    // acumulo rotaciones en matrizModelado
    figura.rotate(0.03*0.15, 0, 1, 0);

    drawScene();
}

window.onload = initWebGL;
