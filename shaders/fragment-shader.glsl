precision mediump float;

#define POINT_LIGHTS 3

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec3 vWorldPosition;

uniform vec3 uLightPosition;
uniform vec3 uLightColor;
uniform vec3 uPointLightsColor;

uniform vec3 uCameraPosition;

uniform sampler2D uSampler;

uniform sampler2D uSamplerNormals;
uniform bool uHasNormalMapping;

uniform samplerCube uSamplerReflection;
uniform bool uHasReflection;

uniform float uSpecularIntensity;
uniform float uSpecularShininess;

uniform vec3 uPointLightsPositions[POINT_LIGHTS];

uniform bool uIgnoreLighting;


vec3 normalMapping();
vec3 directionalLight(vec3 surfaceColor, vec3 normal);
vec3 pointLight(vec3 lightPosition, vec3 surfaceColor, vec3 normal);
vec3 reflection(vec3 normal);



void main(void) {
    vec3 surfaceColor = texture2D(uSampler, vec2(vUv.s, vUv.t)).xyz;
    if (uIgnoreLighting) {
        gl_FragColor = vec4(surfaceColor, 1.0);
        return;
    }

    vec3 normal = normalMapping();

    vec3 color = directionalLight(surfaceColor, normal);
    for (int i = 0; i < POINT_LIGHTS; i++) {
        color += pointLight(uPointLightsPositions[i], surfaceColor, normal);
    }
    color += reflection(normal);

    gl_FragColor = vec4(color, 1.0);

}

vec3 normalMapping() {
    vec3 normal = normalize(vNormal);

    if (uHasNormalMapping) {
        vec3 newNormal = texture2D(uSamplerNormals, vec2(vUv.s, vUv.t)).xyz;
        newNormal = normalize(newNormal * 2.0 - 1.0);

        mat3 TBN = mat3(normalize(vTangent), normalize(vBinormal), normal);

        normal = normalize(TBN * newNormal);
    }

    return normal;
}

vec3 directionalLight(vec3 surfaceColor, vec3 normal) {

    // Ambient
    float ambientLight = 0.3;
    vec3 ambient = ambientLight * uLightColor * surfaceColor;

    // Diffuse
    vec3 lightDirection = normalize(uLightPosition - vWorldPosition);
    float diffuseComponent = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = diffuseComponent * uLightColor * surfaceColor;

    // Specular
    vec3 viewDirection = normalize(uCameraPosition - vWorldPosition);
    vec3 reflectDirection = reflect(-lightDirection, normal);

    float specularComponent = max(dot(viewDirection, reflectDirection), 0.0);
    specularComponent = pow(specularComponent, uSpecularShininess);
    vec3 specular = uSpecularIntensity * specularComponent * uLightColor;

    return ambient + diffuse + specular;
}

vec3 pointLight(vec3 lightPosition, vec3 surfaceColor, vec3 normal) {
    float distance = length(lightPosition - vWorldPosition);
    float intensity = 1.0 / (1.0 + 0.045 * distance + 0.0075 * distance * distance);

    // Diffuse
    vec3 lightDirection = normalize(lightPosition - vWorldPosition);
    float diffuseComponent = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = diffuseComponent * uPointLightsColor * surfaceColor;

    // Specular
    vec3 viewDirection = normalize(uCameraPosition - vWorldPosition);
    vec3 reflectDirection = reflect(-lightDirection, normal);

    float specularComponent = max(dot(viewDirection, reflectDirection), 0.0);
    specularComponent = pow(specularComponent, uSpecularShininess);
    vec3 specular = uSpecularIntensity * specularComponent * uPointLightsColor;

    return (diffuse + specular) * intensity;
}

vec3 reflection(vec3 normal) {
    if (!uHasReflection) {
        return vec3(0, 0, 0);
    }

    vec3 viewDirection = normalize(vWorldPosition - uCameraPosition);
    vec3 direction = reflect(viewDirection, normal);

    float reflectionIntensity = 0.6;
    return reflectionIntensity * textureCube(uSamplerReflection, direction).xyz;
}
