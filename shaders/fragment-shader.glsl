precision mediump float;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform vec3 uLightPosition;
uniform vec3 uLightColor;

uniform sampler2D uSampler;

vec3 directionalLight(vec3 surfaceColor, vec3 normal);

void main(void) {

    vec3 surfaceColor = texture2D(uSampler, vec2(vUv.s, vUv.t)).xyz;
    vec3 normal = normalize(vNormal);

    vec3 color = directionalLight(surfaceColor, normal);

    gl_FragColor = vec4(color, 1.0);

}

vec3 directionalLight(vec3 surfaceColor, vec3 normal) {

    //Ambient
    float ambientLight = 0.3;
    vec3 ambient = ambientLight * uLightColor * surfaceColor;

    // Diffuse
    vec3 lightDirection = normalize(uLightPosition - vWorldPosition);
    float diffuseIntensity = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = diffuseIntensity * uLightColor * surfaceColor;

    return ambient + diffuse;
}
