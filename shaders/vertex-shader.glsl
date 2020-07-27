attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec3 aTangent;
attribute vec3 aBinormal;
attribute vec2 aUv;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;

varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec2 vUv;


void main(void) {

    vec3 position = aPosition;
    vec3 normal = aNormal;
    vec2 uv = aUv;

    vec4 worldPos = uModelMatrix * vec4(position, 1.0);

    gl_Position = uProjectionMatrix * uViewMatrix * worldPos;

    vWorldPosition = worldPos.xyz;
    vNormal = normalize(uNormalMatrix * aNormal);
    vTangent = normalize(uNormalMatrix * aTangent);
    vBinormal = normalize(uNormalMatrix * aBinormal);
    vUv = uv;
}
