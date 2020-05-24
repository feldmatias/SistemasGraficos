precision mediump float;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform vec3 uLightPosition;

uniform sampler2D uSampler;

void main(void) {

    vec4 textureColor = texture2D(uSampler, vec2(vUv.s, vUv.t));

    vec3 lightDirection = normalize(uLightPosition - vec3(vWorldPosition));

    vec3 color = (vec3(0.5, 0.5, 0.5) + dot(lightDirection, vNormal)) * textureColor.xyz;

    gl_FragColor = vec4(color, 1.0);

}
