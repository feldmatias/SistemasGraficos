export class Material {

    constructor() {
        this.gl = webGL;
    }

    getTexture() {
        return this.texture;
    }

    getNormalsTexture() {
        return this.normalsTexture;
    }

    getReflectionTexture() {
        return this.reflectionTexture;
    }

    getSpecularIntensity() {
        return 0.5;
    }

    getSpecularShininess() {
        return 32;
    }

    setColors(colors, width = 1, height = 1) {
        colors = colors.map(color => {
            if (color.length === 3) {
                color.push(255); // Append alpha=1 for all colors that don't have alpha
            }
            return color;
        });
        this.texture = this.gl.createColorTexture(colors, width, height);
    }

    setColor(color) {
        this.setColors([color], 1, 1);
    }

    setImage(image) {
        this.texture = this.gl.createImageTexture(image);
    }

    setNormalMapping(image) {
        this.normalsTexture = this.gl.createImageTexture(image);
    }

    setReflection(images) {
        this.reflectionTexture = this.gl.createCubeMapTexture(images);
    }

    ignoreLighting() {
        return false;
    }

}