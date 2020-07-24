import {CatapultWoodMaterial} from "./catapult/CatapultWoodMaterial.js";
import {CatapultMetalMaterial} from "./catapult/CatapultMetalMaterial.js";
import {CatapultCementMaterial} from "./catapult/CatapultCementMaterial.js";
import {CastleWallMaterial} from "./castle/CastleWallMaterial.js";
import {CastleRoofMaterial} from "./castle/CastleRoofMaterial.js";
import {CastleWindowMaterial} from "./castle/CastleWindowMaterial.js";
import {WallMaterial} from "./wall/WallMaterial.js";
import {WallDoorMaterial} from "./wall/WallDoorMaterial.js";
import {BallMaterial} from "./ball/BallMaterial.js";
import {RopeMaterial} from "./catapult/RopeMaterial.js";
import {GrassMaterial} from "./terrain/GrassMaterial.js";
import {WaterMaterial} from "./terrain/WaterMaterial.js";
import {CastleColumnMaterial} from "./castle/CastleColumnMaterial.js";

export const CATAPULT_WOOD_MATERIAL = "CATAPULT_WOOD";
export const CATAPULT_METAL_MATERIAL = "CATAPULT_METAL";
export const CATAPULT_CEMENT_MATERIAL = "CATAPULT_CEMENT";
export const ROPE_MATERIAL = "ROPE";

export const CASTLE_WALL_MATERIAL = "CASTLE_WALL";
export const CASTLE_COLUMN_MATERIAL = "CASTLE_COLUMN";
export const CASTLE_ROOF_MATERIAL = "CASTLE_ROOF";
export const CASTLE_WINDOW_MATERIAL = "CASTLE_WINDOW";

export const WALL_MATERIAL = "WALL";
export const WALL_DOOR_MATERIAL = "WALL_DOOR";

export const BALL_MATERIAL = "BALL";

export const GRASS_MATERIAL = "GRASS";
export const WATER_MATERIAL = "WATER";


const MaterialClasses = {
    CATAPULT_WOOD: CatapultWoodMaterial,
    CATAPULT_METAL: CatapultMetalMaterial,
    CATAPULT_CEMENT: CatapultCementMaterial,
    ROPE: RopeMaterial,
    CASTLE_WALL: CastleWallMaterial,
    CASTLE_COLUMN: CastleColumnMaterial,
    CASTLE_ROOF: CastleRoofMaterial,
    CASTLE_WINDOW: CastleWindowMaterial,
    WALL: WallMaterial,
    WALL_DOOR: WallDoorMaterial,
    BALL: BallMaterial,
    GRASS: GrassMaterial,
    WATER: WaterMaterial,
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