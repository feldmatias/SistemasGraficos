import {Material} from "../Material.js";

export class WaterMaterial extends Material {

    constructor() {
        super();
        this.setImage('textures/terrain/water_diffuse.jpg');
        this.setNormalMapping('textures/terrain/water_normals.jpg');
        this.setReflection([
            'textures/terrain/sky_reflection/px.png',
            'textures/terrain/sky_reflection/nx.png',
            'textures/terrain/sky_reflection/py.png',
            'textures/terrain/sky_reflection/ny.png',
            'textures/terrain/sky_reflection/pz.png',
            'textures/terrain/sky_reflection/nz.png',
        ]);
    }

    getSpecularIntensity() {
        return 0.5;
    }

    getSpecularShininess() {
        return 50;
    }

}