import {CatapultWoodMaterial} from "./catapult/CatapultWoodMaterial.js";

export const CATAPULT_WOOD_MATERIAL = "CATAPULT_WOOD";


const MaterialClasses = {
    CATAPULT_WOOD: CatapultWoodMaterial,
};

class MaterialsFactory {
    /* This factory allows textures to be reused within objects */

    constructor() {
        this.materials = {};
    }

    getMaterial(material) {
        if (!this.materials[material]) {
            this.materials[material] = new MaterialClasses[material]()
        }
        return this.materials[material];
    }

}

export const Materials = new MaterialsFactory();